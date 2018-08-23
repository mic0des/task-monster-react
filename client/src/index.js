import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store.js';

ReactDOM.render(
  <Provider store={store}>
  	<div>
    	<App />
    </div>
  </Provider>,
  document.getElementById('root')
);
