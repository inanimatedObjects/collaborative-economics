import React, { Component } from 'react';
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
      <div className="controller">
        <h3>Gross Bars</h3>
        <GrossBars />
        <h3>Exclusive Bars</h3>
        <ExclusiveBars />
        <h3>Shared Bars</h3>
        <SharedBars />
        <h3>Utilization</h3>
        <Utilization />
        <h3>Line Graph</h3>
        <LineGraph />
      </div>
    )
  }
}
