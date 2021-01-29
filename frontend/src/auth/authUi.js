import React from 'react'
import { Component } from 'react';
import axios from 'axios'

import './auth.css'

const loginPath = 'http://127.0.0.1:5000/api/v1/login'
const signPath = 'http://127.0.0.1:5000/api/v1/user'


class AuthComponent extends Component{
    state = {
        username: '',
        password: '',
    };

    onResp = (resp) => {alert(JSON.stringify(resp.data))}

    onErr = (err) => {alert(JSON.stringify(err.response.data))}

    onLogin = () => {
        let config={
            headers: {'Content-Type' : 'application/json'},
            auth: {username: this.state.username, password: this.state.password}
        }
        axios.post(loginPath, {}, config).then(this.onResp).catch(this.onErr)
    }

    onSignUp = () => {
        let config={
            headers: {'Content-Type' : 'application/json'}
        }
        axios.post(signPath, JSON.stringify({'username': this.state.username, 'password': this.state.password}), config)
        .then(this.onResp, this.onErr)
    }

    render() { 
        const body = 
        <body>
            <section class="authorization">
                <p class="authorization__header">Task Tracker</p>
                <div class="form">
                    <div class="form__wrapper">
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
                        <button class="form__button" onClick={this.onSignUp}>Sign up</button>
                    </div>
                </div>
            </section>
        </body>

        return (body);
    }
}

export default AuthComponent;
