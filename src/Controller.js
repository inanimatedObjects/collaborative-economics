import React, { Component } from 'react';
import Viz from './Viz.js';

export default class Controller extends Component {
  state = {
    bands: "",
    width: "",
    toDraw: [],
  }

  onSubmit = (evt) => {
  	evt.preventDefault();
  	const newShape = {
  	   bands: this.state.bands,
  	   width: this.state.width,
  	}
    this.setState({ toDraw: [...this.state.toDraw, newShape]})
  }

  onChange = (evt) => {
  	this.setState({[evt.target.name]: evt.target.value})
  }

  render() {
    return(
      <div className="controller">
        <form onSubmit={this.onSubmit}>
            <label htmlFor="bandsSelect">Choose number of bands:</label>
                        <select id="bands-select" name="bands" onChange={this.onChange} value={this.state.bands||"default"}>
                                <option disabled value="default">choose</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                        </select>

            <input name="mode" type="radio" value="mirror" id="horizon-mode-mirror" checked  onChange={this.onChange}/><label htmlFor="horizon-mode-mirror"> Mirror</label>
            <input name="mode" type="radio" value="offset" id="horizon-mode-offset"  onChange={this.onChange}/><label htmlFor="horizon-mode-offset"> Offset</label>
            // <button type="submit">draw!</button>

        </form>

        { this.state.toDraw.length ? <Viz shapes={this.state.toDraw}/> : null}
      </div>

    )
  }
}
