import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { content } from '../Content.js';

export default class Availability extends Component {
    constructor() {
      super();
    }

    componentDidMount() {
      this.props.formToggle()
    }

    render() {
      return(
        <div className="availability" >
        <p>availability page</p>
        <p> house cost: {this.props.data.houseCost} </p>
        <p> boat cost: {this.props.data.boatCost} </p>
        <p> truck cost: {this.props.data.truckCost} </p>
        <button><Link to="/Comparison" onClick={this.props.handleNextClick}> Next </Link></button>
        </div>
      )
    }
}
