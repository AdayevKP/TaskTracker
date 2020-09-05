import React from 'react'
import './mainPage.css';

function getValues() {
    return ['hello', 'world', 'kek']
}


function getMainPage() {

    const htmlString = 
        <div className="mainPage">
            <header className="mainPage-header">
                {Array.from(getValues(), el => (<p> {el} </p>))}
            </header>
        </div>

    return (htmlString);
}

export default getMainPage;