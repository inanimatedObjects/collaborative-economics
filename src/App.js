import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Home from './components/Home.js';
import ExclusiveBars from './components/ExclusiveBars.js';
import GrossBars from './components/GrossBars.js';
import LineGraph from './components/LineGraph.js';
import SharedBars from './components/SharedBars.js';
import Utilization from './components/Utilization.js';

class App extends Component {
    state = {
        pageName: this.updatePageName
    }

    updatePageName = (e) => {
        this.setState({pageName: e.target.value});
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
          <header className="App-header">
          <h3> collaborative economics </h3>
          <h3> this is where the persistent drivers will go </h3>
          </header>
          <h3 className="pageName">{this.state.pageName}</h3>
          <Route path="/" component={Home} />
          <Route path="/ExclusiveBars" component={ExclusiveBars} />
          <Route path="/GrossBars" component={GrossBars} />
          <Route path="/SharedBars" component={SharedBars} />
          <Route path="/Utilization" component={Utilization} />
          <Route path="/LineGraph" component={LineGraph} />
        </div>
      </Router>


      </div>
    );
  }
}

export default App;
