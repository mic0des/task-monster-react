export default (state = {taskProgress: 50}, action) => {

  switch (action.type) {

    case 'TASK_PROGRESS':
      return Object.assign({}, state, {
      	taskProgress: action.taskListPercent.percent,
      	finished: action.taskListPercent.finished
      })   

    default: 
      return state;
  }
}