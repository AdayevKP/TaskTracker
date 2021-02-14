import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';  
import * as serviceWorker from './tools/serviceWorker';
import AppRouter from './routes'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import authReducer from './reducers/auth/reducer'
 

const mainReducer = combineReducers({auth: authReducer})
const appStore = createStore(mainReducer, applyMiddleware(thunk));


class App extends Component{
    render() {
        return (
        <Provider store={appStore}>
            <Router>
                <AppRouter/>
            </Router>
        </Provider>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)

serviceWorker.unregister()
