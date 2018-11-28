import React, { Component } from 'react';


export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      boatCost: 25000,
      houseCost: 200000,
      pageName: "Home"
    };
  }


  render() {
    return(
        <div>{this.state.pageName}</div>
    )
  }
}
