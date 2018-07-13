import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import SignInForm from './components/auth/SignInForm'
import SignOutLink from './components/auth/SignOutLink'
import SignUpForm from './components/auth/SignUpForm'

ReactDOM.render(<SignUpForm />, document.getElementById('root'));
registerServiceWorker();
