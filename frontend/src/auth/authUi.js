import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import bindMethods from '../tools/bindMethods'

import './auth.css'


class AuthUi{
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
            <section class="authorization">
                <p class="authorization__header">Authorization</p>
                <div class="authorization__line"></div>
                <div class="form">
                    <form class="form__wrapper" action="#" method="post">
                        <input class="form__input" name="user_login" type="email" placeholder="Mail"/>
                        <input class="form__input" name="user_password" type="password" placeholder="Password"/>
                        <button class="form__button" type="submit">Log in</button>
                        <button class="form__button" type="submit">Sign up</button>
                    </form>
                </div>
            </section>
        </body>

        return (htmlString);
    }
}

export default AuthUi;
