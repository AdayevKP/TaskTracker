import React from 'react'; 
import './taskTracker.scss';
import { Component } from 'react';

import TasksMenu from './tasksMenu'

import {getTasks, getSessions} from '../requests'
import Stats, {statsTypes} from './stats';
import { rest } from 'lodash';


const currentWeekBoundaries = () => {
    var curr = new Date();
    var first = curr.getDate() - curr.getDay();
    var last = first + 6;

    var firstday = new Date(curr.setDate(first)).toUTCString();
    var lastday = new Date(curr.setDate(last)).toUTCString();

    return [firstday, lastday];
}

class MainPage extends Component{
    state = {
        sessionsList: [],
        tasksList: [], 
        tasksById: {},
        statsType: statsTypes.WEEK,
    }

    taskIdToObj = (id) => {
        return this.state.tasksById[id]
    }

    getSessionsBoundaries = () => {
        switch (this.state.statsType) {
            case statsTypes.WEEK:
                return currentWeekBoundaries();
        }
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
        
        let startDate = null; 
        let endDate = null;
        [startDate, endDate] = this.getSessionsBoundaries();

        getSessions(startDate, endDate, resp => {
            this.setState({
                sessionsList: resp.data.data
            })
        })
    }

    render() {
        const htmlString = 
        <div>
            <TasksMenu tasks={this.state.tasksList}/>        
            <div className="line"></div>
            <Stats sessions={this.state.sessionsList} taskIdToObj={this.taskIdToObj} type={statsTypes.WEEK}/>
        </div>

        return (htmlString);
    }
}

export default MainPage;