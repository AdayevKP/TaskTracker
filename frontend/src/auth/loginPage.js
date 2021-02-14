import './auth.css'

import React from 'react'
import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AuthLayout from './authPageLayout' 
import {SINGUP_PAGE} from '../routes'
import * as authActions from '../reducers/auth/actions'


class LoginPage extends Component{
    state = {
        username: '',
        password: '',
    };

    componentDidMount() {
        this.props.logOut()
    }

    onLogin = () => {
        this.props.logIn(this.state.username, this.state.password)
    }

    render() {
        const body = 
            <AuthLayout onSubmit={this.onLogin}>
                <input 
                    class="form__input" 
                    type="text" 
                    placeholder="Username" 
                    value={this.state.username} 
                    onChange={(e) => {this.setState({username: e.target.value})}}
                />
                
                <input 
                    class="form__input" 
                    type="password" 
                    placeholder="Password"
                    value={this.state.password} 
                    onChange={(e) => {this.setState({password: e.target.value})}}
                />

                <button class="form__button" onClick={this.onLogin}>Log in</button>
                <Link to={SINGUP_PAGE} class="form__button"> Register </Link>
            </AuthLayout>
            
        return (body);
    }
}


const actionsToProps = (dispatch) => {
    return {
        logOut: ()                   => dispatch(authActions.logOutAction()),
        logIn:  (username, password) => dispatch(authActions.logInAction(username, password))
    }
}

export default connect(null, actionsToProps)(LoginPage);
