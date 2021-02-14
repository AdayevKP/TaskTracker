import {signUp, logIn, logOut, isAuthorized} from '../../requests'
import * as actionTypes from './actionsTypes';


const authSuccess = () => {
    return {
        type: actionTypes.AUTH_SUCCESS
    }
};


const authFail = (err) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err,
    }
}


const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}


export const signUpAction = (username, password) => {
    return dispatch => {
        const onSuccess = (r) => dispatch(authSuccess());
        const onErr = (err) => {
            dispatch(authFail(err));
            alert(err);
        }
        signUp(username, password, onSuccess, onErr);
    }
}


export const logInAction = (username, password) => {
    return dispatch => {
        const onSuccess = (r) => dispatch(authSuccess());
        const onErr = (err) => {
            dispatch(authFail(err));
            alert(err);
        }
        logIn(username, password, onSuccess, onErr);
    }
}

export const logOutAction = () => {
    return dispatch => {
        logOut();
        dispatch(authLogout());
    }
}


export const checkAuthAction = () => {
    return dispatch => {
        if (isAuthorized()) {
            dispatch(authSuccess());
        }
    }
}