import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
// import Home from './components/Home.js';
import Scenario from './components/Scenario.js';
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
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/Scenario">Scenario</Link>
                </li>
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
              <h3> collaborative economics </h3>
              <h3> this is where the persistent drivers will go </h3>
              </header>
              <h3>this page</h3>

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
      </div>
    );
  }
}

export default App;
