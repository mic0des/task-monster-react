import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import SignInForm from './components/auth/SignInForm'
import SignOutLink from './components/auth/SignOutLink'

ReactDOM.render(<SignInForm />, document.getElementById('root'));
registerServiceWorker();
