import React from 'react'
import { Component } from 'react';

import './auth.css'


class AuthLayout extends Component {
    render() { 
        const body = 
        <body>
            <section class="authorization">
                <p class="authorization__header">Task Tracker</p>
                <div class="form">
                    <div class="form__wrapper">
                        {this.props.children}
                    </div>
                </div>
            </section>
        </body>

        return (body);
    }
}


export default AuthLayout;
