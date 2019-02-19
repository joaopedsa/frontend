const initialState = {
  username: '',
  password: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'USERNAME_INPUT':
      return { ...state, username: action.payload }
    case 'PASSWORD_INPUT':
      return { ...state, password: action.payload }
    default:
      return state
    }
}