import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const TaskCard = (props) => {

  const handleOnClick = (id, event) => {
    event.preventDefault();
    return fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'delete'
    }).then(response => {
      props.removeTask(id)      
    })
  }

  const handleOnCheck = (id, event) => {
    props.checkTask(id);
    return fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'PATCH'
    });
  }

  const enabled = task => {
    if (props.finished === true) {
        return <FormControlLabel disabled control={<Checkbox checked={task.done} value={task.name} onChange={(e) => handleOnCheck(task.id, e)} />} label={task.name} />      
      } else {
        return <div><FormControlLabel control={<Checkbox checked={task.done} value={task.name} onChange={(e) => handleOnCheck(task.id, e)} />} label={task.name} />  
          <button type="button" onClick={(e) => handleOnClick(task.id, e)} className="btn btn-danger" >
              <span aria-hidden="true">&times;</span></button></div>       
      }
  }

  return (
    <div>
      {enabled(props.task)}
    </div>
  )
 
}

export default TaskCard;