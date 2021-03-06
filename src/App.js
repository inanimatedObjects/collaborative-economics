import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import './App.css';
import Controller from './Controller.js'

import { content } from './Content.js';
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
      priceData: [
        {item: 'Boat', cost: 50000},
        {item: 'House', cost: 200000},
        {item: 'Truck', cost: 20000},
        {item: 'Total', cost: 270000},
      ],
      availabilityData: [
        {uptime: 20, downtime:80},
        {uptime: 40, downtime:60},
      ],
      usage: [ {key: 'W1', value: 32},
                 {key: 'W2', value: 26},
                 {key: 'W3', value: 45},
                 {key: 'W4', value: 38},
                 {key: 'W5', value: 53},
                 {key: 'W6', value: 48},
                 {key: 'W7', value: 42},
                 {key: 'W8', value: 34},
                 {key: 'W9', value: 37},
                 {key: 'W10', value: 36},
      ],
      location: 'Preface',
      handleNextClick: this.handleNextClick,
      formToggle: this.formToggle
    };
  }

  // Hide/show input panel
  formToggle = () => {
    let form = document.getElementById('inputForm')
    if (this.state.location === 'Preface' || this.state.location === 'Scenario' || this.state.location === 'Conclusion') {
      form.style.visibility = 'hidden'
    } else {
      form.style.visibility = 'visible'
    }
  }

  // Update location via navbar
  updateLocation = (event) => {
    this.setState({ location: event.target.text })
  };

  // Update location via next button
  handleNextClick = (event) => {
    this.setState({ location: event.target.href.split('/').pop()})
  }

  // Update cost data in state when form is submitted
  updateCosts = (event) => {
    event.preventDefault()

    let updatedPriceData = [...this.state.priceData]
    for (let i in updatedPriceData.slice(0, 3)){
      updatedPriceData[i].cost = Number(event.target.elements[i].value)
    }
    updatedPriceData[3].cost = Number(event.target.elements[0].value) + Number(event.target.elements[1].value) + Number(event.target.elements[2].value)

    this.setState({
      priceData: updatedPriceData
    })
  }

  render() {
    return (
      <div className="App">
      <Controller />
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
                  <div className="Data">
                    <form id="inputForm" onSubmit={this.updateCosts}>
                      Boat Cost: <input type="number" name="boatInput" defaultValue={this.state.priceData[0].cost} />
                      House Cost: <input type="number" name="houseInput" defaultValue={this.state.priceData[1].cost} />
                      Truck Cost: <input type="number" name="truckInput" defaultValue={this.state.priceData[2].cost} />
                      <input type="submit" value="Update" />
                    </form>
                  </div>
                </div>
              </div>

              <Route path="/"><Redirect to="/Preface" /></Route>
              <Route path="/Preface" render={() => <Preface {...this.state} />} />
              <Route path="/Scenario" render={() => <Scenario {...this.state} />} />
              <Route path="/Requirements" render={() => <Requirements {...this.state} />} />
              <Route path="/Savings" render={() => <Savings {...this.state} />} />
              <Route path="/Approach" render={() => <Approach {...this.state} />} />
              <Route path="/Utilization" render={() => <Utilization {...this.state} />} />
              <Route path="/Availability" render={() => <Availability {...this.state} />} />
              <Route path="/Comparison" render={() => <Comparison {...this.state} />} />
              <Route path="/Conclusion" render={() => <Conclusion {...this.state} />} />
            </div>
          </Router>
          <div>an inanimatedObjects project</div>
      </div>
    );
  }
}

export default App;
