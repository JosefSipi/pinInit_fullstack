import React from 'react';
import { Route, Switch } from "react-router-dom";
import SignUpContainer from './session/signup_container';
import NavBarContainer from './nav_bar/nav_bar_container';
import Home from '../components/home/home';
import { AuthRoute, ProtectedRoute } from '../utils/route_utils';
import LogInContainer from '../components/session/login_container';
import Feed from './feed/feed';
import Modal from './modal/modal';
// import UserShowContainer from "./"

export default () => (
    <div>
        {/* <AuthRoute path="/signup" component={SignUpContainer}/>
        <AuthRoute exact path="/login" component={LogInContainer}/> */}
        
        <Modal />
        
        <Route path="/" component={NavBarContainer}/>
        <AuthRoute path="/home" component={Home}/>
        <ProtectedRoute path="/feed" component={Feed}/>

    </div>
);

