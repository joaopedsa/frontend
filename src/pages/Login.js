import React, { Component } from 'react';
import twitterLogo from '../twitter.svg'; 

import './Login.css';


export default class Login extends Component {

    state = {
        username: '',
    }

    handleInputChange = (e) => {
        this.setState({ username: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { username } = this.state;

        if(!username.length) return;

        localStorage.setItem('username', username)
    
        this.props.history.push('/timeline');
    }

    componentDidMount() {
        if(localStorage.getItem('username'))
            this.props.history.push('/timeline')
        console.log("Verifiquei")
    }

    render() {
        return (
            <div className="login-wrapper">
                <img src={twitterLogo} alt="GoTwitter"></img>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        placeholder="Nome do Usuário" 
                        value={this.state.username}
                        onChange={this.handleInputChange}
                    />
                    <button type="submit">Entrar</button>
                </form>
            </div>
        )
    }
}
