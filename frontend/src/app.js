import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';  
import AppRouter from './routes'
import { connect } from 'react-redux';

import * as authActions from './reducers/auth/actions'
 

class App extends Component{
    componentDidMount() {
        this.props.chekAuthorization();
    }

    render() {
        return (
            <Router>
                <AppRouter/>
            </Router>
        );
    }
}

const actionsToProps = (dispatch) => {
    return {
        chekAuthorization: () => dispatch(authActions.checkAuthAction()),
    }
}

export default connect(null, actionsToProps)(App);
