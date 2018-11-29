import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { content } from '../Content.js';

export default class Approach extends Component {
    constructor() {
      super();
    }
    render() {
      return(
        <div className="approach" >
          <p> approach page </p>
          <p> house cost: {this.props.houseCost} </p>
          <p> boat cost: {this.props.boatCost} </p>
          <p> truck cost: {this.props.truckCost} </p>
          <button><Link to="/Utilization" onClick={this.props.handleNextClick}> Next </Link></button>
        </div>
      )
    }
}
