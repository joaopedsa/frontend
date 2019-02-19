import { setToken } from '../services/auth'
import api from '../services/api';

// action creator
export const changeUsername = (username) => {
    return {
        type: 'CHANGE_USERNAME',
        payload: username
    };
};

export const changePassword = (password) => {
    return {
        type: 'CHANGE_PASSWORD',
        payload: password
    };
};

export const handleRegister = async (e, props) => {
    e.preventDefault();
    const { username, password } = props.userReducer;

    if(!username.length && !password.length) {
        alert("Insira seus dados!");
        return;
    }

    try {
        const body = await api.post('/register',{username,password});
        setToken(body.data.token);
        props.history.push('/timeline')
    } catch(err) {
        alert('Usuário Existente!')
    }
}