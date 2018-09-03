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

    case 'LOGOUT':
    	return Object.assign({}, {lists: []}, {loading: true})

    default: 
      return state;
  }
}