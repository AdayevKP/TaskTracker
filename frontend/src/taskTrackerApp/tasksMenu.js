import React, { Component } from 'react';
import './taskTracker.scss';
import { uniqueId } from 'lodash';


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
        taskColor: '#808080'
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
        color = this.state.taskColor;
        const name = this.state.newTaskName; 
        this.setState(prev => ({
            tasks: [...prev.tasks, {name: name, color: color, active: false}]
        }))
        this.props.onAddTask(name, color)
    }

    setTaskColor = (s) => {
        let color = s.target.style.background
        this.setState(
            {taskColor: color}
        )
    }

    render() {
        return (
            <header className = "headerWrapper">
                <div className = "left-menu">
                    <div className = "tasks">
                        <ul> 
                            { this.state.tasks.map((task) => 
                                <Task 
                                    name={task.name} 
                                    color={task.color} 
                                    active={task.active}
                                    onStateToggle = { this.handleToggleState }
                                />
                            )} 
                        </ul>
                    </div>
                    <input 
                        style = {{ borderColor: this.taskColor }}
                        className = "input"
                        type = "text"  
                        value = {this.state.newTaskName}
                        onChange = { (e) => { this.setState({ newTaskName: e.target.value }) } }
                    />
                    <button className = "add-button" onClick = { this.handleAddTask }>+</button>
                    <div className = "colors">
                        <div className = "color" onClick = { s => this.setTaskColor(s) } style = {{ background: '#BCC8A7' }}></div>
                        <div className = "color" onClick = { s => this.setTaskColor(s) } style = {{ background: '#B5C4C6' }}></div>
                        <div className = "color" onClick = { s => this.setTaskColor(s) } style = {{ background: '#CD9A8F' }}></div>
                        <div className = "color" onClick = { s => this.setTaskColor(s) } style = {{ background: '#C59E5D' }}></div>
                    </div>
                </div>
                <div className = "right-menu">
                    <p className = "timer">0.00.00</p>
                    <button className = "stop-button">Pause</button>
                </div>
            </header>
        );
    }
};

export default TasksMenu;