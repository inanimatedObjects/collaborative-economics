import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
// import './Content.js';
import Drivers from './components/Drivers.js';
import Scenario from './components/Scenario.js';
import Preface from './components/Preface.js';
import Requirements from './components/Requirements.js';
import Savings from './components/Savings.js';
import Approach from './components/Approach.js';
import Utilization from './components/Utilization.js';
import Availability from './components/Availability.js';
import Comparison from './components/Comparison.js';
import Conclusion from './components/Conclusion.js';

const content = {
    Preface: 'this is the preface',
    Scenario: 'scenario',
    Requirements: 'requirements',
    Savings: 'savings',
    Approach: 'approach',
    Utilization: 'utilization',
    Availability: 'availability',
    Comparison: 'comparison',
    Conclusion: 'conclusion'
}


class App extends Component {

  constructor() {
    super();
    this.state = {
      boatCost: 50000,
      houseCost: 200000,
      location: '',
      updateLocation: this.updateLocation,
    };
  }

  updateLocation = (event) => {
    this.setState({ location: event.target.text })
  };

  render() {
    return (
      <div className="App">
          <Router>
            <div>
              <ul>
                <li><Link to="/Preface" onClick={this.updateLocation}>Preface</Link></li>
                <li><Link to="/Scenario" onClick={this.updateLocation}>Scenario</Link></li>
                <li>
                  <Link to="/Requirements" onClick={this.updateLocation}>Requirements</Link>
                </li>
                <li>
                  <Link to="/Savings" onClick={this.updateLocation}>Savings</Link>
                </li>
                <li>
                  <Link to="/Approach" onClick={this.updateLocation}>Approach</Link>
                </li>
                <li>
                  <Link to="/Utilization" onClick={this.updateLocation}>Utilization</Link>
                </li>
                <li>
                  <Link to="/Availability" onClick={this.updateLocation}>Availability</Link>
                </li>
                <li>
                  <Link to="/Comparison" onClick={this.updateLocation}>Comparison</Link>
                </li>
                <li>
                  <Link to="/Conclusion" onClick={this.updateLocation}>Conclusion</Link>
                </li>
              </ul>

              <hr />
              <header className="App-header">
                <h1> collaborative economics </h1>
              </header>

              <div className="Top-content-bar">
                <div className="ContentCopy">
                  <div className="Content">{content[this.state.location]}</div>
                </div>
                <div className="Drivers">
                  <div className="Data">Data Drivers</div>
                </div>
              </div>

              <Route path="/Preface" component={Preface} />
              <Route path="/Scenario" component={Scenario} />
              <Route path="/Requirements" component={Requirements} />
              <Route path="/Savings" component={Savings} />
              <Route path="/Approach" component={Approach} />
              <Route path="/Utilization" component={Utilization} />
              <Route path="/Availability" component={Availability} />
              <Route path="/Comparison" component={Comparison} />
              <Route path="/Conclusion" component={Conclusion} />
            </div>
          </Router>
          <div>an inanimatedObjects project</div>
      </div>
    );
  }
}

export default App;
