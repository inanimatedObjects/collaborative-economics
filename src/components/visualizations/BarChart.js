// import React, { useEffect } from 'react';
import * as d3 from 'd3';
import './BarChart.css';

const drawBarChart = (props) => {
  d3.select('.viz > *').remove();
  const margin = {top: 50, right: 20, bottom: 30, left: 30},
  w = 760 - margin.left - margin.right,
  h = 380 - margin.top - margin.bottom;

  const formatPercent = d3.format("+,%");

  const someData = [ {key: 'W1', value: 32},
                   {key: 'W2', value: 26},
                   {key: 'W3', value: 45},
                   {key: 'W4', value: 38},
                   {key: 'W5', value: 53},
                   {key: 'W6', value: 48},
                   {key: 'W7', value: 42},
                   {key: 'W8', value: 34},
                   {key: 'W9', value: 37},
                   {key: 'W10', value: 36},
  ];
  // const usage = props.shapes
  const usage = someData;

// Creating the scale variables and setting the ranges
  const xScale = d3.scaleBand()
                              .rangeRound([0, w])
                              .padding(0.1),
    yScale = d3.scaleLinear()
                        .rangeRound([h, 0]);
    // 
    // const yAxis = d3.svg.axis()
    //                         .scale(y)
    //                         .orient("left")
    //                         .tickSize(0)
    //                         .tickPadding(6);

  let weeks = usage.map(d => d.key)
  let values = usage.map(d => d.values)

// Adjusting data by assigning domain to the range of the scale
  xScale.domain(weeks);
  yScale.domain([0, d3.max(values)]);

  // Appending the svg object to the div on the page
  var svg = d3.select('.viz').append('svg')
      .attr('width', w + margin.left + margin.right)
      .attr('height', h + margin.top + margin.bottom)
      .attr('id', 'svg-viz')


    // Appending the 'group' element to the svg
    // Moving the 'group' element to the top left margin
  let g = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // Adding header to the chart
  g.attr('class', 'headerText')
     .append('text')
     .attr('transform', 'translate(' + (w / 2) + ',' + (-margin.top / 2) + ')')
     .attr('text-anchor', 'middle')
     .attr('font-weight', 600)
     .text('Utilization Bar Chart');

  // Appending X axis and formatting the text
  g.append('g')
      .attr('class', 'axisX')
      .attr('transform', 'translate(0,' + h + ')')
      .call(d3.axisBottom(xScale))
      .attr('font-weight', 'bold');

  // Appending Y axis
  g.append('g')
      .attr('class', 'axisY')
      .call(d3.axisLeft(yScale).ticks(10));

  // Creating chart
  var chart = g.selectAll('bar')
      .data(usage)
      .enter().append('g')

  // Appending bar chart to the chart
  chart.append('rect')
      .attr('class', 'bar')
      .attr('x', function(d) { return xScale(d.key); })
      .attr('height', function(d) { return h - yScale(d.value); })
      .attr('y', function(d) { return yScale(d.value); })
      .attr('width', xScale.bandwidth());

  // Appending text to each bar chart
  chart.append('text')
      .attr('class', 'barText')
      .attr('x', function(d) { return xScale(d.key); })
      .attr('y', function(d) { return yScale(d.value); })
      .attr('dx', xScale.bandwidth()/2)
      .attr('dy', 20)
      .attr('text-anchor', 'middle')
      .text(function(d){ return d.value; });

  // Adding mouseover and mouseout functions to the chart
  chart.on('mouseover', function(d){
        d3.select(this).attr('opacity', 0.7);
        })
      .on('mouseout', function(d){
        d3.select(this)
          .attr('opacity', 1)});
}

export default drawBarChart
