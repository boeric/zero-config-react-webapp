/*
  D3Test.js

  Bo Ericsson 2021
*/

/*
  eslint-disable no-console, no-underscore-dangle, object-curly-spacing, object-curly-newline,
  no-plusplus, no-bitwise
*/

import React from 'react';
import * as d3 from 'd3';

const RUN = 'run';
const IDLE = 'idle';

export default class D3Test extends React.Component {
  constructor() {
    super();

    // Obtain a DOM ref, will eventually be used by the D3 drawing code
    this.ref = React.createRef();

    const header = 'D3 Test';
    const subHeader = 'Shows a random number of bars and a bouncing ball for awhile';

    // Bar data
    const data = [];
    const barCount = (~~(Math.random() * 8)) + 5;
    for (let i = 0; i < barCount; i++) {
      data.push((Math.random() + 0.1) * 10);
    }

    // Animation variables (store directly on the class instance)
    this._animating = false;
    this._intervalId = null;
    this._timeoutId = null;
    this._currentPos = {
      cx: 50,
      cy: 50,
      dirX: 'r',
      dirY: 'd',
    };
    this._circle = null;
    const runState = RUN;

    // Circle data (in an array with one element)
    const circleData = [{
      r: 15,
      cx: this._currentPos.cx,
      cy: this._currentPos.cy,
      fill: 'green',
      stroke: 'black',
      opacity: 0.5,
    }];

    // SVG dimensions
    const width = 500;
    const height = width / 2;
    const padding = width * 0.03;
    const dimensions = {width, height, padding};

    // Set initial state
    this.state = { header, subHeader, dimensions, data, circleData, runState };

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

  // Set up the SVG bars and circle
  draw() {
    const { dimensions, data, circleData } = this.state;

    // Compute the bar height, spacing and width
    const barHeight = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([0, dimensions.height - dimensions.padding * 2]);
    const barSpace = (dimensions.width - dimensions.padding) / data.length;
    const barWidth = barSpace - dimensions.padding;

    // Obtain a reference to the DOM where the SVG
    const root = d3.select(this.ref.current);

    // Add the SVG element
    const svg = root.append('svg')
      .attr('width', dimensions.width)
      .attr('height', dimensions.height);

    // Draw the random bars
    const barGroup = svg.append('g');
    barGroup.selectAll('rect')
      .data(data)
      .enter().append('rect')
      .attr('x', (d, i) => dimensions.padding + (i * barSpace))
      .attr('y', (d) => dimensions.height - dimensions.padding - barHeight(d))
      .attr('width', barWidth)
      .attr('height', (d) => barHeight(d))
      .attr('fill', 'LightSalmon');

    // Draw the initial ball
    const circleGroup = svg.append('g');
    this._circle = circleGroup.selectAll('circle')
      .data(circleData)
      .enter().append('circle')
      .attr('r', (d) => d.r)
      .attr('cx', (d) => d.cx)
      .attr('cy', (d) => d.cy)
      .style('fill', (d) => d.fill)
      .style('opacity', (d) => d.opacity)
      .style('stroke', (d) => d.stroke);
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
    let {cx, cy, dirX, dirY} = this._currentPos;

    // Attempt to change position
    const xIncr = dirX === 'r' ? 1 : -1;
    const yIncr = dirY === 'd' ? 3 : -3;
    cx += xIncr;
    cy += yIncr;

    // Perform bounds check
    if (cx > width) {
      cx = width;
      dirX = 'l';
    }
    if (cx < 0) {
      cx = 0;
      dirX = 'r';
    }
    if (cy > height) {
      cy = height;
      dirY = 'u';
    }
    if (cy < 0) {
      cy = 0;
      dirY = 'd';
    }

    // Update animation variables
    this._currentPos.cx = cx;
    this._currentPos.cy = cy;
    this._currentPos.dirX = dirX;
    this._currentPos.dirY = dirY;

    // Move the object
    this._circle
      .attr('cx', cx)
      .attr('cy', cy);
  }
}
