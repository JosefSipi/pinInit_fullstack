import React from 'react';
import { Route, Switch } from "react-router-dom";
import SignUpContainer from './session/signup_container';
import NavBar from './nav_bar/nav_bar';
// import UserShowContainer from "./"

export default () => (
    <div>
        <Route exact path="/" component={NavBar}/>
        
        <Route path="/signup" component={SignUpContainer}/>
    </div>
);


// need to build UserShowContainer
