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
import { addTask } from '../actions/tasks';
import { removeTask } from '../actions/tasks';
import { bindActionCreators } from 'redux';
import { updateTaskLists } from '../actions/taskLists';
import { updateMonster } from '../actions/taskLists';
import { connect } from 'react-redux';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import { parseJwt } from '../utils/Functions';


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
    return fetch(`http://localhost:3001/task_lists/${taskListId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        // this.props.taskPercentCheck({percent: data.last_saved, finished: data.finished});
        this.setState({ open: true, scroll: 'paper' });
    });
  };

  levelUp = (tasks, taskListId, taskProgress, event) => {
    event.preventDefault()
    console.log("Level up!") 
    return fetch(`http://localhost:3001/monsters/${this.props.taskMonster.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
          level: this.props.taskMonster.level + 1
      }), 
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({monsterLevel: data.level, finished: true});
        this.props.updateMonster(taskListId, data.level)
        this.handleSave(tasks, taskListId, taskProgress, true)
    });   
  }

  handleSave = function(tasks, taskListId, taskProgress, finished) {
    const updatedFinished = finished ? finished : this.state.finished
    const percentage = (tasks.filter(task => task.done === true).length) / tasks.length * 100
    return fetch(`http://localhost:3001/task_lists/${taskListId}`, {
      method: 'PATCH',
      body: JSON.stringify({
          last_saved: percentage,
          finished: updatedFinished
      }), 
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        this.props.updateTaskLists(taskListId, data)
        this.setState({...this.state, monsterLevel: data.monster.level });
    });  
  }

  handleClose = function(tasks, taskListId, taskProgress, e) {
    e.preventDefault();
    this.handleSave(tasks, taskListId, taskProgress)
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

  deleteTaskList(taskListId){ 
    return fetch(`http://localhost:3001/task_lists/${taskListId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then(response => window.location.assign("/"))     
  }

  render() {
    const { tasks, taskListId, taskName, taskProgress, taskMonster, deadline, finished, taskKey } = this.props
    let daysLeft = Math.ceil((new Date(deadline).getTime() - (new Date().getTime())) / (1000 * 3600 *24))
    return (
      <div>              
        <ToDoCard handleClickOpen={this.handleClickOpen(taskListId)} monsterLevel={this.state.monsterLevel} taskMonster={taskMonster} taskName={taskName} taskListId={taskListId} finished={finished} taskProgress={taskProgress} />  
        <Dialog open={this.state.open} style={{height: "94%"}} onClose={(e) => this.handleClose(tasks, taskListId, taskProgress, e)} scroll={this.state.scroll} aria-labelledby="scroll-dialog-title">
          <DialogTitle style={{padding: "20px 24px 20px"}} id="scroll-dialog-title">{this.renderName(taskName)}</DialogTitle>
          <DialogContent>
            <DialogContentText style={{marginTop: "-2px"}}>
              {this.renderDays(daysLeft)}
              <Monster daysLeft={daysLeft} finished={this.state.finished} levelUp={(e) => this.levelUp(tasks, taskListId, taskProgress, e)} taskMonster={taskMonster} monsterLevel={this.state.monsterLevel} tasks={tasks} />
              {this.renderForm(taskListId)}              
              <Tasks handleSave={(e) => this.handleSave(tasks, taskListId, taskProgress)} taskKey={taskKey} finished={this.state.finished} />
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
              }}
              onCancel={() => {
                console.log('cancel'); 
                this.setState({ show: false });
              }}
              onClose={() => console.log('close')}
            />
            <Button onClick={(e) => this.handleClose(tasks, taskListId, taskProgress, e)} color="primary">Save & Close</Button>
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
    updateMonster: updateMonster,
    addTask: addTask,
    fetchTaskLists: fetchTaskLists,
    updateTaskLists: updateTaskLists,
    removeTask: removeTask
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskModule);
