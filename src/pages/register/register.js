import React, { Component } from 'react';

import api from '../../services/api';
import { setToken } from '../../services/auth';

import './register.css';


export default class Register extends Component {

    state = {
        username: '',
        password: ''
    }

    handleInputChangeUsername = (e) => {
        this.setState({ username: e.target.value})
    }
    handleInputChangePassword = (e) => {
        this.setState({ password: e.target.value})
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = this.state;

        if(!username.length && !password.length) {
            alert("Insira seus dados!");
            return;
        }

        try {
            const body = await api.post('/register',{username,password});
            setToken(body.data.token);
            this.props.history.push('/timeline')
        } catch(err) {
            alert('Usuário Existente!')
        }
    }

    componentDidMount() {
        if(localStorage.getItem('token'))
            this.props.history.push('/timeline')
    }

    render() {
        return (
            <div className="register-wrapper">
                <form onSubmit={this.handleSubmit}>
                    <input 
                        placeholder="Nome do Usuário" 
                        value={this.state.username}
                        onChange={this.handleInputChangeUsername}
                    />
                    <input 
                        placeholder="Senha do Usuario" 
                        value={this.state.password}
                        onChange={this.handleInputChangePassword}
                        type="password"
                    />
                    <button type="submit">Registrar</button>
                </form>
            </div>
        )
    }
}
