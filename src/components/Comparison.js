import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { content } from '../Content.js';


export default class Comparison extends Component {
    constructor() {
      super();
    }
    render() {
      return(
        <div className="comparison" >
          <p> comparison page </p>
          <button><Link to="/Conclusion" onClick={this.props.handleNextClick}> Next </Link></button>
        </div>
      )
    }
}
