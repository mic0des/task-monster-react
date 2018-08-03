// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
// import SignInForm from './components/auth/SignInForm'
// import SignOutLink from './components/auth/SignOutLink'
// import SignUpForm from './components/auth/SignUpForm'
// import Monster from './components/Monster'

// ReactDOM.render(<Monster />, document.getElementById('root'));
// registerServiceWorker();

// =====

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignInForm from './components/auth/SignInForm';
import SignUpForm from './components/auth/SignUpForm';
import Navigation from './components/Navigation';
import TaskListForm from './components/TaskListForm';

// ReactDOM.render(
// 	<Provider store={store}>
//   		<Router>
//   			<div>
//   		    	<Navigation />
//   		    	<br/>
//   		    	<br/>
//     			<Route exact path="/" component={SignInForm} />
//     			<Route exact path="/signup" component={SignUpForm} />
//     			<Route exact path="/newtask" render={()=>< TaskListForm taskLists={this.state.taskLists} />} />
//     		</div>
//   		</Router>
//   	</Provider>,
//   	document.getElementById('root')
// );

ReactDOM.render(
  <Provider store={store}>
  	<div>
  		<Navigation />
  		<br/>
        <br/>
    	<App />
    </div>
  </Provider>,
  document.getElementById('root')
);
