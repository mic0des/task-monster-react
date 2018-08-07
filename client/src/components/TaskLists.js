import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import PropTypes from 'prop-types';
import TaskModule from './TaskModule';
var React          = require('react');
var _              = require('lodash');
// var Functions      = require('../../utils/Functions.js');
var $              = require('jquery');


class TaskLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskLists: props.taskLists
    }
  }

  render() {
    return (
        <Grid container spacing={24} alignItems="center" direction="row" justify="flex-start">
        {this.props.taskLists.map((taskList, index)=> <Grid key={index} item xs={3}> <TaskModule finished={taskList.finished} lastSaved={taskList.last_saved} taskName={taskList.name} taskMonster={taskList.monster} deadline={taskList.deadline} taskListId={taskList.id} /> </Grid>)}
        </Grid>
    )
}
}
 

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};
 
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({
//     loginError: loginError,
//     receiveLogin: receiveLogin
//   }, dispatch);
// };
 
export default connect(mapStateToProps)(TaskLists);

// export default TaskListForm;

// const mapStateToProps = (state) => {
//   return {
//     items: state.user
//   };
// };

// const mapDispatchToProps = () => {
//   return {
//     loginError: loginError,
//     receiveLogin: receiveLogin
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);