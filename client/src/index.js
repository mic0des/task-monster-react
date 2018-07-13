import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import SignInForm from './components/auth/SignInForm'

ReactDOM.render(<SignInForm />, document.getElementById('root'));
registerServiceWorker();
