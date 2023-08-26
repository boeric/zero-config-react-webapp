/*
  D3Demo.jsx
*/

/*
  eslint-disable no-console, no-underscore-dangle, object-curly-spacing, object-curly-newline,
  no-plusplus, no-bitwise
*/

import React from 'react';
import * as d3 from 'd3';

const RUN = 'run';
const IDLE = 'idle';
const AFTER = 'after';
const BEFORE = 'before';
const X_OFFSET = 10;
const Y_OFFSET = 20;

export default class D3Demo extends React.Component {
  constructor() {
    super();

    // Obtain a DOM ref, will eventually be used by the D3 drawing code
    this.ref = React.createRef();

    const header = 'D3 Demo';
    const subHeader = 'A ball bouncing around in front of and behind some random bars';

    // Bar data
    const barData = [];
    const barCount = (~~(Math.random() * 8)) + 5;
    for (let i = 0; i < barCount; i++) {
      barData.push((Math.random() + 0.1) * 10);
    }

    // Animation variables (store directly on the class instance)
    this._animating = false;
    this._intervalId = null;
    this._timeoutId = null;
    this._current = {
      cx: 50,
      cy: 50,
      dirX: 'r',
      dirY: 'd',
      bounceCount: 0,
      circleGroupPos: AFTER,
    };
    this._circle = null;
    const runState = RUN;

    // Circle data (in an array with one element)
    const circleData = [{
      r: 15,
      cx: this._current.cx,
      cy: this._current.cy,
    }];

    // SVG dimensions
    const width = 500;
    const height = width / 2;
    const padding = width * 0.03;
    const dimensions = {width, height, padding};

    // Set initial state
    this.state = { header, subHeader, dimensions, barData, circleData, runState };

    // Button click handler
    this._onD3ButtonClick = this._onD3ButtonClick.bind(this);
  }

  render() {
    const { header, subHeader, runState } = this.state;
    const buttonText = runState === 'run' ? 'Stop Animation' : 'Restart Animation';

    return (
      <>
        <hr />
        <div className='sectionHeader'>{header}</div>
        <div>{subHeader}</div>
        <div className='d3Container' ref={this.ref}></div>
          <div className='buttonInfoWrapper'>
            <button
              type='button'
              onClick={this._onD3ButtonClick}
              style={{width: '165px', height: '25px'}}
            >
              {buttonText}
            </button>
          </div>
      </>
    );
  }

  _onD3ButtonClick() {
    const runState = this.state.runState === RUN ? IDLE : RUN;
    this.setState({...this.state, runState});
  }

  componentDidMount() {
    // Draw the bars and circle
    this.draw();

    // Start the circle animation
    this.controlAnimation();
  }

  componentDidUpdate() {
    // Control the animation
    this.controlAnimation();
  }

  // Draw the bars, circle and text
  draw() {
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
    this._circle = circleGroup.selectAll('circle')
      .data(circleData)
      .enter().append('circle')
      .attr('r', (d) => d.r)
      .attr('cx', (d) => d.cx)
      .attr('cy', (d) => d.cy);

    // Add a text element
    this._circleText = circleGroup.selectAll('text')
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
    if (runState === IDLE && this._animating) {
      clearInterval(this._intervalId);
      clearTimeout(this._timeoutId);
      this._animating = false;
      this._intervalId = null;
      this._timeoutId = null;
      return;
    }

    // Animation is stopped, do nothing
    if (runState === IDLE && !this._animating) {
      return;
    }

    // Animation onging, do nothing
    if (runState === RUN && this._animating) {
      return;
    }

    // Start a new animation
    if (runState === RUN && !this._animating) {
      // Clear any existing interval
      if (this._intervalId !== null) {
        clearInterval(this._intervalId);
        this._intervalId = null;
      }

      // Clear any exiting timeout
      if (this._timeoutId !== null) {
        clearTimeout(this._timeoutId);
        this._timeoutId = null;
      }

      // Set up animation, iterate every 3 msec
      this._intervalId = setInterval(() => {
        this._animating = true;
        this.animate();
      }, 3);

      // Kill animation after y msec
      // Explanation: This will kill the ongoing animation indirectly. The setState with
      // runState === idle will cause a render cycle, which will cause controlAnimation to run
      // again, which will kill the animation
      this._timeoutId = setTimeout(() => {
        this.setState({
          runState: 'idle',
        });
      }, 10000);
    }
  }

  animate() {
    // Get SVG dimensions
    const {height, width} = this.state.dimensions;

    // Get current animation variables
    let {cx, cy, dirX, dirY, bounceCount, circleGroupPos} = this._current;

    // Attempt to change position
    const xIncr = dirX === 'r' ? 1 : -1;
    const yIncr = dirY === 'd' ? 3 : -3;
    cx += xIncr;
    cy += yIncr;

    // Perform bounds check
    if (cx > width) {
      cx = width;
      dirX = 'l';
      if (circleGroupPos !== BEFORE) {
        circleGroupPos = BEFORE;
        this.flipGroupOrder(circleGroupPos);
      }
      bounceCount++;
    }
    if (cx < 0) {
      cx = 0;
      dirX = 'r';
      if (circleGroupPos !== AFTER) {
        circleGroupPos = AFTER;
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
    this._current.cx = cx;
    this._current.cy = cy;
    this._current.dirX = dirX;
    this._current.dirY = dirY;
    this._current.bounceCount = bounceCount;
    this._current.circleGroupPos = circleGroupPos;

    // Move the object...
    this._circle
      .attr('cx', cx)
      .attr('cy', cy);

    // ...and its label
    this._circleText
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
      case BEFORE:
        svgRoot.insert(() => removedElem.node(), '#barGroup');
        break;
      case AFTER:
        svgRoot.insert(() => removedElem.node());
        break;
      default:
        console.error(`Invalid argument: ${circleGroupPos}`);
    }
  }
}
