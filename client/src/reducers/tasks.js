export default (state = [], action) => {

  switch (action.type) {

    case 'ADD_TASK':
      return state.concat(action.task);

    case 'REMOVE_TASK':
      return state.filter(task => task.id !== action.taskId);

    case 'CHECK_TASK':
      // let task = state.find(task => task.id === action.taskId);
      // task.done = task.done === true ? false : true;
      return state.map(task => task.id === action.taskId ? {...task, done: task.done === true ? false : true} : task);

    // case 'TASK_PROGRESS':
    //   return state.concat({
    //     taskProgress: action.taskListPercent
    //   })

    default: 
      return state;
  }
}