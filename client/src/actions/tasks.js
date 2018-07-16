export const addTask = task => {
  return {
    type: 'ADD_TASK',
    quote: Object.assign({}, task)
  }
}

export const removeTask = taskId => {
  return {
    type: 'REMOVE_TASK',
    taskId
  }
}