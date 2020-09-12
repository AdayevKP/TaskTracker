import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import './taskTracker.scss';

import bindMethods from '../tools/bindMethods'


class TaskTrackerUi{
    constructor(model, path){
        this.model = model
        this.path = path
        bindMethods(this)
    }

    render() {
        const html = 
        <Router>
            <div>
                <Route exact path={this.path} component={this.getMainPage} />
            </div>
        </Router>

        return (html);
    }

    getMainPage(){
        const htmlString = 
        <body>
            <header class="menu">
                <div class="menu left-menu">
                    <button class="menu-batton">M</button>
                    <div class="tasks">
                        {
                        Array.from(this.model.getTasks(), el => 
                        (<button class="task-batton" style={{color: el.color, border: '2px solid ' + el.color}}>
                            {el.name}
                        </button>))
                        }
                    </div>
                    <button class="menu-batton add">+</button>
                </div>
                <div class="menu right-menu">
                    <p class="timer">0.00.00</p>
                    <button class="stop-batton">Pause</button>
                </div>
            </header>
            
            <div class="line"></div>
            <div class="results">
                {this.getWeek()}
            </div>
        </body>

        return (htmlString);
    }

    getWeek(){
        const week = this.model.getWeek();
        const days = Array.from(week.days, (weekDay) => this.getWeekDay(weekDay));
        return days.reduce((acc, el) => [...acc, el, <div class="dayline"></div>], []);
    }

    getWeekDay(day) {
        function pxWidthFromDuration(duration){
            return duration*100 + 'px'
        }

        const daySessions = [];

        for (let session of day.sessions) {
            const sessionHtml = 

            <div class="task" style={{
                backgroundColor: session.task.color, 
                width: pxWidthFromDuration(session.duration)}}>
                {session.duration}
            </div>

            daySessions.push(sessionHtml)
        }

        const html = 

        <div class="day">
            <p class="data">{day.name}<br/>{day.date}</p>
            {daySessions}
        </div>

        return (html);
    }
}

export default TaskTrackerUi;