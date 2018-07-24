import { combineReducers } from 'redux';
import tasks from './tasks';
import auth from './auth';

export default combineReducers({
  tasks, auth
});