export const requestLogin = creds => {
  return {
    type: 'LOGIN_REQUEST',
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

export const receiveLogin = user => {
  return {
    type: 'LOGIN_SUCCESS',
    isFetching: false,
    isAuthenticated: true,
    id_token: user.auth_token,
    gravatar: user.user.gravatar
  }
}

export const loginError = message => {
  return {
    type: 'LOGIN_FAILURE',
    isFetching: false,
    isAuthenticated: false,
    message
  }
}
