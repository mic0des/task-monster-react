import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TaskForm from './TaskForm';
import Tasks from './Tasks';
import Monster from './Monster';
import ToDoCard from './ToDoCard';
import { fetchTaskLists } from '../actions/taskLists';
import { bindActionCreators } from 'redux';
import { updateTaskLists } from '../actions/taskLists';
import { deleteTaskList } from '../actions/taskLists';
import { updateMonster } from '../actions/taskLists';
import { connect } from 'react-redux';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import { parseJwt } from '../utils/Functions';
import history from '../history';
import { compose } from 'redux';
import { withRouter } from 'react-router';

class TaskModule extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      open: false,
      scroll: 'paper',
      percent: this.props.lastSaved,
      monsterLevel: this.props.taskMonster.level,
      finished: this.props.finished
    };
  }

  handleClickOpen = taskListId => () => {
    this.setState({ open: true, scroll: 'paper' });
  };
  

  levelUp = (monsterId, tasks, taskListId, taskProgress, monsterLevel, event) => {
    event.preventDefault();
    this.setState({monsterLevel: monsterLevel, finished: true});
    this.props.updateMonster(monsterLevel, monsterId, taskListId);
  }

  handleSave = function(tasks, taskListId, taskProgress, finished, monsterLevel) {
    const updatedFinished = finished ? finished : this.state.finished;
    const percentage = (tasks.filter(task => task.done === true).length) / tasks.length * 100
    this.props.updateTaskLists(taskListId, percentage, updatedFinished);
    this.setState({...this.state, monsterLevel: monsterLevel });
  } 

  handleClose = function(tasks, taskListId, taskProgress, finished, monsterLevel, e) {
    e.preventDefault();
    this.handleSave(tasks, taskListId, taskProgress, finished, monsterLevel)
    this.setState({...this.state, open: false});
  };

  componentWillMount(){
    document.body.style.overflow = 'auto';
  }

  renderForm(taskListId){
    if (this.state.finished === true) {
      return <p></p>
    } else {
      return <TaskForm finished={this.props.finished} taskListId={taskListId} />
    }
  }

  renderDays(daysLeft){
    if (this.state.finished === true) {
      return <p style={{color: "#2cc07d", marginTop: "0", marginBottom: "4px"}}><span style={{fontWeight: "bold"}}>Finished on time</span> ...  monster is happy!</p>
    } else if (daysLeft <= 0) {
      return <p style={{color: "#f14d4d", margin: "0", marginBottom: "4px"}}><span style={{fontWeight: "bold"}}>Missed Deadline</span> ... Finish all tasks to revive KO'd monster!</p>      
    } else {
      return daysLeft < 10 ? <p style={{color: "#f14d4d", margin: "0", marginBottom: "4px"}}>{daysLeft} day(s) left</p> : <p style={{margin: "0", marginBottom: "4px"}}>{daysLeft} day(s) left</p>    
    }
  }

  renderName(taskName){
    if (!!this.props.taskProgress && this.props.taskProgress.finished === true) {
      return taskName.concat(" ✔") 
    } else {
      return taskName
    }
  }

  deleteTaskList = taskListId => { 
    this.props.deleteTaskList(taskListId);
    this.props.history.push('/');   
  }

  render() {
    const { tasks, taskListId, taskName, taskProgress, taskMonster, deadline, finished, taskKey } = this.props
    let daysLeft = Math.ceil((new Date(deadline).getTime() - (new Date().getTime())) / (1000 * 3600 *24))
    return (
      <div>              
        <ToDoCard handleClickOpen={this.handleClickOpen(taskListId)} monsterLevel={this.state.monsterLevel} taskMonster={taskMonster} taskName={taskName} taskListId={taskListId} finished={finished} taskProgress={taskProgress} />  
        <Dialog open={this.state.open} style={{height: "94%"}} onClose={(e) => this.handleClose(tasks, taskListId, taskProgress, this.state.finished, this.state.monsterLevel, e)} scroll={this.state.scroll} aria-labelledby="scroll-dialog-title">
          <DialogTitle style={{padding: "20px 24px 20px"}} id="scroll-dialog-title">{this.renderName(taskName)}</DialogTitle>
          <DialogContent>
            <DialogContentText style={{marginTop: "-2px"}}>
              {this.renderDays(daysLeft)}
              <Monster daysLeft={daysLeft} finished={this.state.finished} levelUp={(e) => this.levelUp(taskMonster.id, tasks, taskListId, taskProgress, taskMonster.level + 1, e)} taskMonster={taskMonster} monsterLevel={this.state.monsterLevel} tasks={tasks} />
              {this.renderForm(taskListId)}              
              <Tasks handleSave={(e) => this.handleSave(tasks, taskListId, taskProgress, this.state.finished, this.state.monsterLevel)} taskKey={taskKey} finished={this.state.finished} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ show: true })} color="primary">Delete</Button>
            <SweetAlert
              show={this.state.show}
              title="Trash this task?"
              text="You can't undo this!"
              showCancelButton
              onConfirm={() => {
                console.log('confirm'); 
                this.deleteTaskList(taskListId);
                this.setState({show: false})
              }}
              onCancel={() => {
                console.log('cancel'); 
                this.setState({ show: false });
              }}
              onClose={() => console.log('close')}
            />
            <Button onClick={(e) => this.handleClose(tasks, taskListId, taskProgress, this.state.finished, this.state.monsterLevel, e)} color="primary">Save & Close</Button>
          </DialogActions>
        </Dialog>
      </div>      
    );
  }
}

const mapStateToProps = (state, ownProps)  => {
  return ({
    tasks: state.taskLists.lists[ownProps.taskKey].tasks,
    taskProgress: state.taskLists.lists[ownProps.taskKey].last_saved,
    taskLists: state.taskLists
  })
}
 
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    deleteTaskList: deleteTaskList,
    updateMonster: updateMonster,
    fetchTaskLists: fetchTaskLists,
    updateTaskLists: updateTaskLists
  }, dispatch);
};

const enhance = compose(withRouter, connect(mapStateToProps, mapDispatchToProps))

export default enhance(TaskModule);
