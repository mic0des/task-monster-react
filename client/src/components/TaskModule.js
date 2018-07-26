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
import { connect } from 'react-redux';
var $              = require('jquery');


class TaskModule extends React.Component {
  state = {
    open: false,
    scroll: 'paper',
  };

  handleClickOpen = scroll => () => {
    this.setState({ open: true, scroll });
  };

  handleClose = function(tasks, e) {
    this.setState({ open: false });
    $.ajax({
      method: "PATCH",
      url: `http://localhost:3001/task_lists/${1}`,
      data: {
        task: {
          last_saved: (tasks.filter(task => task.done === true).length) / tasks.length * 100
        }
      }
    })
  };

  componentWillMount(){
    document.body.style.overflow = 'auto';
  }

  render() {
    const { tasks } = this.props
    return (
      <div>
        <Grid  container spacing={24} alignItems="center" direction="row" justify="flex-start">
          <Grid item xs={3}>
            <ToDoCard handleClickOpen={this.handleClickOpen('paper')} />  
          </Grid>
          <Grid item xs={3}>
            <ToDoCard handleClickOpen={this.handleClickOpen('paper')} />  
          </Grid>
          <Grid item xs={3}>
            <ToDoCard handleClickOpen={this.handleClickOpen('paper')} />  
          </Grid>
          <Grid item xs={3}>
            <ToDoCard handleClickOpen={this.handleClickOpen('paper')} />  
          </Grid>
          <Grid item xs={3}>
            <ToDoCard handleClickOpen={this.handleClickOpen('paper')} />  
          </Grid>
        </Grid>
        <Dialog open={this.state.open} onClose={(e) => this.handleClose(tasks, e)} scroll={this.state.scroll} aria-labelledby="scroll-dialog-title">
          <DialogTitle id="scroll-dialog-title">Finish React Client Side</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Monster />
              <ProgressBar />
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

export default connect(mapStateToProps)(TaskModule);
