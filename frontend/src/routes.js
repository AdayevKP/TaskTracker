import React from 'react';
import { Route } from 'react-router-dom';  
import LoginPage from './auth/loginPage'
import SignUpPage from './auth/signupPage'
import { default as TaskTrackerMainPage } from './taskTrackerApp/mainPage'


export const LOGIN_PAGE = "/login";
export const SINGUP_PAGE = "/signup";
export const MAIN_PAGE = "/" 

const AppRouter = () => (
    <div>
        <Route exact path = {LOGIN_PAGE} component={LoginPage}/>
        <Route exact path = {SINGUP_PAGE} component={SignUpPage}/>
        <Route exact path = {MAIN_PAGE}  component={TaskTrackerMainPage}/>
    </div>
)

export default AppRouter