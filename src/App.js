import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import './App.css';
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
      data: {
        boatCost: 50000,
        houseCost: 200000,
        truckCost: 20000
      },
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
    let updatedData = {...this.state.data,
      houseCost: event.target.elements[0].value,
      boatCost: event.target.elements[1].value,
      truckCost: event.target.elements[2].value
    }
    this.setState({
      data: updatedData
    })
    console.log(this.state.data.houseCost)
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
                  <div className="Data">
                    <form id="inputForm" onSubmit={this.updateCosts}>
                      House Cost: <input type="number" name="houseInput" defaultValue={this.state.data.houseCost} />
                      Boat Cost: <input type="number" name="boatInput" defaultValue={this.state.data.boatCost} />
                      Truck Cost: <input type="number" name="truckInput" defaultValue={this.state.data.truckCost} />
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
