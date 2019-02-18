import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeUsername, changePassword } from '../../actions/loginActions';
import { setToken } from '../../services/auth'
import api from '../../services/api';


import './Login.css';


class Login extends Component {

    handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = this.props.loginReducer;

        if(!username.length && !password.length) {
            alert("Insira seus dados!");
            return;
        }

        try {
            const body = await api.post('/login',{username,password});
            setToken(body.data.token);
            this.props.history.push('/timeline')
        } catch(err) {
            if(err.response.status === 400)
                return alert("Senha Inválida")
            alert('Usuario não cadastrado')
        }
    }
    
    componentDidMount() {
        if(localStorage.getItem('token'))
            this.props.history.push('/timeline')
    }

    render() {
        const {dispatch} = this.props
        return (
            <div className="login-wrapper">
                <form onSubmit={e => this.handleSubmit(e)}>
                    <input 
                        placeholder="Nome do Usuário" 
                        value={this.props.username}
                        onChange={e => dispatch(changeUsername(e.target.value))}
                    />
                    <input 
                        placeholder="Senha do Usuario" 
                        value={this.props.password}
                        onChange={e => dispatch(changePassword(e.target.value))}
                        type="password"
                    />
                    <button type="submit">Entrar</button>
                    <a href="/register">Crie sua Conta</a>
                </form>
            </div>
        )
    }
}
const mapStateToProps = state => ({...state})

export default connect(mapStateToProps)(Login);
