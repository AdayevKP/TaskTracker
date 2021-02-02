import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import './taskTracker.scss';
import { uniqueId } from 'lodash';

import bindMethods from '../tools/bindMethods'
import { Component } from 'react';


class Task extends Component {
    state = {
        active: false,
    }

    toggleState = () => {
        this.setState(prevState => ({active: !prevState.active}))
    }

    render () {
        return (
            <button 
                key={uniqueId()} 
                className="task-button" 
                style={{
                    color: this.state.active ? 'black' : this.props.color, 
                    border: '1px solid ' + this.props.color,
                }}
                onClick={this.toggleState}
            >
                {this.props.name}
            </button>
        );
    }
}


class TasksMenu extends Component {
    render() {
        return (
            <header className="menu">
                <div className="menu left-menu">
                    <div className="tasks">
                        <ul> 
                            {this.props.tasks.map((task) => <Task name={task.name} color={task.color}/>)} 
                        </ul>
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