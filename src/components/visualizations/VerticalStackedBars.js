import React, { Component } from 'react';
import * as d3 from 'd3';

export default class VerticalStackedBars extends Component {
  constructor() {
    super();
    this.draw = this.draw.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.draw(this.props)
  }

  componentDidUpdate() {
    this.update(this.props)
  }

  render() {
    return(
      <div className="verticalStackedBars" />
    )
  }

  draw(props) {
    let data = props.data
    let totalCost = props.data.boatCost + props.data.houseCost + props.data.truckCost
    let labels = ['Truck ', 'Boat ', 'House ']

    const w = 600;
    const h = 300;

    let svg = d3.select('.verticalStackedBars').append('svg')
      .attr('height', h)
      .attr('width', w)
      .attr('id', 'verticalStackedBars')

    let x = d3.scaleLinear()
      .range([0, w])
      .domain([0, totalCost])

    let xAxis = d3.axisBottom(x)
    .ticks(10, '$~s')

    let gx = svg.append('g')
    .attr('class', 'xAxis')
    .attr("transform", "translate(50, 270)")
    .call(xAxis)

    let y = d3.scaleBand()
      .range([h - 50, 0])
      .domain(labels)

    let gy = svg.append('g')
      .attr('class', 'yAxis')
      .attr("transform", "translate(50, 20)")
      .call(d3.axisLeft(y))

    let houseBar = svg.append('rect')
      .attr('class', 'bar houseBar')
      .attr('width', (props.data.houseCost / totalCost) * w)
      .attr('height', 50)
      .attr('x', 50)
      .attr('y', 35)
      .attr('fill', 'green')

    let boatBar = svg.append('rect')
      .attr('class', 'bar boatBar')
      .attr('width', (props.data.boatCost / totalCost) * w)
      .attr('height', 50)
      .attr('x', 50)
      .attr('y', 120)
      .attr('fill', 'blue')

    let truckBar = svg.append('rect')
      .attr('class', 'bar truckBar')
      .attr('width', (props.data.truckCost / totalCost) * w)
      .attr('height', 50)
      .attr('x', 50)
      .attr('y', 205)
      .attr('fill', 'red')
  }

  update(props) {
    let data = props.data
    let totalCost = props.data.boatCost + props.data.houseCost + props.data.truckCost

    const w = 600

    // // update bars
    let houseBarUpdate = d3.select('.houseBar')
      .attr('width', (data.houseCost / totalCost) * w)
    let boatBarUpdate = d3.select('.boatBar')
      .attr('width', (data.boatCost / totalCost) * w)
    let truckBarUpdate = d3.select('.truckBar')
      .attr('width', (data.truckCost / totalCost) * w)
  }

}
