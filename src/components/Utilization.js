import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { content } from '../Content.js';
import ExampleViz from './visualizations/exampleViz.js';


export default class Utilization extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.formToggle()
  }

  render() {
    let data = this.props.priceData

    return(
      <div className="utilization">
        <p> utilization page </p>
        <ExampleViz data={data} />
        <button><Link to="/Availability" onClick={this.props.handleNextClick}> Next </Link></button>
      </div>
    )
  }
}
