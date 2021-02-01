import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import './taskTracker.scss';
import { uniqueId } from 'lodash';

import bindMethods from '../tools/bindMethods'
import { Component } from 'react';


const Task = (props) => {
    return (
        <button 
            key={uniqueId()} 
            className="task-button" 
            style={{color: props.color, border: '1px solid ' + props.color}}>
            {props.name}
        </button>
    );
}


const TasksList = (props) => {
    return (
        <ul> {Array.from(props.tasks, (task) => <Task name={task.name} color={task.color}/>)} </ul>
    );
};


class TasksMenu extends Component {
    render() {
        return (
            <header className="menu">
                <div className="menu left-menu">
                    <div className="tasks">
                        <TasksList tasks={this.props.tasks}/>
                    </div>
                    
                    <button className="menu-button add" onClick={this.props.onAddTask}>+</button>
                </div>

                <div className="menu right-menu">
                    <p className="timer">0.00.00</p>
                    <button className="stop-button">Pause</button>
                </div>
            </header>
            
        );
    }
};

export default TasksMenu;