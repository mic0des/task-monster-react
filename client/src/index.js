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

ReactDOM.render(
  <Provider store={store}>
  	<div>
    	<App />
    </div>
  </Provider>,
  document.getElementById('root')
);
