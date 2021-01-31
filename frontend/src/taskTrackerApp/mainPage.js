import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import './taskTracker.scss';
import { uniqueId } from 'lodash';

import bindMethods from '../tools/bindMethods'
import { Component } from 'react';

import TasksMenu from './tasksMenu'

import {getTasks} from '../requests'

class MainPage extends Component{
    state = {
        sessionsList: [],
        tasksList: [], 
        tasksById: {}
    }
    
    componentDidMount () {
        getTasks(
            resp => {
                this.setState({
                    tasksList: resp.data.data,
                    tasksById: resp.data.data.reduce((acc, el) => {acc[el.id] = el; return acc}, {})
                })
            }
         )
    }

    render() {
        const htmlString = 
        <div>
            <TasksMenu tasks={this.state.tasksList}/>        
            <div className="line"></div>


            <div className="results">
            </div>
        </div>

        return (htmlString);
    }
}

export default MainPage;