import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTask } from '../actions/taskLists';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

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

  handleOnSubmit = (taskListId, task, event) => {
    event.preventDefault();
    this.props.addTask(taskListId, task);

    // return fetch("http://localhost:3001/tasks", {
    //   method: 'POST',
    //   body: JSON.stringify({
    //       name: this.state.task,
    //       task_list_id: taskListId,
    //       done: false
    //   }), 
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   credentials: 'same-origin'
    // }).then(response => response.json())
    //   .then(data => {
    //     const task = Object.assign({id: data.id, task_list_id: data.task_list_id, name: data.name, done: false});
    //     this.props.addTask(data.task_list_id, task);
    //     this.setState({
    //       task: ''
    //     });
    // });
  }

  render() { 
    return (
      <Grid container spacing={24} alignItems="center" direction="row" justify="center">  
        <Grid item xs={9.5}>          
          <form className="form-horizontal" onSubmit={(e) => this.handleOnSubmit(this.props.taskListId, this.state.task, e)}>
            <TextField
              id="with-placeholder"
              autoComplete="off"
              placeholder="Add a to-do item..."
              className="form-control"
              margin="normal"
              name="task"
              style={{width: "16em"}}
              onChange={this.handleOnChange}
              value={this.state.task}
            />
          </form>
        </Grid>
      </Grid>
    );
  }
}


export default connect(null, { addTask })(TaskForm);