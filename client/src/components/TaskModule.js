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

class TaskModule extends React.Component {
  state = {
    open: false,
    scroll: 'paper',
  };

  handleClickOpen = scroll => () => {
    this.setState({ open: true, scroll });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentWillMount(){
    document.body.style.overflow = 'auto';
  }

  render() {
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
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
        >
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
            <Button onClick={this.handleClose} color="primary">
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

export default TaskModule;
