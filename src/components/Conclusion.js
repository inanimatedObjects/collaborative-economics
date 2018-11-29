import React, { Component } from 'react';

export default class Conclusion extends Component {
    constructor() {
      super();
    }

    componentDidMount() {
      this.props.formToggle()
    }

    render() {
      return(
        <div className="conclusion" >
          <p>conclusion page</p>
          <p> house cost: {this.props.houseCost} </p>
          <p> boat cost: {this.props.boatCost} </p>
          <p> truck cost: {this.props.truckCost} </p>
        </div>
      )
    }
}
