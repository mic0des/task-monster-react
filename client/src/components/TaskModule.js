import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TaskForm from '../containers/TaskForm';
import Tasks from '../containers/Tasks';
import Monster from './Monster';
import ProgressBar from './ProgressBar';
import ToDoCard from './ToDoCard';
import Grid from '@material-ui/core/Grid';
import { taskPercentCheck } from '../actions/taskProgress';
import { addTask } from '../actions/tasks';
import { removeTask } from '../actions/tasks';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
var $              = require('jquery');


class TaskModule extends React.Component {
  state = {
    open: false,
    scroll: 'paper',
    initial: true
  };

  handleClickOpen = taskListId => () => {
    $.ajax({
      method: "GET",
      url: `http://localhost:3001/task_lists/${taskListId}`
    }).done(function(data){
      console.log(data)
      this.props.taskPercentCheck(data.last_saved)
      data.tasks.map(e => this.props.addTask(e))
      this.setState({ open: true, scroll: 'paper' });
    }.bind(this)) 
  };

  handleClose = function(tasks, taskListId, e) {
    e.preventDefault();
    this.setState({ open: false, initial: true });
    $.ajax({
      method: "PATCH",
      url: `http://localhost:3001/task_lists/${taskListId}`,
      data: {
        task: {
          last_saved: (tasks.filter(task => task.done === true).length) / tasks.length * 100
        }
      }
    }).done(function(data) {
      tasks.forEach(element => 
        this.props.removeTask(element.id)
      )
    }.bind(this))
  };

  toggleInitial = function() {
    this.setState({initial: false})
  }

  componentWillMount(){
    document.body.style.overflow = 'auto';
  }

  // tasks = function() {$.ajax({
  //     method: "GET",
  //     url: `http://localhost:3001/task_lists/`
  //     }).done(function(data){
  //     console.log(data)
  // })
  // }

  render() {
    const { tasks, taskPercentCheck, taskLists, taskListId, taskName, lastSaved } = this.props
    return (
      <div>              
        <ToDoCard handleClickOpen={this.handleClickOpen(taskListId)} taskName={taskName} taskListId={taskListId} taskProgress={lastSaved} />  
        <Dialog open={this.state.open} onClose={(e) => this.handleClose(tasks, taskListId, e)} scroll={this.state.scroll} aria-labelledby="scroll-dialog-title">
          <DialogTitle id="scroll-dialog-title">{taskName}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Monster />
              <ProgressBar lastSaved={tasks.taskProgress} />
              <TaskForm taskListId={taskListId} />
              <Tasks />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={(e) => this.handleClose(tasks, taskListId, e)} color="primary">Close</Button>
            <Button onClick={this.handleClose} color="primary">Pin</Button>
          </DialogActions>
        </Dialog>
      </div>      
    );
  }
}

const mapStateToProps = state => {
  return ({
    tasks: state.tasks
  })
}
 
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    taskPercentCheck: taskPercentCheck,
    addTask: addTask,
    removeTask: removeTask
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskModule);
