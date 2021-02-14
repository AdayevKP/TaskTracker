import './auth.css'

import React from 'react'
import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; 

import AuthLayout from './authPageLayout'
import {LOGIN_PAGE} from '../routes'
import * as authActions from '../reducers/auth/actions'


class SignUpPage extends Component{
    state = {
        username: '',
        password: '',
        passwordRepeat: ''
    };

    onSignUp = () => {
        this.props.signUp(this.state.username, this.state.password);
    }

    render() { 
        const body = 
            <AuthLayout>
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

                {/*TODO: add checks for password repeat*/}
                <input 
                    class="form__input" 
                    type="password" 
                    placeholder="Repeat password"
                    value={this.state.passwordRepeat} 
                    onChange={(e) => {this.setState({passwordRepeat: e.target.value})}}
                />

                <button class="form__button" onClick={this.onSignUp}>Sign Up</button>
                <Link to={LOGIN_PAGE} class="form__button"> Cancel </Link>
            </AuthLayout>
        return (body);
    }
}


const actionsToProps = (dispatch) => {
    return {
        signUp:  (username, password) => dispatch(authActions.signUpAction(username, password))
    }
}

export default connect(null, actionsToProps)(SignUpPage);
