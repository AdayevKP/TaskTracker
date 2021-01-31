import axios from 'axios'

axios.defaults.headers.common['Content-Type'] = 'application/json';


// TODO: Set base path via command line or config file
const basePath = 'http://127.0.0.1:5000/api/v1'
const logInUrl = basePath + '/login'
const signUpUrl = basePath + '/user'

const tasksUrl = basePath + '/tasks'

const sessionsUrl = basePath + '/sessions'


const saveToken = (request) => {
    // TODO: add exceptions handling
    const token = request.data.data.token.toString();
    localStorage.setItem('token', token) //this is temporary way to save the token
    console.log(token);
}


const getToken = () => {
    const tkn = localStorage.getItem('token');
    return tkn
}


const onResp = (resp) => {
    alert(JSON.stringify(resp.data))
}


const onErr = (err) => {
    alert(JSON.stringify(err.message))
}


export const logIn = (username, password, callBack=onResp, errBack=onErr) => {
    const config = {
        auth: {
            username: username, 
            password: password
        }
    };
    localStorage.removeItem('token')
    console.log("request token")
    axios.get(logInUrl, config).then(res => {saveToken(res); callBack(res)}, errBack);
}


export const signUp = (username, password, callBack=onResp, errBack=onErr) => {
    const data = {
        username: username, 
        password: password
    };
    axios.post(signUpUrl, data).then(res => {saveToken(res); callBack(res)}, errBack);
} 


export const getTasks = (callBack=onResp, errBack=onErr) => {
    const token = getToken();
    const config = {
        headers: { Authorization: 'Bearer ' + token}
    };
    axios.get(tasksUrl, config).then(callBack, errBack);
}


export const getSessions = (startDate=null, endDate=null, callBack=onResp, errBack=onErr) => {
    const token = getToken();
    const config = {
        headers: { Authorization: 'Bearer ' + token},
        params: {
            begin_date: startDate,
            end_date: endDate
        }
    };
    axios.get(sessionsUrl, config).then(callBack, errBack);
}