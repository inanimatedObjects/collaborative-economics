import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ExclusiveBars from './components/ExclusiveBars.js';
import GrossBars from './components/GrossBars.js';
import LineGraph from './components/LineGraph.js';
import SharedBars from './components/SharedBars.js';
import Utilization from './components/Utilization.js';

export default class Controller extends Component {
  constructor() {
    super();
    this.state = {
      boatCost: 25000,
      houseCost: 200000,
    };
  }

  render() {
    return(
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/ExclusiveBars">Exclusive Bars</Link>
            </li>
            <li>
              <Link to="/GrossBars">Gross Bars</Link>
            </li>
            <li>
              <Link to="/SharedBars">Shared Bars</Link>
            </li>
            <li>
              <Link to="/Utilization">Utilization</Link>
            </li>
            <li>
              <Link to="/LineGraph">Line Graph</Link>
            </li>
          </ul>

          <hr />

          <Route path="/ExclusiveBars" component={ExclusiveBars} />
          <Route path="/GrossBars" component={GrossBars} />
          <Route path="/SharedBars" component={SharedBars} />
          <Route path="/Utilization" component={Utilization} />
          <Route path="/LineGraph" component={LineGraph} />
        </div>
      </Router>
    )
  }
}
