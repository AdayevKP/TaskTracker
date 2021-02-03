import React from 'react'; 
import './taskTracker.scss';
import { Component } from 'react';

import TasksMenu from './tasksMenu'

import {getTasks, getSessions, addTask, toggleTimer, TimerActions} from '../requests'
import Stats, {statsTypes} from './stats';
import { rest } from 'lodash';


const currentWeekBoundaries = () => {
    var curr = new Date();
    var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
    var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay()+6));

    return {startDate: firstday, endDate: lastday};
}


class MainPage extends Component{
    state = {
        sessionsList: [],
        tasksList: [], 
        tasksById: {},
        statsType: statsTypes.DAYS,
        statsBounds: {}
    }

    getSessionsBoundaries = () => {
        switch (this.state.statsType) {
            case statsTypes.DAYS:
                return currentWeekBoundaries();
        }
    }

    getTasksFromBackend = () => {
        getTasks(
            resp => {
                this.setState({
                    tasksList: resp.data.data,
                    tasksById: resp.data.data.reduce((acc, el) => {acc[el.id] = el; return acc}, {})
                })
            }
        )
    }

    getSessionsFromBackend = () => {
        getSessions(
            this.state.statsBounds.startDate, 
            this.state.statsBounds.endDate, 
            resp => {
                this.setState({
                    sessionsList: resp.data.data
                })
            }
        )
    }
    
    componentDidMount () {
        this.setState({statsBounds: this.getSessionsBoundaries()});
        this.getTasksFromBackend();
        this.getSessionsFromBackend();
    }

    handleAddTask = (name, color) => {
        addTask(name, color, () => this.getTasksFromBackend())
    }

    startTimer = (taskId, start) => {
        start ? 
          toggleTimer(taskId, TimerActions.START, () => this.getSessionsFromBackend()) 
        : toggleTimer(taskId, TimerActions.STOP, () => this.getSessionsFromBackend());
     }

    render() {
        const htmlString = 
        <div>
            <TasksMenu 
                tasks={this.state.tasksList} 
                onAddTask={this.handleAddTask} 
                onTaskToggled={this.startTimer}
            />        
            <div className="line"></div>
            <Stats 
                from={this.state.statsBounds.startDate}
                to={this.state.statsBounds.endDate}
                sessions={this.state.sessionsList} 
                tasksById={this.state.tasksById} 
                type={statsTypes.DAYS}
            />
        </div>

        return (htmlString);
    }
}

export default MainPage;