import React from 'react'
import { Component } from 'react';
import { Link } from 'react-router-dom';

import {logIn, signUp} from '../requests'

import AuthLayout from './authPageLayout' 

import './auth.css'

import {SINGUP_PAGE} from '../routes'


class LoginPage extends Component{
    state = {
        username: '',
        password: '',
    };

    onResp = (resp) => {
        console.log(JSON.stringify(resp.data))
    }
    
    
    onErr = (err) => {
        if (err.response && err.response.data){
            console.log(JSON.stringify(err.response.data))
        } else {
            console.log(JSON.stringify(err))
        }
    
    }

    onLogin = () => {
        logIn(this.state.username, this.state.password, this.onResp, this.onErr)
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

                <button class="form__button">Log in</button>
                <Link to={SINGUP_PAGE} class="form__button"> Register </Link>
            </AuthLayout>
        return (body);
    }
}

export default LoginPage;
