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
var React          = require('react');
var _              = require('lodash');
// var Functions      = require('../../utils/Functions.js');
var $              = require('jquery');


class TaskListForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      user_id: this.props.auth.isAuthenticated === true ? this.parseJwt(localStorage.id_token).user_id : "",
      last_saved: 0,
      monster: "",
      deadline: "",
      monsters: props.taskLists.map(taskList => ({name: taskList.monster.nickname, level: taskList.monster.level, id: taskList.monster.id})).filter(function(monster, index, arr) { return arr[index-1] ? monster.name !== arr[index-1].name : monster })
    }
  }

  componentWillReceiveProps(nextprops) {
    this.setState({
     monsters: nextprops.taskLists.map(taskList => ({name: taskList.monster.nickname, level: taskList.monster.level, id: taskList.monster.id})).filter(function(monster, index, arr) { return arr[index-1] ? monster.name !== arr[index-1].name : monster })
      }) 
    }

  handleChange = event => {
      event.preventDefault();
      const { name, value } = event.target;
      this.setState({
        [name]: value,
      })
  }

  parseJwt = token => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64))
  }

  handleSubmit = event => {
    event.preventDefault();
    const { name, deadline, monster, user_id } = this.state;

    if (!name || !deadline || !monster || !user_id) {
      return;
    }

    $.ajax({
      method: "POST",
      url: "http://localhost:3001/task_lists",
      data: {
        taskList: {
          name: this.state.name,
          user_id: this.state.user_id,
          last_saved: 0,
          monster: this.state.monster,
          deadline: this.state.deadline
        }
      }
    });
  }
    // .done(function(data){
    //   window.location.reload();
    // }.bind(this));

  render() {
    return (
      <div>
      <Grid container spacing={24} alignItems="center" direction="row" justify="center">
      <form className="newTaskList">
      <div>
        <img src="/documents-flat.png" alt="new task" height="168" width="168"/>
      </div>
        <div>
          <TextField  autoComplete="off" id="name" className="name" name="name" placeholder="Name your new list" value={this.state.name} onChange={this.handleChange} margin="normal" />
        </div>

        <br/>
        <div>
          <TextField id="deadline" onChange={this.handleChange} name="deadline" label="Set Deadline" type="date" defaultValue="YYYY-MM-DD" InputLabelProps={{shrink: true}} />
        </div>
        <br/>

        <div>
          <FormControl>
            <Select value={this.state.monster} onChange={this.handleChange} displayEmpty name="monster" >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {this.state.monsters.map(monster => <MenuItem value={monster.id}>{monster.name} Level {monster.level}</MenuItem>)}
            </Select>
            <FormHelperText>Select Existing Monster</FormHelperText>
          </FormControl>
        </div>

        <p>or</p>

        <div>
          <Button variant="contained" onClick={this.getMonster} color="default" className="nav">Get New Monster</Button>
        </div>

        <br/>
        <div>
          <Button variant="contained" onClick={this.handleSubmit} color="primary" className="nav">Create New List</Button>
        </div>       
      </form>
      </Grid>
      <br/>
      <br/>
      </div>
    );
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
 
export default connect(mapStateToProps)(TaskListForm);

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