import React from 'react';
import { Route, Switch } from "react-router-dom";
import SignUpContainer from './session/signup_container';
import Home from './home/home';
// import UserShowContainer from "./"

export default () => (
    <div>
        <Route exact path="/" component={Home}/>
        <Route path="/signup" component={SignUpContainer}/>
    </div>
);


// need to build UserShowContainer
