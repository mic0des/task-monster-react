import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskCard from '../components/TaskCard';
import { removeTask } from '../actions/tasks';

class Tasks extends Component {

  render() {
    const { tasks, removeTask } = this.props;
    return (
      <div>
        <hr />
        <div className="row justify-content-center">
          <h2>Tasks</h2>
        </div>
        <hr />
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              {tasks.map(task => <TaskCard key={task.id} removeTask={removeTask} task={task} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    tasks: state.tasks
  })
}

export default connect(mapStateToProps, { removeTask })(Tasks);