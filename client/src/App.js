import React, { Component } from 'react';
import logo from './logo.svg';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">TaskMonster</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      </React.Fragment>
    );
  }
}

export default App;

