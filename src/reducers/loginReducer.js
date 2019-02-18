const initialState = {
  username: '',
  password: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_USERNAME':
      state.username = action.payload
      return state
    case 'CHANGE_PASSWORD':
      state.password = action.payload
      return state
    default:
        return state
    }
}