import { combineReducers } from 'redux';
import auth from './auth';
import page from './page'
import taskLists from './taskLists'
import {reducer as burgerMenu} from 'redux-burger-menu';

export default combineReducers({
  auth, page, taskLists, burgerMenu
});