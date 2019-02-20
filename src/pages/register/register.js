import React, { Component } from 'react';

import { connect } from 'react-redux';
import { changeUsername, changePassword, handleRegister} from '../../actions/registerActions';

import './register.css';


class Register extends Component {

    componentDidMount() {
        if(localStorage.getItem('token'))
            this.props.history.push('/timeline')
    }

    render() {
        return (
            <div className="register-wrapper">
                <form onSubmit={e => this.props.handleRegister(e, this.props)}>
                    <input 
                        placeholder="Nome do Usuário" 
                        value={this.props.username}
                        onChange={e => this.props.changeUsername(e.target.value) }
                    />
                    <input 
                        placeholder="Senha do Usuario" 
                        value={this.props.password}
                        onChange={e => this.props.changePassword(e.target.value)}
                        type="password"
                    />
                    <button type="submit">Registrar</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    username: state.userProps.username,
    password: state.userProps.password
})

export default connect(mapStateToProps, { changeUsername, changePassword, handleRegister })(Register);