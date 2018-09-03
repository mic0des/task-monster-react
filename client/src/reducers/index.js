import { combineReducers } from 'redux';
import tasks from './tasks';
import auth from './auth';
import taskProgress from './taskProgress';
import page from './page'
import taskLists from './taskLists'

export default combineReducers({
  tasks, auth, taskProgress, page, taskLists
});