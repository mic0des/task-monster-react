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