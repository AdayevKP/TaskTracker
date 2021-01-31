import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import './taskTracker.scss';
import { uniqueId } from 'lodash';

import bindMethods from '../tools/bindMethods'
import { Component } from 'react';


class MainPage extends Component{
    render() {
        const htmlString = 
        <div>
            <header className="menu">
                <div className="menu left-menu">
                    <button className="menu-batton">MENU</button>
                    <div className="tasks">
                    </div>
                    <button className="menu-batton add">+</button>
                </div>
                <div className="menu right-menu">
                    <p className="timer">0.00.00</p>
                    <button className="stop-batton">Pause</button>
                </div>
            </header>
            
            <div className="line"></div>
            <div className="results">
            </div>
        </div>

        return (htmlString);
    }
}

export default MainPage;