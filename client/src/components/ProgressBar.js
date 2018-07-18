import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTask } from '../actions/tasks';

export default class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0
    };
  }
  
  eventHandler() {
    this.setState({
      progress: this.state.progress < 100 ? this.state.progress + 5 : 100
    });
  }
  
  render() {
    var progress = {
      width: this.state.progress + "%"
    }

    return (
      <div>
        <p>EXP to next Level:</p>
        <div className="shell">
          <div className="bar" style={ progress }><span>{ this.state.progress + "%" }</span></div>
        </div>
        <button onClick={ this.eventHandler.bind(this) }>+</button>
      </div>
    )
  }
}
