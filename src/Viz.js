// import React, { Component } from 'react';  // using Classes
import React, { useEffect } from 'react';  // using Hooks
import * as d3 from 'd3';

import drawBarChart from './components/visualizations/BarChart.js';

// ==== to use React Hooks instead of Classes ===
const Viz = (props) => {
  useEffect(() => {
    d3.select('.viz > *').remove();
    drawBarChart(props)
  }, [props.shapes.length])
  return <div className="viz" />
}

export default Viz














// ==== to use React Classes instead of Hooks ===
// export default class Viz extends Component {
//   componentDidMount() {
//       drawBarChart(this.props)
//   }
//   componentDidUpdate(prevProps){
//     drawBarChart(this.props)
//   }
//   render() {
//     return (
//       <div className="viz" />
//     )
//   }
// }
