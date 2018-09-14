export default (state = {lists: [], loading: false}, action) => {

  switch (action.type) {

    case 'LOADING_TASKLISTS':
      console.log(action);
      return Object.assign({}, state, {loading: true})

    case 'FETCH_TASKLISTS':
      console.log(action);
      return Object.assign(
      	{}, {lists: action.tasks}, {loading: false}
      )

    case 'LOGOUT_SUCCESS':
    	return Object.assign({}, {lists: []}, {loading: true})

    case 'CHECK_TASK':
      const taskList = state.lists.find(taskList => taskList.id === action.taskListId);
      taskList.tasks = taskList.tasks.map(task => task.id === action.taskId ? {...task, done: task.done === true ? false : true} : task)
      return Object.assign({}, {lists: state.lists.map(list => list.id === taskList.id ? taskList : list)}, {loading: false})

    default: 
      return state;
  }
}