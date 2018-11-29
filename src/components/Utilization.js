import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { content } from '../Content.js';
import * as d3 from 'd3';


export default class Utilization extends Component {
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
      <div className="utilization">
        <p> utilization page </p>
        <button><Link to="/Availability" onClick={this.props.handleNextClick}> Next </Link></button>
      </div>
    )
  }

  draw(props) {
    const w = 600;
    const h = 300;
    let svg = d3.select('.utilization').append('svg')
      .attr('height', h)
      .attr('width', w)
      .attr('id', 'utilization')

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
