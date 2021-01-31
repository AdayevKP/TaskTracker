import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import './taskTracker.scss';
import { uniqueId } from 'lodash';

import bindMethods from '../tools/bindMethods'
import { Component } from 'react';


export const statsTypes = {
    WEEK: 'week'
}


class Session extends Component {
    
}


class Day extends Component {

}


class Week extends Component {

}


class Stats extends Component {

    getStats = (type) => {
        switch (type) {
            case statsTypes.WEEK:
                return (<ul> {JSON.stringify(this.props.sessions)} </ul>);
        }
    }

    render() {
        return (
            <div className="results">
                {this.getStats(this.props.type)}
            </div>
        );
    }
};

export default Stats;