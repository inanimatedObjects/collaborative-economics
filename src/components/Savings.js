import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { content } from '../Content.js';

export default class Savings extends Component {
    constructor() {
      super();
    }

    componentDidMount() {
      this.props.formToggle()
    }

    render() {
      return(
        <div className="savings" >
          <p> savings page </p>
          <p> house cost: {this.props.houseCost} </p>
          <p> boat cost: {this.props.boatCost} </p>
          <p> truck cost: {this.props.truckCost} </p>
          <button><Link to="/Approach" onClick={this.props.handleNextClick}> Next </Link></button>
        </div>
      )
    }
}
