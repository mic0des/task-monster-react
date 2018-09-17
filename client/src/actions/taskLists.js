export const fetchTaskLists = url => {
  return (dispatch) => {
    dispatch({type: 'LOADING_TASKLISTS'});
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
    dispatch({type: 'REMOVE_TASK'});
    return fetch(`http://localhost:3001/tasks/${taskId}`, {
      method: 'delete'
    }).then(response => {
      dispatch({type: 'REMOVE_TASK_SUCCESS', taskListId, taskId})
    })
  }
}

export const updateTaskLists = (taskListId, data) => {
	return {
		type: 'UPDATE_TASKLISTS',
		taskListId: taskListId,
		updatedTaskList: data
	}
}

export const updateMonster = (taskListId, level) => {
  return {
    type: 'UPDATE_MONSTER',
    taskListId: taskListId,
    monsterLevel: level
  }
}

// export const addTaskList = (data) => {
//   return {
//     type: 'ADD_TASKLIST',
//     taskList: data
//   }
// }

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
  return {
    type: 'DELETE_TASKLIST',
    taskListId: taskListId
  }
}