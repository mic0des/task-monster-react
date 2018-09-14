import React, { Component } from 'react';
import './App.css';
import 'sweetalert/dist/sweetalert.css';
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
import { parseJwt } from './utils/Functions';
import { Router, Route } from 'react-router-dom';
import history from './history';
import { fetchTaskLists } from './actions/taskLists';

class App extends Component {

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
        let url = `http://localhost:3001/users/${parseJwt(localStorage.id_token).user_id}/task_lists`
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
          <Navigation homePage={this.homePage} user={this.props.auth.isAuthenticated === true ? parseJwt(localStorage.id_token).user_id : 'guest'} />
          <br/>
          {this.homePage()}
          <Route exact path="/signup" component={SignUpForm} />
          <Route exact path="/signin" component={SignInForm} />
          <Route exact path="/newtask" component={TaskListForm} />
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
