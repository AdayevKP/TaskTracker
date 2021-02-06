import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';  
import * as serviceWorker from './tools/serviceWorker';
import AppRouter from './routes'
 

class App extends Component{
    render() {
        return (
        <Router>
            <AppRouter/>
        </Router>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)

serviceWorker.unregister()
