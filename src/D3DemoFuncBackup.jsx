// D3DemoFunc

/*
  eslint-disable no-console, no-underscore-dangle, no-bitwise, no-multiple-empty-lines, quotes, padded-blocks, no-plusplus
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

let stage = 0;

export default function D3DemoFunc(props) {
  console.log('\nEntry props 1', props);

  const id = 'svgRootFunc';
  const header = 'D3';
  const subHeader = (
    <>
      A ball bouncing around for awhile in <b>front of</b> and then <b>behind</b> some random bars
    </>
  );

  // Get ref to d3 <div> container element
  const ref = useRef(null);

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
  const [_animating, setAnimating] = useState(true);
  let _intervalId = null;
  let _timeoutId = null;

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
  const [drawingComplete, setDrawingComplete] = useState(false); // false | true

  // Container width
  const [containerWidth, setContainerWidth] = useState(0);

  // Circle data (in an array with one element)
  const circleData = [{
    // r: 15,
    cx: current.cx,
    cy: current.cy,
  }];

  // Animate the viz
  function animate() {
    console.log('animate');
  }

  let useEffectCounter = 0;

  // Handle resize of the containing window
  useEffect(() => {
    function handleResize() {
      setContainerWidth(ref.current.clientWidth);
    }
    setContainerWidth(ref.current.clientWidth);
    window.addEventListener('resize', handleResize);
    console.log(`useEffectCounter ${useEffectCounter++}`);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function draw() {
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

  // Draw the initial bars
  useLayoutEffect(() => {
    // Immediate return if this section of the DOM has already been created
    if (d3.select(`#${id}`).node() !== null) {
      return;
    }

    // Draw the initial drawing
    draw();

    // Update state variable drawingComplete
    setDrawingComplete(true);

    // Return inverse of this function, namely to remove the SVG element and any handlers,
    // not used here
    // return ...
  }, [drawingComplete]); // Only run this layout effect when drawingComplete has changed


  useEffect(() => {
    console.log('useEffect: kill timeout ********************************');
    const timeoutId = setTimeout(() => {
      console.log('useEffect: I will kill the animation now');
      setAnimating(false);
      setRunState(IDLE);
      console.log('useEffect: I have now set the state');
    }, 8000);
    return () => clearTimeout(timeoutId);
  }, []);


  console.log("top level: _animation", _animating);
  console.log("top level: runState", runState);



  function animationControl() {
    console.log('animationControl--- here is where I control stuff')
    console.log('animationControl--- runState or _animating has changed', runState, _animating);
  }

  useLayoutEffect(() => {
    console.log('  animationControl * runState or _animating has changed', runState, _animating);
    console.log('  animationControl * implement animation control logic here...');
    animationControl();
  }, [runState, _animating]);



  // Control the animation
  useLayoutEffect(() => {
    return;
    // Return if the D3-owned DOM node hasn't yet been created
    if (d3.select(`#${id}`).node() === null) {
      return;
    }

    /*
      Logic summary
      idle && animating => stop animation
      idle && !animating => return
      run && animating => return
      run && !animating => start animation
    */
    console.log('useLayoutEffect control animation runState', runState, 'animating',_animating);

    // Immediately kill the ongoing animation, reset variables
    if (runState === IDLE && _animating) {
      console.log('runState === IDLE and _animating === TRUE, should kill everything');
      clearInterval(_intervalId);
      clearTimeout(_timeoutId);
      _intervalId = null;
      _timeoutId = null;
      setAnimating(false);
      return;
    }

    // Animation is stopped, do nothing
    if (runState === IDLE && !_animating) {
      console.log('idle === true and animating === false')
      return;
    }

    // Animation onging, do nothing
    if (runState === RUN && _animating) {
      return;
    }

    // Start a new animation
    if (runState === RUN && !_animating) {
      console.log('starting a new animation runState === RUN, animating === false')
      // Clear any existing interval
      if (_intervalId !== null) {
        clearInterval(_intervalId);
        _intervalId = null;
      }

      // Clear any exiting timeout
      if (_timeoutId !== null) {
        clearTimeout(_timeoutId);
        _timeoutId = null;
      }

      // setAnimating(true);
      console.log("just set animating to TRUE", runState, _animating);

      // Set up animation, iterate every 5 msec
      console.log("before setting interval", _intervalId)
      _intervalId = setInterval(() => {
        // console.log(_intervalId)
        animate();
      }, 1000);

      console.log("intervalId $$$$$$$$$$$$$$$$$$$$", _intervalId);

      // Kill animation after y msec
      // Explanation: This will kill the ongoing animation indirectly. The setState with
      // runState === idle will cause a render cycle, which will cause controlAnimation to run
      // again, which will kill the animation
      /*
      _timeoutId = setTimeout(() => {
        console.log("before setRunState to idle")

        //_animating = false;
        setAnimating(false);
        setRunState(IDLE);
        console.log("after setRunState to idle")
      }, 10000);
      */
    }

    console.log('====================');
  }, [runState]);

  // Button handler
  const onAnimationButtonClick = () => {
    setRunState(runState === RUN ? IDLE : RUN);
  };

  // Compute the button text
  const buttonText = runState === RUN ? 'Stop Animation' : 'Continue Animation';


  console.log('About to render');
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
            onClick={onAnimationButtonClick}
          >
            {buttonText}
          </Button>
          <div style={{ fontSize: '12px', paddingTop: '20px' }}>{containerWidth}</div>
        </div>
    </>
  );

  // eslint-disable-next-line class-methods-use-this
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
}
