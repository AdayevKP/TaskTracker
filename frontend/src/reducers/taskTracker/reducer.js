import * as actionTypes from './actionsTypes';
import {updateState} from '../tools'


const initialState = {
    tasks: [],
    sessions: [], 
}


const onTaskAdded = (state, action) => {
    return updateState(state, {tasks: [...state.tasks, action.newTask]})
}


const onResourcesAcquired = (state, action) => {
    return updateState(state, action.resources);
}


const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.TASK_ADDED:
            return onTaskAdded(state, action);
        case actionTypes.RESOURCES_ACQUIRED:
            return onResourcesAcquired(state, action);
        default:
            return state;
    }
}

export default reducer;