export default (state = {
    isFetching: false,
    isAuthenticated: !localStorage.id_token || localStorage.id_token === "undefined" ? false : true,
    id_token: ''
  }, action) => {

  switch (action.type) {

    case 'LOGIN_REQUEST':
      return Object.assign({}, state, {
      	isFetching: true,
      	isAuthenticated: false,
      	user: action.creds
      })   

    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
        id_token: action.id_token
      })

    case 'LOGIN_FAILURE':
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action
      })

    case 'LOGOUT_SUCCESS':
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })

    default:
      return state
  }
}