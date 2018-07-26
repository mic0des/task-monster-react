import { combineReducers } from 'redux';
import tasks from './tasks';
import auth from './auth';
import taskProgress from './taskProgress'

export default combineReducers({
  tasks, auth, taskProgress
});