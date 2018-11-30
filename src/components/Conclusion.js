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
          <p> house cost: {this.props.data[1].cost} </p>
          <p> boat cost: {this.props.data[0].cost} </p>
          <p> truck cost: {this.props.data[2].cost} </p>
        </div>
      )
    }
}
