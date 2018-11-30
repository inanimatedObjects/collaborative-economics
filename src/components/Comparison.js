import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { content } from '../Content.js';


export default class Comparison extends Component {
    constructor() {
      super();
    }

    componentDidMount() {
      this.props.formToggle()
    }

    render() {
      return(
        <div className="comparison" >
          <p> comparison page </p>
          <p> house cost: {this.props.priceData[1].cost} </p>
          <p> boat cost: {this.props.priceData[0].cost} </p>
          <p> truck cost: {this.props.priceData[2].cost} </p>
          <button><Link to="/Conclusion" onClick={this.props.handleNextClick}> Next </Link></button>
        </div>
      )
    }
}
