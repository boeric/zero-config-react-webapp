/*
  D3DemoFunc.jsx
*/

/*
  eslint-disable no-console, no-underscore-dangle, no-bitwise, no-multiple-empty-lines,
  quotes, padded-blocks, no-plusplus, object-curly-newline, no-use-before-define
*/

import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import * as d3 from 'd3';
import Button from './Button';

const RUN = 'run';
const IDLE = 'idle';
const BEFORE = 'before';
const BEHIND = 'behind';
const X_OFFSET = 10;
const Y_OFFSET = 20;

export default function D3DemoFunc(props) {
  console.log('\n\nD3DemoFunc props', props);

  // Obtain a DOM ref, will eventually be used by the D3 drawing code
  const ref = useRef(null);

  const id = 'svgRootFunc';

  const header = 'D3';
  const subHeader = (
    <>
      A ball bouncing around for awhile in <b>front of</b> and then <b>behind</b> some random bars
    </>
  );

  // Bar data
  const barData = [];
  const barCount = (~~(Math.random() * 8)) + 5;
  for (let i = 0; i < barCount; i += 1) {
    barData.push((Math.random() + 0.1) * 10);
  }

  // SVG dimensions
  const width = 500;
  const height = width / 2;
  const padding = width * 0.03;
  const dimensions = { width, height, padding };

  // Animation variables (stored in local variables)
  // let _animating = false;
  const [animating, setAnimating] = useState(false);
  let intervalId = null;
  let timeoutId = null;

  const current = {
    cx: (~~(Math.random() * width)),
    cy: (~~(Math.random() * height)),
    dirX: 'r',
    dirY: 'd',
    bounceCount: 0,
    circleGroupPos: BEFORE,
  };
  let circle = null;

  // Boolean to hold animation state (RUN | IDLE), initial state === RUN
  const [runState, setRunState] = useState(RUN);

  // Boolean to hold d3 static drawing state
  // const [drawingComplete, setDrawingComplete] = useState(false); // false | true

  const [timedOut, setTimedOut] = useState(false);

  // Container width
  const [containerWidth, setContainerWidth] = useState(0);

  // Circle data (in an array with one element)
  const circleData = [{
    // r: 15,
    cx: current.cx,
    cy: current.cy,
  }];

  function onButtonClick() {
    // Toggle the runState
    setRunState(runState === RUN ? IDLE : RUN);
  }

  useLayoutEffect(() => {
    // Initial rendering of bars and circle, will only be called once
    draw();

    // Start controlling the animation
    controlAnimation();
  }, []);

  // Control the animation (will be called whenever runState or timedOut changes)
  useLayoutEffect(() => {
    controlAnimation();
    //////////////// return here what control animation sets up
  }, [runState, timedOut]);

  // Handle resize of the containing window
  useEffect(() => {
    function handleResize() {
      setContainerWidth(ref.current.clientWidth);
    }
    setContainerWidth(ref.current.clientWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Draw the bars, circle and text
  function draw() {
    console.log('func draw===========');
    // Compute the bar height, spacing and width
    const barHeight = d3.scaleLinear()
      .domain([0, d3.max(barData)])
      .range([0, dimensions.height - dimensions.padding * 2]);
    const barSpace = (dimensions.width - dimensions.padding) / barData.length;
    const barWidth = barSpace - dimensions.padding;

    // Obtain a reference to the containing element for the SVG
    const root = d3.select(ref.current);

    // Add the SVG element
    const svg = root.append('svg')
      .attr('width', dimensions.width)
      .attr('height', dimensions.height)
      .attr('id', id);

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
    // circle = circleGroup.selectAll('circle')
    circleGroup.selectAll('circle')
      .data(circleData)
      .enter().append('circle')
      // .attr('r', (d) => d.r)
      .attr('cx', (d) => d.cx)
      .attr('cy', (d) => d.cy)
      .attr('class', 'before');

    // Add a text element
    // circleText = circleGroup.selectAll('text')
    circleGroup.selectAll('text')
      .data(circleData)
      .enter().append('text')
      .attr('x', (d) => d.cx + X_OFFSET)
      .attr('y', (d) => d.cy + Y_OFFSET)
      .text('0');
  }

  function controlAnimation() {
    console.log('controlAnimation ==========', runState, animating);
  }

  function animate() {
    console.log('animating');
  }

  function flipGroupOrder(circleGroupPos) {
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

  // Set the button text
  const buttonText = runState === RUN ? 'Stop Animation' : 'Continue Animation';

  console.log('About to render func...');
  return (
    <>
      <hr />
      <div className='sectionHeader'>{header}</div>
      <div>{subHeader}</div>
      <div className='d3Container' ref={ref}></div>
        <div className='buttonInfoWrapper'>
          <Button
            type='button'
            section={true}
            onClick={onButtonClick}
          >
            {buttonText}
          </Button>
          <div style={{ fontSize: '12px', paddingTop: '20px' }}>{containerWidth}</div>
        </div>
    </>
  );
}
