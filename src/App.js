import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
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

class App extends Component {
    constructor() {
      super();
      this.state = {
        boatCost: 50000,
        houseCost: 200000
      };
    }

  render() {
    return (
      <div className="App">
          <Router>
            <div>
              <ul>
                <li><Link to="/Preface">Preface</Link></li>
                <li><Link to="/Scenario">Scenario</Link></li>
                <li>
                  <Link to="/Requirements">Requirements</Link>
                </li>
                <li>
                  <Link to="/Savings">Savings</Link>
                </li>
                <li>
                  <Link to="/Approach">Approach</Link>
                </li>
                <li>
                  <Link to="/Utilization">Utilization</Link>
                </li>
                <li>
                  <Link to="/Availability">Availability</Link>
                </li>
                <li>
                  <Link to="/Comparison">Comparison</Link>
                </li>
                <li>
                  <Link to="/Conclusion">Conclusion</Link>
                </li>
              </ul>

              <hr />
              <header className="App-header">
                <h1> collaborative economics </h1>
              </header>
              
              <div className="Top-content-bar">
                <div className="ContentCopy">
                  <div className="Content"> Content copy</div>
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
