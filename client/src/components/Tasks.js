import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskCard from './TaskCard';
import { removeTask } from '../actions/tasks';
import { checkTask } from '../actions/tasks';
import Grid from '@material-ui/core/Grid';
import Footer from './Footer';

class Tasks extends Component {

  render() {
    const { tasks, removeTask, checkTask } = this.props;
    return (
      <div>        
        <Grid container spacing={24} alignItems="center" direction="row" justify="center">
          <Grid item xs={9.5}>
            {tasks.map(task => <li key={task.id} style={{listStyleType: "none"}}>{<TaskCard finished={this.props.finished} key={task.id} checkTask={checkTask} removeTask={removeTask} task={task} />}</li>)}
          </Grid>
        </Grid>
        <Footer />
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