import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import './taskTracker.scss';
import { uniqueId } from 'lodash';

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
            <Route exact path={this.path} component={this.getMainPage} />
        </Router>

        return (html);
    }

    getMainPage(){
        const htmlString = 
        <div>
            <header className="menu">
                <div className="menu left-menu">
                    <button className="menu-button">MENU</button>

                    <div className="tasks">
                        {
                        Array.from(this.model.getTasks(), el => 
                        (<button key={uniqueId()} className="task-button" style={{color: el.color, border: '1px solid ' + el.color}}>
                            {el.name}
                        </button>))
                        }
                    </div>
                    <button className="menu-button add">+</button>
                    
                </div>
                <div className="menu right-menu">
                    <p className="timer">0.00.00</p>
                    <button className="stop-button">Pause</button>
                </div>
            </header>
            
            <div className="line"></div>
            <div className="results">
                {this.getWeek()}
            </div>
        </div>

        return (htmlString);
    }

    getWeek(){
        const week = this.model.getWeek();
        const days = Array.from(week.days, (weekDay) => this.getWeekDay(weekDay));
        return days.reduce((acc, el) => [...acc, el, <div key={uniqueId()} className="dayline"></div>], []);
    }

    getWeekDay(day) {
        function pxWidthFromDuration(duration){
            return duration*100 + 'px'
        }

        const daySessions = [];

        for (let session of day.sessions) {
            const sessionHtml = 

            <div key={uniqueId()} className="task" style={{
                backgroundColor: session.task.color, 
                width: pxWidthFromDuration(session.duration)}}>
                {session.duration}
            </div>

            daySessions.push(sessionHtml)
        }
        
        let date;
        [date, ] = day.date.split('.')
        const html = 
        <div key={uniqueId()} className="day">
            <p className="data">{day.name}<br/>{date}</p>
            {daySessions}
        </div>

        return (html);
    }
}

export default TaskTrackerUi;