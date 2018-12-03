import React, { Component } from 'react';
import * as d3 from 'd3';

var margin = {top: 40, right: 50, bottom: 20, left: 50},
    width = 460 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom,
    red = '#eb6a5b',
    green = '#b6e86f',
    blue = '#52b6ca';




for (var i in data) {
    if (!data[i-1]) {
      data[i].value = 12000;
    } else {
      data[i].value = data[i-1].value + 2500;
    }
};

data.forEach(function(d) {
  d.value = +d.value;
  d["date"] = parseDate(d["date"]);
});

class SavingsLineChart extends Component {
  state = {
      values: [],  //array of monthly contributions to savings
      savings: null, // svg path command for all the savings values
    // d3 helpers
      xScale: d3.scaleTime().range([margin.left, width - margin.right]),
      yScale: d3.scaleLinear().range([height - margin.bottom, margin.top]),
      x : d3.scaleTime().range([0, width]),
      y : d3.scaleLinear().range([height, height - 200]),
      lineGenerator: d3.line(),
      parseDate : d3.timeParse("%Y-%m"),
      displayDate : d3.timeFormat("%b %y"),
      displayValue : d3.format("$,.0f"),
  };

  componentDidMount() {
      this.drawChart();
    }

drawChart() {
    const data = [
         {"id" : 1, "name": "A", "value": 10, "date": "2018-10"},
         {"id" : 2, "name": "B", "value": 30, "date": "2019-02"},
         {"id" : 3, "name": "C", "value": 20, "date": "2019-03"},
         {"id" : 4, "name": "D", "value": 140, "date": "2019-04"},
         {"id" : 5, "name": "E", "value": 50, "date": "2019-05"},
         {"id" : 6, "name": "F", "value": 20, "date": "2019-06"},
         {"id" : 7, "name": "G", "value": 50, "date": "2019-07"},
         {"id" : 8, "name": "H", "value": 80, "date": "2019-08"},
         {"id" : 9, "name": "I", "value": 30, "date": "2019-09"},
         {"id" : 10, "name": "J", "value": 70, "date": "2019-10"},
         {"id" : 11, "name": "K", "value": 90, "date": "2019-11"},
         {"id" : 12, "name": "L", "value": 100, "date": "2019-12"},
         {"id" : 13, "name": "M", "value": 110, "date": "2020-01"},
         {"id" : 14, "name": "N", "value":120, "date": "2020-02"},
         {"id" : 15, "name": "O", "value": 130, "date": "2020-03"},
         {"id" : 16, "name": "P", "value": 140, "date": "2020-04"},
         {"id" : 17, "name": "Q", "value": 150, "date": "2020-05"},
         {"id" : 18, "name": "R", "value": 160, "date": "2020-06"},
         {"id" : 18, "name": "R", "value": 160, "date": "2020-08"},
         {"id" : 18, "name": "R", "value": 160, "date": "2020-10"},
         {"id" : 19, "name": "S", "value": 170, "date": "2021-01"}];


    const svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

     }

    xAxis = d3.axisBottom().scale(this.state.xScale)
        .tickFormat(d3.timeFormat('%b'));
    yAxis = d3.axisLeft().scale(this.state.yScale)
        .tickFormat(d => `${d}℉`);


    static getDerivedStateFromProps(nextProps, prevState) {
      // data hasn't been loaded yet so do nothing
      if (!nextProps.data) return null;
      const {data} = nextProps;
      const {xScale, yScale, lineGenerator} = prevState;

    // data has changed, so recalculate scale domains
        const timeDomain = d3.extent(data, d => d.date);
        const savingsMax = d3.max(data, d => d.value);
        xScale.domain(timeDomain);
        yScale.domain([0, savingsMax]);

        const values = data.map(d => {

        })

    // calculate line for value of savings
        lineGenerator.x(d => xScale(d.date));
        lineGenerator.y(d => yScale(d.value));
        const savings = lineGenerator(data);

    return {savings, values};
  }

  componentDidUpdate() {
    d3.select(this.refs.xAxis).call(this.xAxis);
    d3.select(this.refs.yAxis).call(this.yAxis);
  }


  render() {
    return (
        <svg width={width} height={height}>
            {this.state.values.map((d,i) =>
                (<circle key={i} cx={d.date} cy={d.value} r='7' id={d.id} fill="#fcb0b5" />))}

            <path d={this.state.values} fill='none' stroke={red} strokeWidth='2' />

            <g>
                <g ref='xAxis' transform={`translate(0, ${height - margin.bottom})`} />
                <g ref='yAxis' transform={`translate(${margin.left}, 0)`} />
            </g>

        </svg>
    );
  }
}

export default SavingsLineChart;
