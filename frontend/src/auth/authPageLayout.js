import React from 'react'
import { Component } from 'react';

import './auth.css'


class AuthLayout extends Component {
    render() { 
        const body = 
        <body>
            <section class="authorization">
                <p class="authorization__header">Task Tracker</p>
                <form class="form" onSubmit={this.props.onSubmit} action={this.props.action}>
                    <div class="form__wrapper">
                        {this.props.children}
                    </div>
                </form>
            </section>
        </body>

        return (body);
    }
}


export default AuthLayout;
