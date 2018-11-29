import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import { content } from './Content.js';
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
      houseCost: 200000,
      location: window.location.href.split('/').pop(),
      updateLocation: this.updateLocation,
    };
  }

  updateLocation = (event) => {
    this.setState({ location: event.target.text })
  };

  handleNextClick = (event) => {
    this.setState({ location: event.target.href.split('/').pop()})
  }

  render() {
    return (
      <div className="App">
          <Router>
            <div>
              <ul className="Navbar">
                <li><Link to="/Preface" onClick={this.updateLocation}>Preface</Link></li>
                <li><Link to="/Scenario" onClick={this.updateLocation}>Scenario</Link></li>
                <li><Link to="/Requirements" onClick={this.updateLocation}>Requirements</Link></li>
                <li><Link to="/Savings" onClick={this.updateLocation}>Savings</Link></li>
                <li><Link to="/Approach" onClick={this.updateLocation}>Approach</Link></li>
                <li><Link to="/Utilization" onClick={this.updateLocation}>Utilization</Link></li>
                <li><Link to="/Availability" onClick={this.updateLocation}>Availability</Link></li>
                <li><Link to="/Comparison" onClick={this.updateLocation}>Comparison</Link></li>
                <li><Link to="/Conclusion" onClick={this.updateLocation}>Conclusion</Link></li>
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

              <Route path="/Preface" render={() => <Preface handleNextClick={this.handleNextClick.bind(this)} location={this.state.location} />} />
              <Route path="/Scenario" render={() => <Scenario handleNextClick={this.handleNextClick.bind(this)} location={this.state.location} />} />
              <Route path="/Requirements" render={() => <Requirements handleNextClick={this.handleNextClick.bind(this)} location={this.state.location} />} />
              <Route path="/Savings" render={() => <Savings handleNextClick={this.handleNextClick.bind(this)} location={this.state.location} />} />
              <Route path="/Approach" render={() => <Approach handleNextClick={this.handleNextClick.bind(this)} location={this.state.location} />} />
              <Route path="/Utilization" render={() => <Utilization handleNextClick={this.handleNextClick.bind(this)} location={this.state.location} />} />
              <Route path="/Availability" render={() => <Availability handleNextClick={this.handleNextClick.bind(this)} location={this.state.location} />} />
              <Route path="/Comparison" render={() => <Comparison handleNextClick={this.handleNextClick.bind(this)} location={this.state.location} />} />
              <Route path="/Conclusion" render={() => <Conclusion handleNextClick={this.handleNextClick.bind(this)} location={this.state.location} />} />
            </div>
          </Router>
          <div>an inanimatedObjects project</div>
      </div>
    );
  }
}

export default App;
