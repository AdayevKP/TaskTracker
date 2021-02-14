import * as requests from '../../requests'
import * as actionTypes from './actionsTypes';


const taskAddedAction = (newTask) => {
    return {
        type: actionTypes.TASK_ADDED,
        newTask: newTask
    };
}


const resourcesAcquiredAction = (resources) => {
    return {
        type: actionTypes.RESOURCES_ACQUIRED,
        resources: resources,
    };
}


export const addTask = (name, color) => {
    return dispatch => {
        const onSuccess = (resp) => dispatch(taskAddedAction(resp.data.data));
        requests.addTask(name, color, onSuccess)
    }
}


export const getTasks = () => {
    return dispatch => {
        const onSuccess = (resp) => {
            const action = resourcesAcquiredAction({tasks: resp.data.data});
            dispatch(action);
        }
        requests.getTasks(onSuccess);
    }
}


export const getSessions = () => {
    return dispatch => {
        const onSuccess = (resp) => {
            const action = resourcesAcquiredAction({sessions: resp.data.data});
            dispatch(action);
        }
        requests.getSessions(onSuccess);
    }
}

