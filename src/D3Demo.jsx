/*
  D3Demo.jsx
*/

/*
  eslint-disable no-console, no-underscore-dangle, object-curly-spacing, object-curly-newline,
  no-plusplus, no-bitwise
*/

import React from 'react';
import * as d3 from 'd3';
import Button from './Button';

const RUN = 'run';
const IDLE = 'idle';
const BEFORE = 'before';
const BEHIND = 'behind';
const X_OFFSET = 10;
const Y_OFFSET = 20;

export default class D3Demo extends React.Component {
  constructor() {
    super();

    // Obtain a DOM ref, will eventually be used by the D3 drawing code
    this.ref = React.createRef();

    const header = 'D3';
    const subHeader = (
      <>
        A ball bouncing around for awhile in <b>front of</b> and then <b>behind</b> some random bars
      </>
    );

    // Bar data
    const barData = [];
    const barCount = (~~(Math.random() * 8)) + 5;
    for (let i = 0; i < barCount; i++) {
      barData.push((Math.random() + 0.1) * 10);
    }

    // SVG dimensions
    const width = 500;
    const height = width / 2;
    const padding = width * 0.03;
    const dimensions = {width, height, padding};

    // Animation variables (stored directly on the class instance)
    this.animating = false;
    this.intervalId = null;
    this.timeoutId = null;
    this.current = {
      cx: (~~(Math.random() * width)),
      cy: (~~(Math.random() * height)),
      dirX: 'r',
      dirY: 'd',
      bounceCount: 0,
      circleGroupPos: BEFORE,
    };
    this.circle = null;
    const runState = RUN;

    // Circle data (in an array with one element)
    const circleData = [{
      // r: 15,
      cx: this.current.cx,
      cy: this.current.cy,
    }];

    // Set initial state
    this.state = { header, subHeader, dimensions, barData, circleData, runState };

    // Button click handler
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick() {
    // Toggle the runState
    const runState = this.state.runState === RUN ? IDLE : RUN;
    this.setState({...this.state, runState});
  }

  componentDidMount() {
    // Initial rendering of bars and circle, will only be called once
    this.draw();

    // Start controlling the animation
    this.controlAnimation();
  }

  componentDidUpdate() {
    // Control the animation (will be called whenever the component was updated)
    this.controlAnimation();
  }

  // Draw the bars, circle and text
  draw() {
    console.log('class draw===========');
    const { dimensions, barData, circleData } = this.state;

    // Compute the bar height, spacing and width
    const barHeight = d3.scaleLinear()
      .domain([0, d3.max(barData)])
      .range([0, dimensions.height - dimensions.padding * 2]);
    const barSpace = (dimensions.width - dimensions.padding) / barData.length;
    const barWidth = barSpace - dimensions.padding;

    // Obtain a reference to the containing element for the SVG
    const root = d3.select(this.ref.current);

    // Add the SVG element
    const svg = root.append('svg')
      .attr('width', dimensions.width)
      .attr('height', dimensions.height)
      .attr('id', 'svgRoot');

    // Create a group for the bars (id needed for subsequent changes of DOM order)
    const barGroup = svg.append('g').attr('id', 'barGroup');

    // Draw the random bars
    barGroup.selectAll('rect')
      .data(barData)
      .enter().append('rect')
      .attr('x', (d, i) => dimensions.padding + (i * barSpace))
      .attr('y', (d) => dimensions.height - dimensions.padding - barHeight(d))
      .attr('width', barWidth)
      .attr('height', (d) => barHeight(d));

    // Create a group for the circle and text (id needed for subsequent changes of DOM order)
    const circleGroup = svg.append('g').attr('id', 'circleGroup');

    // Draw the circle
    this.circle = circleGroup.selectAll('circle')
      .data(circleData)
      .enter().append('circle')
      // .attr('r', (d) => d.r)
      .attr('cx', (d) => d.cx)
      .attr('cy', (d) => d.cy)
      .attr('class', 'before');

    // Add a text element
    this.circleText = circleGroup.selectAll('text')
      .data(circleData)
      .enter().append('text')
      .attr('x', (d) => d.cx + X_OFFSET)
      .attr('y', (d) => d.cy + Y_OFFSET)
      .text('0');
  }

  controlAnimation() {
    const {runState} = this.state;

    /*
      Logic summary
      idle && animating => stop animation
      idle && !animating => return
      run && animating => return
      run && !animating => start animation
    */

    // Immediately kill the ongoing animation, reset variables
    if (runState === IDLE && this.animating) {
      clearInterval(this.intervalId);
      clearTimeout(this.timeoutId);
      this.animating = false;
      this.intervalId = null;
      this.timeoutId = null;
      return;
    }

    // Animation is stopped, do nothing
    if (runState === IDLE && !this.animating) {
      return;
    }

    // Animation onging, do nothing
    if (runState === RUN && this.animating) {
      return;
    }

    // Start a new animation
    if (runState === RUN && !this.animating) {
      // Clear any existing interval
      if (this.intervalId !== null) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }

      // Clear any exiting timeout
      if (this.timeoutId !== null) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }

      // Set up animation, iterate every 5 msec
      this.intervalId = setInterval(() => {
        this.animating = true;
        this.animate();
      }, 5);

      // Kill animation after y msec
      // Explanation: This will kill the ongoing animation indirectly. The setState with
      // runState === idle below will cause a render cycle, which will cause controlAnimation
      // to run again, which will kill the animation
      this.timeoutId = setTimeout(() => {
        this.setState({
          runState: IDLE,
        });
      }, 10000);
    }
  }

  animate() {
    // Get SVG dimensions
    const {height, width} = this.state.dimensions;

    // Get current animation variables
    let {cx, cy, dirX, dirY, bounceCount, circleGroupPos} = this.current;

    // Attempt to change position
    const xIncr = dirX === 'r' ? 1 : -1;
    const yIncr = dirY === 'd' ? 3 : -3;
    cx += xIncr;
    cy += yIncr;

    // Perform bounds check
    if (cx > width) {
      cx = width;
      dirX = 'l';
      if (circleGroupPos !== BEHIND) {
        circleGroupPos = BEHIND;
        this.flipGroupOrder(circleGroupPos);
      }
      bounceCount++;
    }
    if (cx < 0) {
      cx = 0;
      dirX = 'r';
      if (circleGroupPos !== BEFORE) {
        circleGroupPos = BEFORE;
        this.flipGroupOrder(circleGroupPos);
      }
      bounceCount++;
    }
    if (cy > height) {
      cy = height;
      dirY = 'u';
      bounceCount++;
    }
    if (cy < 0) {
      cy = 0;
      dirY = 'd';
      bounceCount++;
    }

    // Update animation variables
    this.current.cx = cx;
    this.current.cy = cy;
    this.current.dirX = dirX;
    this.current.dirY = dirY;
    this.current.bounceCount = bounceCount;
    this.current.circleGroupPos = circleGroupPos;

    // Move the object
    this.circle
      .attr('cx', cx)
      .attr('cy', cy)
      .attr('class', `${circleGroupPos === BEFORE ? 'before' : 'behind'}`);

    // ...and its label
    this.circleText
      .attr('x', cx + X_OFFSET)
      .attr('y', cy + Y_OFFSET)
      .text(`${bounceCount}`);
  }

  // eslint-disable-next-line class-methods-use-this
  flipGroupOrder(circleGroupPos) {
    // Obtain a reference to the containing element for the SVG
    const svgRoot = d3.select('#svgRoot');
    const circleGroup = d3.select('#circleGroup');
    const removedElem = circleGroup.remove();

    switch (circleGroupPos) {
      case BEHIND:
        svgRoot.insert(() => removedElem.node(), '#barGroup');
        break;
      case BEFORE:
        svgRoot.insert(() => removedElem.node());
        break;
      default:
        console.error(`Invalid argument: ${circleGroupPos}`);
    }
  }

  render() {
    const { header, subHeader, runState } = this.state;

    // Set the button text
    const buttonText = runState === 'run' ? 'Stop Animation' : 'Continue Animation';

    console.log('About to render class...');
    return (
      <>
        <hr />
        <div className='sectionHeader'>{header}</div>
        <div>{subHeader}</div>
        <div className='d3Container' ref={this.ref}></div>
          <div className='buttonInfoWrapper'>
            <Button
              type='button'
              section={true}
              onClick={this.onButtonClick}
            >
              {buttonText}
            </Button>
          </div>
      </>
    );
  }
}
