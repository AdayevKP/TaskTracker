import './auth.css'

import React from 'react'
import { connect } from 'react-redux';
import { Component } from 'react';
import { Redirect } from 'react-router-dom';

import {MAIN_PAGE} from '../routes'


class AuthLayout extends Component {
    render() {
        if (this.props.isAuthorized){
            return (<Redirect to={MAIN_PAGE}/>);
        }
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

const stateToProps = (state) => {
    return {
        isAuthorized: state.auth.isAuthorized
    }
}


export default connect(stateToProps)(AuthLayout);
