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
  constructor(props) {
    super(props);
 
    this.state = {
      open: false,
      scroll: 'paper',
      percent: this.props.lastSaved,
      monsterLevel: this.props.taskMonster.level
    };
  }


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

  levelUp = event => {
    event.preventDefault()
    console.log("Level up!")
    $.ajax({
      method: "PATCH",
      url: `http://localhost:3001/monsters/${this.props.taskMonster.id}`,
      data: {
        monster: {
          level: this.props.taskMonster.level + 1
        }
      }
    }).done(function(data){
      console.log(data);
      this.setState({ monsterLevel: data.level });
    }.bind(this)) 
  }

  handleSave = function(tasks, taskListId, taskProgress, e) {
    e.preventDefault();

    $.ajax({
      method: "PATCH",
      url: `http://localhost:3001/task_lists/${taskListId}`,
      data: {
        task: {
          last_saved: (tasks.filter(task => task.done === true).length) / tasks.length * 100
        }
      }
    }).done(function(data) {
      console.log(data)
      this.props.taskPercentCheck(data.last_saved)
      this.setState({...this.state, percent: taskProgress.taskProgress, monsterLevel: data.monster.level })
    }.bind(this))
  }

  handleClose = function(tasks, taskListId, taskProgress, e) {
    e.preventDefault();
    tasks.forEach(element => 
      this.props.removeTask(element.id)
    );
    this.setState({...this.state, percent: taskProgress.taskProgress, open: false});
  };

  componentWillMount(){
    document.body.style.overflow = 'auto';
  }

  // componentWillReceiveProps(nextProps) {
  //  this.setState({
  //    percent: nextProps.lastSaved
  //  })
  // }

  render() {
    const { tasks, taskPercentCheck, taskLists, taskListId, taskName, lastSaved, taskProgress, taskMonster, deadline } = this.props
    let daysLeft = Math.ceil((new Date(deadline).getTime() - (new Date().getTime())) / (1000 * 3600 *24))
    return (
      <div>              
        <ToDoCard handleClickOpen={this.handleClickOpen(taskListId)} monsterLevel={this.state.monsterLevel} taskMonster={taskMonster} taskName={taskName} taskListId={taskListId} taskProgress={this.state.percent} />  
        <Dialog open={this.state.open} onClose={(e) => this.handleClose(tasks, taskListId, taskProgress, e)} scroll={this.state.scroll} aria-labelledby="scroll-dialog-title">
          <DialogTitle id="scroll-dialog-title">{taskName}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {daysLeft < 10 ? <p style={{color: "#f14d4d"}}>{daysLeft} day(s) left</p> : <p>{daysLeft} day(s) left</p> }
              <Monster levelUp={this.levelUp} taskMonster={taskMonster} monsterLevel={this.state.monsterLevel} tasks={tasks} />
              
              <TaskForm taskListId={taskListId} />
              <Tasks />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onMouseOver={(e) => this.handleSave(tasks, taskListId, taskProgress, e)} onClick={(e) => this.handleClose(tasks, taskListId, taskProgress, e)} color="primary">Close</Button>
            <Button onClick={this.handleClose} color="primary">Pin</Button>
          </DialogActions>
        </Dialog>
      </div>      
    );
  }
}

const mapStateToProps = state => {
  return ({
    tasks: state.tasks,
    taskProgress: state.taskProgress
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
