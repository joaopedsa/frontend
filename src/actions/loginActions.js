import { setToken } from '../services/auth'
import api from '../services/api';

// action creator
export const changeUsername = (username) => {
    return {
        type: 'USERNAME_INPUT',
        payload: username
    };
};

export const changePassword = (password) => {
    return {
        type: 'PASSWORD_INPUT',
        payload: password
    };
};

export const handleLogin = (e,props) => async dispatch => {
    e.preventDefault();

    const { username, password, history } = props

    if(!username.length && !password.length) {
        alert("Insira seus dados!");
        return;
    }

    try {
        const body = await api.post('/login',{username,password});
        setToken(body.data.token);
        history.push('/timeline')
        dispatch({
            type: 'LOGIN_CLICK'
        })
    } catch(err) {
        if(err.response.status === 400)
            alert('senha invalida')
        alert('usuario não cadastrado')
    }
}