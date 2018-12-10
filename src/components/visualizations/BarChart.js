// import React, { useEffect } from 'react';
import * as d3 from 'd3';
import './BarChart.css';

const drawBarChart = (props) => {
  d3.select('.viz > *').remove();

//   const svg = d3.select('svg');
//   const controlHeight = 50;
//   const margin = {top: 10, right: 10, bottom: 20, left: 20};
//   const w = +svg.attr('width') - margin.left - margin.right;
//   const h = +svg.attr('height') - controlHeight - margin.top - margin.bottom;
//   const formatPercent = d3.format("+,%");
//   const g = svg.append('g')
//                         .attr('transform', `translate(${margin.left},${margin.top})`);
//
//
//   const someData = [ {key: 'W1', value: 32},
//                    {key: 'W2', value: 26},
//                    {key: 'W3', value: 45},
//                    {key: 'W4', value: 38},
//                    {key: 'W5', value: 53},
//                    {key: 'W6', value: 48},
//                    {key: 'W7', value: 42},
//                    {key: 'W8', value: 34},
//                    {key: 'W9', value: 37},
//                    {key: 'W10', value: 36},
//   ];
//
//   const weeks = someData.map(d => d.key);
//   const values = someData.map(d => d.values);
//
//   const color = d3.scaleOrdinal()
//     .domain(d3.range(n))
//     .range(d3.schemeCategory20c.slice(8, 12)); // greens
//
//   const series = g.selectAll('.series')
//     .data(x01z)
//     .enter().append('g')
//       .attr('fill', (d, i) => color(i));
//
//   const rect = series.selectAll('rect')
//     .data(d => d)
//     .enter().append('rect')
//       .attr('x', 0)
//       .attr('y', (d, i) => y(i))
//       .attr('width', 0)
//       .attr('height', y.bandwidth());
//
// // Creating the scale variables and setting the ranges
//   const xScale = d3.scaleBand()
//                               .rangeRound([0, w])
//                               .padding(0.1),
//     yScale = d3.scaleLinear()
//                         .rangeRound([h, 0]);
//
// // Adjusting data by assigning domain to the range of the scale
//   xScale.domain(weeks);
//   yScale.domain([0, d3.max(values)]);
//
//   // Appending the svg object to the div on the page
//   const svg = d3.select('.viz').append('svg')
//       .attr('width', w + margin.left + margin.right)
//       .attr('height', h + margin.top + margin.bottom)
//       .attr('id', 'svg-viz')
//
// // Appending the 'group' element to the svg
//     // Moving the 'group' element to the top left margin
//   let g = svg.append('g')
//         .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
//
//   // Adding header to the chart
//   g.attr('class', 'headerText')
//      .append('text')
//      .attr('transform', 'translate(' + (w / 2) + ',' + (-margin.top / 2) + ')')
//      .attr('text-anchor', 'middle')
//      .attr('font-weight', 600)
//      .text('Utilization Bar Chart');
//
//   // Appending X axis and formatting the text
//   g.append('g')
//       .attr('class', 'axisX')
//       .attr('transform', 'translate(0,' + h + ')')
//       .call(d3.axisBottom(xScale))
//       .attr('font-weight', 'bold');
//
//   // Appending Y axis
//   g.append('g')
//       .attr('class', 'axisY')
//       .call(d3.axisLeft(yScale).ticks(10));
//
//   // Creating chart
//   var chart = g.selectAll('bar')
//       .data(someData)
//       .enter().append('g')
//
//   // Appending bar chart to the chart
//   chart.append('rect')
//       .attr('class', 'bar')
//       .attr('x', function(d) { return xScale(d.key); })
//       .attr('height', function(d) { return h - yScale(d.value); })
//       .attr('y', function(d) { return yScale(d.value); })
//       .attr('width', xScale.bandwidth());

  // Appending text to each bar chart
  // chart.append('text')
  //     .attr('class', 'barText')
  //     .attr('x', function(d) { return xScale(d.key); })
  //     .attr('y', function(d) { return yScale(d.value); })
  //     .attr('dx', xScale.bandwidth()/2)
  //     .attr('dy', 20)
  //     .attr('text-anchor', 'middle')
  //     .text(function(d){ return d.value; });

  // Adding mouseover and mouseout functions to the chart
  // chart.on('mouseover', function(d){
  //       d3.select(this).attr('opacity', 0.7);
  //       })
  //     .on('mouseout', function(d){
  //       d3.select(this)
  //         .attr('opacity', 1)});



  const n = 4; // The number of series
  const m = 58; // The number of values per series

  const xz = d3.range(n).map(() => bumps(m));
  const yz = d3.range(m);
  const x01z = d3.stack().keys(d3.range(n))(d3.transpose(xz));
  const xMaxGrouped = d3.max(xz, x => d3.max(x));
  const xMaxStacked = d3.max(x01z, x => d3.max(x, d => d[1]));

  console.log('xz', xz);
  console.log('yz', yz);
  console.log('x01z', x01z);
  console.log('xMaxGrouped', xMaxGrouped);
  console.log('xMaxStacked', xMaxStacked);

  const svg = d3.select('svg');
  const controlHeight = 50;
  const margin = {top: 10, right: 10, bottom: 20, left: 20};
  const width = +svg.attr('width') - margin.left - margin.right;
  const height = +svg.attr('height') - controlHeight - margin.top - margin.bottom;
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear()
    .domain([0, xMaxStacked])
    .range([0, width]);

  const y = d3.scaleBand()
    .domain(yz)
    .rangeRound([0, height])
    .padding(0.08);

  const color = d3.scaleOrdinal()
    .domain(d3.range(n))
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    // .range(d3.schemeCategory20c.slice(8, 12)); // greens

  const series = g.selectAll('.series')
    .data(x01z)
    .enter().append('g')
      .attr('fill', (d, i) => color(i));

  const rect = series.selectAll('rect')
    .data(d => d)
    .enter().append('rect')
      .attr('x', 0)
      .attr('y', (d, i) => y(i))
      .attr('width', 0)
      .attr('height', y.bandwidth());

  rect.transition()
    .delay((d, i) => i * 10)
    .attr('x', d => x(d[0]))
    .attr('y', (d, i) => y(i))
    .attr('width', d => x(d[1]) - x(d[0]));

  g.append('g')
    .attr('class', 'axis axis--y')
      .attr('transform', `translate(0,0)`)
      .call(d3.axisLeft(y)
        .tickSize(0)
        .tickPadding(6));

  d3.selectAll('input')
    .on('change', changed);

  const timeout = d3.timeout(() => {
    d3.select('input[value=\'grouped\']')
      .property('checked', true)
      .dispatch('change');
  }, 2000);

  function changed() {
    timeout.stop();
    if (this.value === 'grouped') transitionGrouped();
    else transitionStacked();
  }

  function transitionGrouped() {
    x.domain([0, xMaxGrouped]);

    rect.transition()
      .duration(500)
      .delay((d, i) => i * 10)
      .attr('y', function(d, i) {
        return y(i) + y.bandwidth() / n * this.parentNode.__data__.key;
      })
      .attr('height', y.bandwidth() / n)
      .transition()
        .attr('x', d => x(0))
        .attr('width', d => x(0) + x(d[1] - d[0]));
  }

  function transitionStacked() {
    x.domain([0, xMaxStacked]);

    rect.transition()
      .duration(500)
      .delay((d, i) => i * 10)
      .attr('x', d => x(d[0]))
      .attr('width', d => x(d[1]) - x(d[0]))
      .transition()
        .attr('y', (d, i) => y(i))
        .attr('height', y.bandwidth());
  }

  // Returns an array of m psuedorandom, smoothly-varying non-negative numbers.
  // Inspired by Lee Byron’s test data generator.
  // http://leebyron.com/streamgraph/
  function bumps(m) {
    const values = [];
    let i;
    let j;
    let w;
    let x;
    let y;
    let z;

    // Initialize with uniform random values in [0.1, 0.2).
    for (i = 0; i < m; ++i) {
      values[i] = 0.1 + 0.1 * Math.random();
    }

    // Add five random bumps.
    for (j = 0; j < 5; ++j) {
      x = 1 / (0.1 + Math.random());
      y = 2 * Math.random() - 0.5;
      z = 10 / (0.1 + Math.random());
      for (i = 0; i < m; i++) {
        w = (i / m - y) * z;
        values[i] += x * Math.exp(-w * w);
      }
    }

    // Ensure all values are positive.
    for (i = 0; i < m; ++i) {
      values[i] = Math.max(0, values[i]);
    }

    return values;
  }



}

export default drawBarChart
