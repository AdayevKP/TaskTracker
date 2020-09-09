import React from 'react'
import './mainPage.scss';


class Task{
    constructor(color, name){
        this.color = color
        this.name = name
    }
}


function getTasks(){
    return [new Task('#fccf50', 'Work'), new Task('#B4E5CD', 'Study'), new Task('#185473', 'Workout')]
}


export default function getMainPage() {
    const htmlString = 
    <body>
        <header class="menu">
            <div class="menu left-menu">
                <button class="menu-batton">M</button>
                <div class="tasks">
                    {
                    Array.from(getTasks(), el => 
                    (<button class="task-batton" style={{color: el.color, border: '2px solid' + ' ' + el.color}}>
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
            <div class="day-1">
                {//<p class="data">M<br/>23</p>
                //<div class="task-work">4.2</div>
                //<div class="task-study">2.0</div>
                }
            </div>
            <div class="dayline"></div>
        </div>
    </body>

    return (htmlString);
}