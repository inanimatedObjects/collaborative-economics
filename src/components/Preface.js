import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { content } from '../Content.js';



export default class Preface extends Component {
    constructor() {
      super();
    }
    render() {
      return(
        <div className="preface" >
          <p>preface page</p>
          <p> house cost: {this.props.houseCost} </p>
          <p> boat cost: {this.props.boatCost} </p>
          <p> truck cost: {this.props.truckCost} </p>
          <button><Link to="/Scenario" onClick={this.props.handleNextClick}> Next </Link></button>
        </div>
      )
    }
}
