import * as actionTypes from './actionsTypes';
import {updateState} from '../tools'


const initialState = {
    isAuthorized: false,
    error: {},
}


const onAuthorized = (state, action) => {
    return updateState(state, {isAuthorized: true})
}


const onAuthFail = (state, action) => {
    return updateState(state, {isAuthorized: true, error: action.error});
}


const onLogOut = (state, action) => {
    return updateState(state, {isAuthorized: false})
}


const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SUCCESS: 
            return onAuthorized(state, action);
        case actionTypes.AUTH_FAIL:
            return onAuthFail(state, action); 
        case actionTypes.AUTH_LOGOUT:
            return onLogOut(state, action);
        default:
            return state;
    }
}

export default reducer;