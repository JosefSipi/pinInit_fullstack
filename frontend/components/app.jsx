import React from 'react';
import { Route, Switch } from "react-router-dom";
// import SignUpContainer from './session/signup_container';
import NavBarContainer from './nav_bar/nav_bar_container';
import Home from '../components/home/home';
import { AuthRoute, ProtectedRoute } from '../utils/route_utils';
// import LogInContainer from '../components/session/login_container';
import Feed from './feed/feed';
import Modal from './modal/modal';
import ModalUpload from './modal/uploadModal';
import UserProfileContainer from './user/show_container';
import EditContainer from './user/edit_container';
// import UserShowContainer from "./"

export default () => (
    <div>
        {/* <AuthRoute path="/signup" component={SignUpContainer}/>
        <AuthRoute exact path="/login" component={LogInContainer}/> */}
        
        <Modal />
        <ModalUpload/>
        <div className="the-whole-page">
            <header>
                <Route path="/" component={NavBarContainer}/>
            </header>
                <Route path="/home" component={Home}/>

            <ProtectedRoute path="/edit-profile" component={EditContainer}/>
            <ProtectedRoute path="/feed" component={Feed}/>
            <ProtectedRoute path="/profile" component={UserProfileContainer}/>
        </div>


        {/* <ProtectedRoute exact path="/profile/edit" component={UserEditContainer}/> */}

    </div>
);

