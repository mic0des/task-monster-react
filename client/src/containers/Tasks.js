import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskCard from '../components/TaskCard';
import { removeTask } from '../actions/tasks';
import { checkTask } from '../actions/tasks';
import Grid from '@material-ui/core/Grid';

class Tasks extends Component {

  render() {
    const { tasks, removeTask, checkTask } = this.props;
    return (
      <div>
        

      <Grid container spacing={24}
            alignItems="center"
            direction="row"
            justify="center">
            <Grid item xs={3}>
                {tasks.map(task => <li key={task.id} style={{listStyleType: "none"}}>{<TaskCard key={task.id} checkTask={checkTask} removeTask={removeTask} task={task} />}</li>)}
              </Grid>
            </Grid>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    tasks: state.tasks
  })
}

export default connect(mapStateToProps, { removeTask, checkTask })(Tasks);