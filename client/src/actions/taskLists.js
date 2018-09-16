export const fetchTaskLists = url => {
  return (dispatch) => {
    dispatch({type: 'LOADING_TASKLISTS'});
    return fetch(url)
            .then(res => res.json())
            .then(tasks => dispatch({type: 'FETCH_TASKLISTS', tasks}));
  };
}

export const checkTask = (taskListId, taskId) => {
  return {
    type: 'CHECK_TASK',
    taskListId: taskListId,
    taskId: taskId
  }
}

export const addTask = (taskListId, task) => {
  return {
    type: 'ADD_TASK',
    taskListId: taskListId,
    task: task
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

export const addTaskList = (data) => {
  return {
    type: 'ADD_TASKLIST',
    taskList: data
  }
}

export const deleteTaskList = (taskListId) => {
  return {
    type: 'DELETE_TASKLIST',
    taskListId: taskListId
  }
}