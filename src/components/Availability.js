import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { content } from '../Content.js';

export default class Availability extends Component {
    constructor() {
      super();
    }
    render() {
      return(
        <div className="availability" >
        <p>availability page</p>
        <button><Link to="/Comparison" onClick={this.props.handleNextClick}> Next </Link></button>
        </div>
      )
    }
}
