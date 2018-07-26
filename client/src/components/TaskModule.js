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

  handleClickOpen = scroll => () => {
    $.ajax({
      method: "GET",
      url: `http://localhost:3001/task_lists/${1}`
    }).done(function(data){
      console.log(data)
      this.props.taskPercentCheck(data.last_saved)
      data.tasks.map(e => this.props.addTask(e))
      this.setState({ open: true, scroll });
    }.bind(this)) 
  };

  handleClose = function(tasks, e) {
    this.setState({ open: false, initial: true });
    $.ajax({
      method: "PATCH",
      url: `http://localhost:3001/task_lists/${1}`,
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

  fetchPercent = function() {
    $.ajax({
      method: "GET",
      url: `http://localhost:3001/task_lists/${1}`
    }).done(function(data){
      console.log(data)
    })    
  }

  toggleInitial = function() {
    this.setState({initial: false})
  }

  componentWillMount(){
    document.body.style.overflow = 'auto';
  }

  render() {
    const { tasks, taskPercentCheck } = this.props
    return (
      <div>
        <Grid  container spacing={24} alignItems="center" direction="row" justify="flex-start">
          <Grid item xs={3}>
            <ToDoCard handleClickOpen={this.handleClickOpen('paper')} toggleInitial={this.toggleInitial} initial={this.state.initial} />  
          </Grid>
          <Grid item xs={3}>
            <ToDoCard handleClickOpen={this.handleClickOpen('paper')} toggleInitial={this.toggleInitial} initial={this.state.initial} />  
          </Grid>
          <Grid item xs={3}>
            <ToDoCard handleClickOpen={this.handleClickOpen('paper')} toggleInitial={this.toggleInitial} initial={this.state.initial} />  
          </Grid>
          <Grid item xs={3}>
            <ToDoCard handleClickOpen={this.handleClickOpen('paper')} toggleInitial={this.toggleInitial} initial={this.state.initial} />  
          </Grid>
          <Grid item xs={3}>
            <ToDoCard handleClickOpen={this.handleClickOpen('paper')} toggleInitial={this.toggleInitial} initial={this.state.initial} />  
          </Grid>
        </Grid>
        <Dialog open={this.state.open} onClose={(e) => this.handleClose(tasks, e)} scroll={this.state.scroll} aria-labelledby="scroll-dialog-title">
          <DialogTitle id="scroll-dialog-title">Finish React Client Side</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Monster />
              <ProgressBar lastSaved={tasks.taskProgress} />
              <TaskForm />
              <Tasks />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={(e) => this.handleClose(tasks, e)} color="primary">
              Close
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Pin
            </Button>
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
