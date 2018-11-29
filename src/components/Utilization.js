import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { content } from '../Content.js';
import * as d3 from 'd3';


export default class Utilization extends Component {
  constructor() {
    super();
  }

  render() {
    return(
      <div className="utilization">
        <p> utilization page </p>
        <p> house cost: {this.props.houseCost} </p>
        <p> boat cost: {this.props.boatCost} </p>
        <p> truck cost: {this.props.truckCost} </p>
        <button><Link to="/Availability" onClick={this.props.handleNextClick}> Next </Link></button>
      </div>
    )
  }
}
