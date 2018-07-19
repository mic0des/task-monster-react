import React, { Component } from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { addTask } from '../actions/tasks';

export class TaskForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      task: ''
    }
  }

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleOnSubmit = event => {
    event.preventDefault();
    const task = Object.assign({}, this.state, { done: false, id: uuid() });
    this.props.addTask(task);
    this.setState({
      task: ''
    });
  }

  render() {
    
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className="panel panel-default">
              <div className="panel-body">             
                <form className="form-horizontal" onSubmit={this.handleOnSubmit}>
                  <div className="form-group">
                    <label htmlFor="content" className="col-md-4 control-label">Add Task</label>
                    <div className="col-md-5">
                      <input type="text" 
                        autocomplete="off"
                        className="form-control"
                        name="task"
                        value={this.state.task}
                        onChange={this.handleOnChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { addTask })(TaskForm);