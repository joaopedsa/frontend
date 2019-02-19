const initialState = {
    tweets: [],
    newtweet: ''
  }
  export default (state = initialState, action) => {
    switch (action.type) {
      case 'GET_TWEETS':
        return {...state, tweets: action.payload}
      case 'HANDLE_TWEET':
        return {...state, newtweet: action.payload}
      case 'NEW_TWEET':
        const newTweets = [action.payload, ...state.tweets];
        return {...state, tweets: newTweets}
      case 'ADD_LIKE':
        return {...state, tweets: action.payload}
      default:
        return state
      }
  }