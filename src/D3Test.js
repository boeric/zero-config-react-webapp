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

export default class D3Test extends React.Component {
  constructor() {
    super();

    this.ref = React.createRef();

    const header = 'D3 Test';
    const data = [];
    const barCount = (~~(Math.random() * 4)) + 5;
    for (let i = 0; i < barCount; i++) {
      data.push((Math.random() + 0.1) * 10);
    }

    this.state = { header, data };
  }

  componentDidMount() {
    // console.log(this.ref);
    this.drawSomething();
  }

  render() {
    const { header } = this.state;

    return (
      <>
        <hr />
        <div className='sectionHeader'>{header}</div>
        <div className='d3Container' ref={this.ref}></div>
      </>
    );
  }

  drawSomething() {
    if (this.ref == null) {
      console.error('No ref...');
      return;
    }

    const { data } = this.state;
    const dims = {
      width: 600,
      height: 300,
      rectWidth: 50,
      padding: 20,
    };
    const root = d3.select(this.ref.current);
    // console.log(data);

    const barHeight = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([0, dims.height - dims.padding * 2]);

    const barSpace = (dims.width - dims.padding) / data.length;
    const barWidth = barSpace - dims.padding;

    const svg = root.append('svg')
      .attr('width', dims.width)
      .attr('height', dims.height);

    svg.selectAll('rect')
      .data(data)
      .enter().append('rect')
      .attr('x', (d, i) => dims.padding + (i * barSpace))
      .attr('y', (d) => dims.height - dims.padding - barHeight(d))
      .attr('width', barWidth)
      .attr('height', (d) => barHeight(d))
      .attr('fill', 'steelblue');
  }
}
