export default (state = {taskProgress: 50}, action) => {

  switch (action.type) {

    case 'TASK_PROGRESS':
      return Object.assign({}, state, {
      	taskProgress: action.taskListPercent
      })   

    default: 
      return state;
  }
}