import React from 'react'; 
import './taskTracker.scss';
import { Component } from 'react';

import TasksMenu from './tasksMenu'

import {getTasks, getSessions, addTask} from '../requests'
import Stats, {statsTypes} from './stats';
import randomWords from 'random-words';  // for debug purposes only
import { rest } from 'lodash';


const currentWeekBoundaries = () => {
    var curr = new Date();
    var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
    var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay()+6));

    return [firstday, lastday];
}


//this frunction is for debug purposes only
function randomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


class MainPage extends Component{
    state = {
        sessionsList: [],
        tasksList: [], 
        tasksById: {},
        statsType: statsTypes.DAYS,
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
    
    componentDidMount () {
        this.getTasksFromBackend();
        let startDate = null; 
        let endDate = null;
        //[startDate, endDate] = this.getSessionsBoundaries();

        getSessions(startDate, endDate, resp => {
            this.setState({
                sessionsList: resp.data.data
            })
        })
    }

    addTask = (name, color) => {
        color = randomColor(); // for debug purposes only
        name = randomWords(); // for debug purposes only
        addTask(name, color, (_) => this.getTasksFromBackend())
    }

    render() {
        const htmlString = 
        <div>
            <TasksMenu tasks={this.state.tasksList} onAddTask={this.addTask}/>        
            <div className="line"></div>
            <Stats sessions={this.state.sessionsList} tasksById={this.state.tasksById} type={statsTypes.DAYS}/>
        </div>

        return (htmlString);
    }
}

export default MainPage;