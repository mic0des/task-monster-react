// import React, { Component } from 'react';
// import logo from './logo.svg';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import './App.css';

// // react/components/App.js
// var Router       = require('react-router');
// var RouteHandler = Router.RouteHandler;
// var $            = require('jquery');
 
// class App extends Component {

//   constructor(props) {
//     super(props);

//     this.state = {
//       signedIn: null
//     }
//   }

//   componentWillMount() {
//       $.ajax({
//         method: "GET",
//         url: "/auth/is_signed_in.json"
//       })
//       .done(function(data){
//         this.setState({ signedIn: data.signed_in });
//       }.bind(this));
//   }

//   getInitialState() {
//     return { signedIn: null };
//   }

//   render() {
//     return (
//       <RouteHandler signedIn={this.state.signedIn} />
//     )
//   }
// }

// export default App;

// ================

// class App extends Component {
//   render() {
//     return (
//       <React.Fragment>
//         <CssBaseline />
//         <div className="App">
//           <header className="App-header">
//             <img src={logo} className="App-logo" alt="logo" />
//             <h1 className="App-title">TaskMonster</h1>
//           </header>
//           <p className="App-intro">
//             To get started, edit <code>src/App.js</code> and save to reload.
//           </p>
//         </div>
//       </React.Fragment>
//     );
//   }
// }

// export default App;

import React, { Component } from 'react';
import TaskForm from './containers/TaskForm';
import Tasks from './containers/Tasks';
import Monster from './components/Monster';
import ProgressBar from './components/ProgressBar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TaskModule from './components/TaskModule';
import Navigation from './components/Navigation';
import TaskLists from './components/TaskLists';
import About from './components/About';
import './App.css';
import SignUpForm from './components/auth/SignUpForm';
import SignInForm from './components/auth/SignInForm';
import TaskListForm from './components/TaskListForm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Calendar from './components/Calendar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
var $            = require('jquery');

class App extends Component {
  state = {
    taskLists: []
  };

  parseJwt = token => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64))
  }

  componentWillMount(){
    if (this.props.auth.isAuthenticated === true) {
        $.ajax({
        method: "GET",
        url: `http://localhost:3001/users/${this.parseJwt(localStorage.id_token).user_id}/task_lists`
        }).done(function(data){
          console.log(data)
          this.setState({
            taskLists: data.map(e => e)
          })
        }.bind(this))      
    }      
  }

  homePage() {
    if (this.props.auth.isAuthenticated === true) {
      return <Route exact path="/" render={()=>< TaskLists style={{height: "65%"}} taskLists={this.state.taskLists} />} />
    } else {
      return <Route exact path="/" component={About} />
    }
  }


  // render() {
  //   // just defines the routes
  //   return (
  //     <div className="container-fluid">
  //       <Navigation />
  //       <br/>
  //       <br/>
  //       <Grid container spacing={24} alignItems="center" direction="row" justify="flex-start">
  //       {this.state.taskLists.map((taskList, index)=> <Grid key={index} item xs={3}> <TaskModule lastSaved={taskList.last_saved} taskName={taskList.name} taskMonster={taskList.monster} deadline={taskList.deadline} taskListId={taskList.id} /> </Grid>)}
  //       </Grid>
  //       <SignUpForm/>
  //       <SignInForm />
  //       <TaskListForm taskLists={this.state.taskLists} />
  //       <Calendar taskLists={this.state.taskLists} />
  //     </div>
  //   );
  // }

  render() {
    // just defines the routes
    return (
      // <Router>
      // <div>
      // <Navigation user={this.parseJwt(localStorage.id_token).user_id}/>
      // <About />
      // </div>
      // </Router>
      <Router>
          <div>
          <Navigation user={this.props.auth.isAuthenticated === true ? this.parseJwt(localStorage.id_token).user_id : 'guest'} />
          <br/>
          <br/>
          {this.homePage()}
          <Route exact path="/signup" component={SignUpForm} />
          <Route exact path="/signin" component={SignInForm} />
          <Route exact path="/newtask" render={()=>< TaskListForm taskLists={this.state.taskLists} />} />
          <Route exact path="/calendar" render={()=>< Calendar taskLists={this.state.taskLists} />} />
          <br/>         
          <Footer />
          </div>
      </Router>
    );
  }
}

//      <Router>
//        <div>
//            <Navigation />
//            <br/>
//            <br/>
//          <Route exact path="/" component={SignInForm} />
//          <Route exact path="/signup" component={SignUpForm} />
//          <Route exact path="/newtask" render={()=>< TaskListForm taskLists={this.state.taskLists} />} />
//        </div>
//      </Router>

const mapStateToProps = state => {
  return ({
    auth: state.auth
  })
}

export default connect(mapStateToProps)(App);
