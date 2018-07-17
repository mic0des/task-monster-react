import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskCard from '../components/TaskCard';
import { removeTask } from '../actions/tasks';

class Tasks extends Component {

  render() {
    const { tasks, removeTask } = this.props;
    return (
      <div>
        
        <div className="row justify-content-center">
          <h2>Tasks</h2>
        </div>
        
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <ul>
                {tasks.map(task => <li style={{listStyleType: "none"}}>{<TaskCard key={task.id} removeTask={removeTask} task={task} />}</li>)}
              </ul>
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