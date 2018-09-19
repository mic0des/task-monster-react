import { combineReducers } from 'redux';
import auth from './auth';
import page from './page'
import taskLists from './taskLists'

export default combineReducers({
  auth, page, taskLists
});