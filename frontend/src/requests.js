import axios from 'axios'

axios.defaults.headers.common['Content-Type'] = 'application/json';

const basePath = 'http://127.0.0.1:5000/api/v1'
const logInUrl = basePath + '/login'
const signUpUrl = basePath + '/user'


const onResp = (resp) => {
    alert(JSON.stringify(resp))
}


const onErr = (err) => {
    alert(JSON.stringify(err))
}


export const logIn = (username, password, callBack=onResp, errBack=onErr) => {
    const config = {
        auth: {
            username: username, 
            password: password
        }
    };
    axios.post(logInUrl, {}, config).then(callBack, errBack);
}


export const signUp = (username, password, callBack=onResp, errBack=onErr) => {
    const data = JSON.stringify({
        username: username, 
        password: password
    });
    axios.post(signUpUrl, data).then(callBack, errBack);
}