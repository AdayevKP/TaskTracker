import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import './taskTracker.scss';
import { uniqueId } from 'lodash';

import { Component } from 'react';

import randomWords from 'random-words';  // for debug purposes only


//this frunction is for debug purposes only
function randomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


class Task extends Component {
    toggleState = () => {
        this.props.onStateToggle(this.props.name)
    }

    render () {
        return (
            <button 
                key={uniqueId()} 
                className="task-button" 
                style={{
                    color: this.props.active ? 'black' : this.props.color, 
                    border: '1px solid ' + this.props.color,
                    background: this.props.active ? this.props.color : 'white' 
                }}
                onClick={this.toggleState}
            >
                {this.props.name}
            </button>
        );
    }
}


class TasksMenu extends Component {
    state = {
        tasks: [],
        newTaskName: ''
    }

    componentDidMount () {
        this.setState({tasks: this.props.tasks})
    }

    componentWillReceiveProps(nextProps) {
        this.setState({tasks: nextProps.tasks})
    }

    handleToggleState = (name) => {
        const changeTaskState = (t) => {
            t.name == name ? t.active = !t.active : t.active = false;
            return t;
        }

        const task = this.state.tasks.find(t => t.name == name)
        this.props.onTaskToggled(task.id, !task.active)

        this.setState(prev => ({
            tasks: prev.tasks.map(changeTaskState)
        }))
    }

    handleAddTask = (color) => {
        color = randomColor(); // for debug purposes only
        const name = this.state.newTaskName; 
        this.setState(prev => ({
            tasks: [...prev.tasks, {name: name, color: color, active: false}]
        }))
        this.props.onAddTask(name, color)
    }

    render() {
        return (
            <header className="menu">
                <div className="menu left-menu">
                    <div className="tasks">
                        <ul> 
                            {this.state.tasks.map((task) => 
                                <Task 
                                    name={task.name} 
                                    color={task.color} 
                                    active={task.active}
                                    onStateToggle={this.handleToggleState}
                                />
                            )} 
                        </ul>
                    </div>
                    
                    <input 
                        type="text"  
                        value={this.state.newTaskName}
                        onChange={(e) => {this.setState({newTaskName: e.target.value})}}
                    />
                    <button className="menu-button add" onClick={this.handleAddTask}>+</button>
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