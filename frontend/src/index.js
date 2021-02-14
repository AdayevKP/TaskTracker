import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import authReducer from './reducers/auth/reducer'

import * as serviceWorker from './tools/serviceWorker';
import App from './app'


const mainReducer = combineReducers({auth: authReducer})
const appStore = createStore(mainReducer, applyMiddleware(thunk));


ReactDOM.render(
    <Provider store={appStore}>
        <App />
    </Provider>,
    document.getElementById('root')
)

serviceWorker.unregister()
