export default (state = {lists: [], loading: false}, action) => {

  const taskList = state.lists.find(taskList => taskList.id === action.taskListId);
  const task = action.task 

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
      taskList.tasks = taskList.tasks.map(task => task.id === action.taskId ? {...task, done: task.done === true ? false : true} : task)
      return Object.assign({}, {lists: state.lists.map(list => list.id === taskList.id ? taskList : list)}, {loading: false})

    case 'ADD_TASK':
      taskList.tasks = taskList.tasks.concat(action.task)
      return Object.assign({}, {lists: state.lists.map(list => list.id === taskList.id ? taskList : list)}, {loading: false}) 

    case 'REMOVE_TASK':
      taskList.tasks = taskList.tasks.filter(task => task.id !== action.taskId);
      return Object.assign({}, {lists: state.lists.map(list => list.id === taskList.id ? taskList : list)}, {loading: false}) 

    case 'UPDATE_TASKLISTS':
      return Object.assign({}, {lists: state.lists.map(list => list.id === action.taskListId ? action.updatedTaskList : list)}, {loading: false})

    case 'UPDATE_MONSTER':
      taskList.monster.level = action.monsterLevel;
      taskList.finished = true;
      return Object.assign({}, {lists: state.lists.map(list => list.id === action.taskListId ? taskList : list)}, {loading: false})

    default: 
      return state;
  }
}