import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { content } from '../Content.js';

export default class Savings extends Component {
    constructor() {
      super();
    }
    render() {
      return(
        <div className="savings" >
          <p> savings page </p>
          <button><Link to="/Approach" onClick={this.props.handleNextClick}> Next </Link></button>
        </div>
      )
    }
}
