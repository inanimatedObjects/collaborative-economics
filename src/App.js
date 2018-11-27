import React, { Component } from 'react';
import './App.css';
import Home from './components/Home.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3> collaborative economics </h3>
          <h3> this is where the persistent drivers will go </h3>
        </header>
        <Home />
      </div>
    );
  }
}

export default App;
