import React, { Component } from 'react';
import * as d3 from 'd3';

export default class GrossBars extends Component {
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
      <div className="grossBars" />
    )
  }

  draw(props) {
    const w = 600;
    const h = 300;
    let svg = d3.select('.grossBars').append('svg')
      .attr('height', h)
      .attr('width', w)
      .attr('id', 'grossBars')

    let boatCost = props.boatCost;
    let houseCost = props.houseCost;
    let names = ['Boat ', 'House ']

    let x = d3.scaleLinear()
      .range([0, w])
      .domain([0, 250000])

    let y = d3.scaleOrdinal()
      .range([h - 50, 0])
      .domain(names)

    let yAxis = d3.axisLeft()
      .scale(y)
      .tickSize(0)

    let gy = svg.append('g')
      .attr('class', 'y axis')
      .attr("transform", "translate(50, 20)")
      .call(yAxis)



  }
}
