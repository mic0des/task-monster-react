export default (state = [], action) => {

  switch (action.type) {

    case 'ADD_TASK':
      return state.concat(action.task);

    case 'REMOVE_TASK':
      return state.filter(task => task.id !== action.taskId);

    case 'CHECK_TASK':
      return state.map(task => task.id === action.taskId ? {...task, done: task.done === true ? false : true} : task);

    default: 
      return state;
  }
}