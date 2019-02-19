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
        const { dispatch } = this.props;
        return (
            <div className="register-wrapper">
                <form onSubmit={e => handleRegister(e, this.props)}>
                    <input 
                        placeholder="Nome do Usuário" 
                        value={this.props.username}
                        onChange={e => dispatch(changeUsername(e.target.value)) }
                    />
                    <input 
                        placeholder="Senha do Usuario" 
                        value={this.props.password}
                        onChange={e => dispatch(changePassword(e.target.value))}
                        type="password"
                    />
                    <button type="submit">Registrar</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Register);