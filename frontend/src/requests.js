import axios from 'axios'

axios.defaults.headers.common['Content-Type'] = 'application/json';


const BASE_URL     = new URL(process.env.REACT_APP_SERVER_API_URL, process.env.REACT_APP_SERVER_URL);

const LOG_IN_URL   = new URL('login',    BASE_URL);
const SIGN_UP_URL  = new URL('user',     BASE_URL);
const TASKS_URL    = new URL('tasks',    BASE_URL);
const SESSIONS_URL = new URL('sessions', BASE_URL);
const TIMER_URL    = new URL('timer',    BASE_URL);


export const TimerActions = {
    START: 'start',
    STOP: 'stop'
}


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


const getConfig = () => {
    const token = getToken();
    const config = {
        headers: { Authorization: 'Bearer ' + token}
    };
    return config
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
    axios.get(LOG_IN_URL.href, config).then(res => {saveToken(res); callBack(res)}, errBack);
}


export const signUp = (username, password, callBack=onResp, errBack=onErr) => {
    const data = {
        username: username, 
        password: password
    };
    axios.post(SIGN_UP_URL.href, data).then(res => {saveToken(res); callBack(res)}, errBack);
} 


export const getTasks = (callBack=onResp, errBack=onErr) => {
    const config = getConfig();
    axios.get(TASKS_URL.href, config).then(callBack, errBack);
}


export const getSessions = (startDate=null, endDate=null, callBack=onResp, errBack=onErr) => {
    const config = getConfig()
    config.params = {
        begin_date: startDate,
        end_date: endDate
    }

    axios.get(SESSIONS_URL.href, config).then(callBack, errBack);
}


export const addTask = (name, color, callBack=onResp, errBack=onErr) => {
    const config = getConfig() 
    config.params = {
        name: name,
        color: color
    }
    axios.put(TASKS_URL.href, {}, config).then(callBack, errBack);
}


export const toggleTimer = (taskId, action, callBack=onResp, errBack=onErr) => {
    const config = getConfig() 
    config.params = {
        action: action,
    }
    axios.put(TIMER_URL.href + '/' + taskId.toString(), {}, config).then(callBack, errBack);
}
