import { deleteToken } from '../services/auth'
import api from '../services/api';

// action creator
export const handleTweet = (tweet) => {
    return {
        type: 'HANDLE_TWEET',
        payload: tweet
    };
};

export const getTweets = () => async dispatch => {
    try {
        const response = await api.get('/tweets');
        dispatch({
            type: 'GET_TWEETS',
            payload: response.data
        })
    } catch(err) {
        return {
            type: 'ERROR_GET_TWEETS'
        }
    }
};

export const newTweet = (tweet) => dispatch => {
    dispatch({
        type: 'NEW_TWEET',
        payload: tweet
    })
}

export const addLike = (newTweet,tweets) => dispatch => {
    const newTweets = tweets.map(tweet => tweet._id === newTweet._id ? newTweet : tweet )
    dispatch({
        type: 'ADD_LIKE',
        payload: newTweets
    })
}



export const handlePostTweets = (e,props) => async dispatch => {
    e.preventDefault();

    const { username } = props
    const content = props.newtweet;

    try {
        await api.post('tweets', { content, author: username} )
        dispatch({
            type: 'HANDLE_TWEET',
            payload: ''
        })
    } catch(err) {
        deleteToken();
        return props.history.push('/');
    }
};