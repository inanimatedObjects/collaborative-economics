import React, { Component } from 'react';
import * as d3 from 'd3';

export default class LineGraph extends Component {
  constructor() {
    super();
    this.draw = this.draw.bind(this);
  }

  componentDidMount() {
    this.draw(this.props)
  }
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return(
      <div className="lineGraph" />
    )
  }

  draw(props) {
    const w = 600;
    const h = 300;

    let svg = d3.select('.lineGraph').append('svg')
      .attr('height', h)
      .attr('width', w)
      .attr('id', 'lineGraph')

    let boatCost = props.boatCost;
    let houseCost = props.houseCost;

    let x = d3.scaleLinear()
      .range([0, w])
      .domain([0, 250000])

    let y = d3.scaleLinear()
      .range([h, 0])
      .domain([0, 1])

    let xAxis = d3.axisBottom()
      .scale(x)
      .tickSize(0)

    let yAxis = d3.axisLeft()
      .scale(y)
      .tickSize(0)

    let gx = svg.append('g')
      .attr('class', 'x axis')
      .attr("transform", "translate(10, 290)")
      .call(xAxis)

    let gy = svg.append('g')
      .attr('class', 'y axis')
      .attr("transform", "translate(10, -10)")
      .call(yAxis)
  }
}
