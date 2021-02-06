import React from 'react';
import './taskTracker.scss';
import { uniqueId } from 'lodash';
import { CirclePicker } from 'react-color';

import { Component } from 'react';

const COLORS = ['#BCC8A7', '#B5C4C6', '#CD9A8F', '#C59E5D'];


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
        newTaskName: '',
        currentColor: COLORS[0], 
        colors: COLORS,
        showColorPicker: false
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

    handleAddTask = () => {
        const color = this.state.currentColor;
        const name = this.state.newTaskName;
        this.setState(prev => ({
            tasks: [...prev.tasks, {name: name, color: color, active: false}]
        }))
        this.props.onAddTask(name, color)
    }

    render() {
        return (
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
                <button 
                    className="menu-button add" 
                    style={{background: this.state.currentColor}}
                    onClick={()=>this.setState(prev=>({showColorPicker: !prev.showColorPicker}))}
                />
                <div>
                    {this.state.showColorPicker && 
                    <CirclePicker 
                        colors={this.state.colors}
                        onChange={(c)=>this.setState({currentColor: c.hex, showColorPicker: false})}
                    />}
                </div>
            </div>
        );
    }
};

export default TasksMenu;