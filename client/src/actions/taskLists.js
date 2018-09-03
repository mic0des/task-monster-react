export const fetchTaskLists = url => {
  return (dispatch) => {
    dispatch({type: 'LOADING_TASKLISTS'});
    debugger
    return fetch(url)
            .then(res => res.json())
            .then(tasks => dispatch({type: 'FETCH_TASKLISTS', tasks}));
  };
}