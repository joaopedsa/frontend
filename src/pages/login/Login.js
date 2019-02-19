import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeUsername, changePassword, handleLogin } from '../../actions/loginActions';

import { withRouter } from 'react-router-dom';


import './Login.css';


class Login extends Component {
    componentDidMount() {
        if(localStorage.getItem('token'))
            this.props.history.push('/timeline')
    }

    render() {
        return (
            <div className="login-wrapper">
                <form onSubmit={e => this.props.handleLogin(e, this.props)}>
                    <input 
                        placeholder="Nome do Usuário" 
                        value={this.props.username}
                        onChange={e => this.props.changeUsername(e.target.value)}
                    />
                    <input 
                        placeholder="Senha do Usuario" 
                        value={this.props.password}
                        onChange={e => this.props.changePassword(e.target.value)}
                        type="password"
                    />
                    <button type="submit">Entrar</button>
                    <a href="/register">Crie sua Conta</a>
                </form>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        username: state.userProps.username,
        password: state.userProps.password
    }
}

export default withRouter(connect(mapStateToProps,{ changeUsername, changePassword, handleLogin } )(Login));
