import React from 'react';
import { connect } from 'react-redux';
import TaskCard from './TaskCard';
import { removeTask } from '../actions/tasks';
import { checkTask } from '../actions/taskLists';
import Grid from '@material-ui/core/Grid';
import Footer from './Footer';

const Tasks = (props) => {
  
  const { tasks, removeTask, checkTask, finished } = props;

  return (
    <div>        
      <Grid container spacing={24} alignItems="center" direction="row" justify="center">
        <Grid item xs={9.5}>
            {tasks.map(task => <li key={task.id} style={{listStyleType: "none"}}>{<TaskCard finished={finished} key={task.id} checkTask={checkTask} removeTask={removeTask} task={task} />}</li>)}
        </Grid>
      </Grid>
      <Footer />
    </div>
  );

}

const mapStateToProps = (state, ownProps) => {
  return ({
    // tasks: state.tasks
    tasks: state.taskLists.lists[ownProps.taskKey].tasks
  })
}

export default connect(mapStateToProps, { removeTask, checkTask })(Tasks);