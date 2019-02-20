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

export const handleRegister = (e, props) => async dispatch => {
    e.preventDefault();
    const { username, password } = props;

    if(!username.length && !password.length) {
        alert("Insira seus dados!");
        return;
    }

    try {
        const body = await api.post('/register',{username,password});
        setToken(body.data.token);
        props.history.push('/timeline')
        dispatch({
            type: 'SUCCESS'
        })
    } catch(err) {
        alert('Usuário Existente!')
    }
}