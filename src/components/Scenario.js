import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { content } from '../Content.js';

export default class Scenario extends Component {
    constructor() {
      super();
    }
    render() {
      return(
        <div className="scenario" >
          <p>scenario page</p>
          <button><Link to="/Requirements" onClick={this.props.handleNextClick}> Next </Link></button>
        </div>
      )
    }
}
