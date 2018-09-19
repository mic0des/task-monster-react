export const fetchTaskLists = url => {
  return (dispatch) => {
    dispatch({type: 'FETCHING_TASKLISTS'});
    return fetch(url)
            .then(res => res.json())
            .then(tasks => dispatch({type: 'FETCH_TASKLISTS', tasks}));
  };
}

export const checkTask = (taskListId, taskId) => {
  return (dispatch) => {
    dispatch({type: 'CHECKING_TASK'});
    return fetch(`http://localhost:3001/tasks/${taskId}`, {
      method: 'PATCH'
    }).then(response => {
      dispatch({type: 'CHECK_TASK', taskListId, taskId})
    })
  }
}

export const addTask = (taskListId, task) => {
  return (dispatch) => {
    dispatch({type: 'ADDING_TASK'});
    return fetch("http://localhost:3001/tasks", {
      method: 'POST',
      body: JSON.stringify({
          name: task,
          task_list_id: taskListId,
          done: false
      }), 
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then(res => res.json())
      .then(data => {
        const task = Object.assign({id: data.id, task_list_id: data.task_list_id, name: data.name, done: false});
        dispatch({type: 'ADD_TASK', taskListId, task});
      })
  }
}

export const removeTask = (taskListId, taskId) => {
  return (dispatch) => {
    dispatch({type: 'REMOVING_TASK'});
    return fetch(`http://localhost:3001/tasks/${taskId}`, {
      method: 'delete'
    }).then(response => {
      dispatch({type: 'REMOVE_TASK', taskListId, taskId})
    })
  }
}

export const updateTaskLists = (taskListId, percentage, updatedFinished) => {
	return (dispatch) => {
    dispatch({type: 'UPDATING_TASKLISTS'});
    return fetch(`http://localhost:3001/task_lists/${taskListId}`, {
      method: 'PATCH',
      body: JSON.stringify({
          last_saved: percentage,
          finished: updatedFinished
      }),  
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then(response => response.json())
      .then(data => {
        dispatch({type: 'UPDATE_TASKLISTS', taskListId, updatedTaskList: data})
    });    
	}
}

export const updateMonster = (monsterLevel, monsterId, taskListId) => {
  return (dispatch) => {
    dispatch({type: 'UPDATING_MONSTER'});
    return fetch(`http://localhost:3001/monsters/${monsterId}`, { 
      method: 'PATCH',
      body: JSON.stringify({
          level: monsterLevel
      }), 
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then(res => res.json())
      .then(data => {
        dispatch({type: 'UPDATE_MONSTER', taskListId})
      }); 
  }
} 

export const addTaskList = (name, userId, monster, deadline) => {
  return (dispatch) => {
    dispatch({type: 'ADDING_TASKLIST'});
    return fetch("http://localhost:3001/task_lists", {
      method: 'POST',
      body: JSON.stringify({
          name: name,
          user_id: userId,
          last_saved: 0,
          monster: monster,
          deadline: deadline
      }), 
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then(res => res.json())
      .then(data => {
        dispatch({type: 'ADD_TASKLIST', taskList: data})
      })
  }
}

export const deleteTaskList = (taskListId) => {
  return (dispatch) => {
    dispatch({type: 'DELETING_TASKLIST'});
    return fetch(`http://localhost:3001/task_lists/${taskListId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then(response => {
      dispatch({type: 'DELETE_TASKLIST', taskListId: taskListId})
    })
  }
}