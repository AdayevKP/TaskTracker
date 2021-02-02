import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import './taskTracker.scss';
import { uniqueId } from 'lodash';

import bindMethods from '../tools/bindMethods'
import { Component } from 'react';


export const statsTypes = {
    DAYS: 'days'
}

const daysNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const magicConstantFromStackOveflow = 36e5;

const getDate = (date) => {
    if (!date) {
        return undefined;
    }
    const newDate = new Date(date);
    newDate.setHours(0,0,0,0);
    return newDate;
}


const groupSessionsByDays = (data, firstDay=null, lastDay=null) => {
    const sessions = data;
    sessions.sort((a, b) => a.start - b.start);

    const minDate = getDate(firstDay) || getDate(sessions[0].start);
    const maxDate = getDate(lastDay) || getDate(sessions[sessions.length - 1].start);
    maxDate.setDate(maxDate.getDate() + 1);


    const sessionsByDaysDict = sessions.reduce((acc, el) => {
        const date = getDate(el.start);
        if (acc[date]) {
            acc[date].push(el);
        } else {
            acc[date] = [el];
        }
        return acc;
    }, {})

    const sessionsByDaysList = []
    for (let d = new Date(minDate); d < maxDate; d.setDate(d.getDate() + 1)) {
        const sessions = sessionsByDaysDict[getDate(d)];
        if (sessions) {
            sessionsByDaysList.push({sessions: sessions, date: new Date(d)})
        } else {
            sessionsByDaysList.push({sessions: [], date: new Date(d)})
        }
    }

    return sessionsByDaysList;
}


const Session = (props) => {
    const pxWidthFromDuration = (duration) => {
        return (duration*1000)/24 + 'px'
    }

    return (
        <div key={uniqueId()} className="task" style={{
            backgroundColor: props.color, 
            width: pxWidthFromDuration(props.duration)}}>
            {props.duration}
        </div>
    );
}


const Day = (props) => {
    return (
        <div>
            <div key={uniqueId()} className="day">
                <p className="data">{props.name}<br/>{props.date}</p>
                {props.children}
            </div>
            <div key={uniqueId()} className="dayline"/>
        </div>
    );
}


const ByDays = (props) => {
    if (!props.sessions || !props.sessions.length) {
        return (<div/>);
    }

    const groupedSessions = groupSessionsByDays(props.sessions);
    
    return (
        <div> 
            {groupedSessions.map(el => (
                <Day name={daysNames[el.date.getDay()]} date={el.date.getDate()}>
                    {el.sessions.map(s => {
                        const hours = Math.abs(s.end - s.start) / magicConstantFromStackOveflow;
                        return (<Session color={s.color} duration={hours.toFixed(2)}/>)
                    })}
                </Day>
            ))} 
        </div>
    );
}


class Stats extends Component {
    getSessions = () => {
        return this.props.sessions.map(
            s => {
                s.color = this.props.tasksById[s.task_id].color;
                s.start = new Date(s.start);
                s.end = s.end ? new Date(s.end) : new Date();
                return s;
            }
        )
    }

    render() {
        return (
            <div className="results">
                {
                    (this.props.type == statsTypes.DAYS) && 
                    <ByDays sessions={this.getSessions()} from={this.props.from} to={this.props.to}/>
                }
            </div>
        );
    }
};


export default Stats;
