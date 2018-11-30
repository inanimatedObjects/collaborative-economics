import React, { Component } from 'react';
import * as d3 from 'd3';

const width = 600;
const height = 300;
const margin = {top: 20, right: 5, bottom: 20, left: 40};
const red = '#eb6a5b';
const green = '#b6e86f';
const blue = '#52b6ca';
const colors = [blue, green, red];

class ExampleViz extends Component {
  state = {
    bars: [], // array of rects
    // d3 helpers
    xScale: d3.scaleBand().range([margin.left, width - margin.right]).domain(this.props.data.map(d => d.item)),
    yScale: d3.scaleLinear().range([height - margin.bottom, margin.top])
  };

  xAxis = d3.axisBottom().scale(this.state.xScale);
  yAxis = d3.axisLeft().scale(this.state.yScale)
    .ticks(10, '$~s');

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.data) return null; // data hasn't been loaded yet so do nothing
    const {data} = nextProps;
    const {xScale, yScale} = prevState;

    // data has changed, so recalculate scale domains
    yScale.domain([0, data[3].cost + (data[3].cost / 10)]);

    // calculate x and y for each rectangle
    const bars = data.map(d => {
      return {
        x: xScale(d.item) + margin.right + margin.left,
        y: height - ((d.cost * height) / (data[3].cost + (data[3].cost / 10))) - margin.top,
        height: (d.cost * height) / (data[3].cost + (data[3].cost / 10)),
        fill: 'lavender'
      }
    });
    console.log(bars)

    return {bars};

  }

  componentDidMount() {
    d3.select(this.refs.xAxis).call(this.xAxis);
    d3.select(this.refs.yAxis).call(this.yAxis);
  }

  componentDidUpdate() {
    d3.select(this.refs.xAxis).call(this.xAxis);
    d3.select(this.refs.yAxis).call(this.yAxis);
  }

  render() {

    return (
      <svg width={width} height={height}>
        {this.state.bars.map((d, i) =>
          (<rect key={i} x={d.x} y={d.y} width='50' height={d.height} fill={d.fill} />))}
        <g>
          <g ref='xAxis' transform={`translate(0, ${height - margin.bottom})`} />
          <g ref='yAxis' transform={`translate(${margin.left}, 0)`} />
        </g>
      </svg>
    );
  }
}

export default ExampleViz;
