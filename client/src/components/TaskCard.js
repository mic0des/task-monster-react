import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const TaskCard = (props) => {

  const handleOnClick = (taskListId, taskId, event) => {
    event.preventDefault();
    return fetch(`http://localhost:3001/tasks/${taskId}`, {
      method: 'delete'
    }).then(response => {
      props.removeTask(taskListId, taskId)     
    })
  }

  const handleOnCheck = (taskListId, taskId, event) => {
    props.checkTask(taskListId, taskId);
    return fetch(`http://localhost:3001/tasks/${taskId}`, {
      method: 'PATCH'
    })
    // .then(response => {
    //   props.handleSave();
    // })

  }

  const enabled = task => {
    if (props.finished === true) {
        return <FormControlLabel disabled control={<Checkbox checked={task.done} value={task.name} onChange={(e) => handleOnCheck(task.task_list_id, task.id, e)} />} label={task.name} />      
      } else {
        return <div><FormControlLabel control={<Checkbox checked={task.done} value={task.name} onChange={(e) => handleOnCheck(task.task_list_id, task.id, e)} />} label={task.name} />  
          <button type="button" onClick={(e) => handleOnClick(task.task_list_id, task.id, e)} className="btn btn-danger" >
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