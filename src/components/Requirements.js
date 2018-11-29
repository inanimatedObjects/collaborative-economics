import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { content } from '../Content.js';

export default class Requirements extends Component {
    constructor() {
      super();
    }
    render() {
      return(
        <div className="requirements">
          <p> requirements page </p>
          <button><Link to="/Savings" onClick={this.props.handleNextClick}> Next </Link></button>
        </div>
      )
    }
}
