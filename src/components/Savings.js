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
          <p> house cost: {this.props.data[1].cost} </p>
          <p> boat cost: {this.props.data[0].cost} </p>
          <p> truck cost: {this.props.data[2].cost} </p>
          <button><Link to="/Approach" onClick={this.props.handleNextClick}> Next </Link></button>
        </div>
      )
    }
}
