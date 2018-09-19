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
    this.setState({task: ''});
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