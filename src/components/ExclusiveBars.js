import React, { Component } from 'react';
import * as d3 from 'd3';

export default class ExclusiveBars extends Component {
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
      <div className="exclusiveBars" />
    )
  }

  draw(props) {
    const w = 600;
    const h = 300;
    let svg = d3.select('.exclusiveBars').append('svg')
      .attr('height', h)
      .attr('width', w)
      .attr('id', 'exclusiveBars')

    let boatCost = props.boatCost;
    let houseCost = props.houseCost;

    let x = d3.scaleLinear()
      .range([0, w])
      .domain([0, 250000])

    let y = d3.scaleLinear()
      .range([h, 0])
      .domain([0, 1])

    let yAxis = d3.axisLeft()
      .scale(y)
      .tickSize(0)

    let gy = svg.append('g')
      .attr('class', 'y axis')
      .attr("transform", "translate(10, -10)")
      .call(yAxis)
  }
}
