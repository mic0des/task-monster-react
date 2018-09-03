import React, { Component } from 'react';
import './App.css';
import 'sweetalert/dist/sweetalert.css';
import TaskForm from './components/TaskForm';
import Tasks from './components/Tasks';
import Monster from './components/Monster';
import ProgressBar from './components/ProgressBar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TaskModule from './components/TaskModule';
import Navigation from './components/Navigation';
import TaskLists from './components/TaskLists';
import About from './components/About';
import SignUpForm from './components/auth/SignUpForm';
import SignInForm from './components/auth/SignInForm';
import TaskListForm from './components/TaskListForm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Calendar from './components/Calendar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SweetAlert from 'sweetalert-react';
import history from './history';
import Eth from 'ethjs-query';
import EthContract from 'ethjs-contract';
import * as contractUtils from './utils/ContractInfo';
import { fetchTaskLists } from './actions/taskLists';

class App extends Component {
  state = {
    taskLists: []
  };

  parseJwt = token => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64))
  }

  componentWillMount = () => {
    if (typeof web3 !== 'undefined') {
      // startApp(web3);
      console.log('loaded!');
    } else {
      // Warn the user that they need to get a web3 browser
      // Or install MetaMask, maybe with a nice graphic.
      alert('Please download MetaMask to use this dApp');
    }
    if (this.props.auth.isAuthenticated === true) {
        // fetch(`http://localhost:3001/users/${this.parseJwt(localStorage.id_token).user_id}/task_lists`)
        // .then(res => res.json())
        // .then(json => { 
        //   console.log(json);
        //   this.setState({
        //     taskLists: json.map(e => e)
        //   })
        // });   
        let url = `http://localhost:3001/users/${this.parseJwt(localStorage.id_token).user_id}/task_lists`
        this.props.fetchTaskLists(url)
    } 
  }

  homePage = () => {
    if (this.props.auth.isAuthenticated === true) {
      return <Route exact path="/" render={()=>< TaskLists style={{height: "65%"}} taskLists={this.props.taskLists.lists} />} />
    } else {
      return <Route exact path="/" component={About} />
    }
  }

  render() {
    // just defines the routes
    return (
      <Router history={history}>
          <div>
          <Navigation homePage={this.homePage} user={this.props.auth.isAuthenticated === true ? this.parseJwt(localStorage.id_token).user_id : 'guest'} />
          <br/>
          {this.homePage()}
          <Route exact path="/signup" component={SignUpForm} />
          <Route exact path="/signin" component={SignInForm} />
          <Route exact path="/newtask" render={()=>< TaskListForm taskLists={this.state.taskLists} />} />
          <Route exact path="/calendar" render={()=>< Calendar taskLists={this.props.taskLists.lists} />} />
          <br/>         
          <Footer />
          </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return ({
    auth: state.auth,
    taskLists: state.taskLists
  })
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchTaskLists: fetchTaskLists
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
