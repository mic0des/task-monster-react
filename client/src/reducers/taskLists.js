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
      // console.log(state.lists.find(list => list.action.taskListId))
      const taskList = state.lists.find(taskList => taskList.id === action.taskListId);
      taskList.tasks = taskList.tasks.map(task => task.id === action.taskId ? {...task, done: task.done === true ? false : true} : task)
      console.log(taskList)
      debugger
      return Object.assign({}, {lists: state.lists.map(list => list.id === taskList.id ? taskList : list)}, {loading: false})
      // return state.map(taskList => taskList.id === action.taskListId ? taskList.tasks.map(task => task.id === action.taskId ? {...task, done: task.done === true ? false : true} : task))
      console.log(taskList)
      // taskList.tasks.map()

      // state.map(task => task.id === action.taskId ? {...task, done: task.done === true ? false : true} : task);

    default: 
      return state;
  }
}

// state.lists.find(taskList => taskList.id === action.taskListId)..tasks.map(task => task.id === action.taskId ? {...task, done: task.done === true ? false : true} : task)