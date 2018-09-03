import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const styles = {
  checked: {},
  size: {
    width: 40,
    height: 40,
  },
  sizeIcon: {
    fontSize: 20,
  },
};


class TaskCard extends React.Component {

  handleOnClick = function(id, event) {
    event.preventDefault();
    return fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'delete'
    }).then(response => {
    this.setState({
      task: ''
    });
    this.props.removeTask(id)      
    })
  }

  handleOnCheck = function(id, event) {
    this.props.checkTask(id);
    return fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'PATCH'
    });
  }

  enabled(task){
    if (this.props.finished === true) {
        return <FormControlLabel disabled control={<Checkbox checked={task.done} value={task.name} onChange={(e) => this.handleOnCheck(task.id, e)} />} label={task.name} />      
      } else {
        return <div><FormControlLabel control={<Checkbox checked={task.done} value={task.name} onChange={(e) => this.handleOnCheck(task.id, e)} />} label={task.name} />  
          <button type="button" onClick={(e) => this.handleOnClick(task.id, e)} className="btn btn-danger" >
              <span aria-hidden="true">&times;</span></button></div>       
      }
  }

  render() {
    const { task } = this.props;
    return (
      <div>
        {this.enabled(task)}
      </div>
    )
  }  
}

export default withStyles(styles)(TaskCard);