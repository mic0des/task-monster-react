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
        <Button style={{color: '#3f51b5'}} onClick={this.handleClickOpen('paper')}>New Task +</Button>
        <Button onClick={this.handleClickOpen('paper')}>Finish React client side</Button>
        <Button onClick={this.handleClickOpen('paper')}>Hook client side to Rails</Button>
        <Button onClick={this.handleClickOpen('paper')}>Win Hackathon</Button>
        <Button onClick={this.handleClickOpen('paper')}>Crush Algorithms & Data Structures</Button>
        <Button onClick={this.handleClickOpen('paper')}>Find a job</Button>     
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">Finish React App</DialogTitle>
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
