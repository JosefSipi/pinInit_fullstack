import React from 'react';
import { Route, Switch } from "react-router-dom";
// import SignUpContainer from './session/signup_container';
import NavBarContainer from './nav_bar/nav_bar_container';
// import Home from '../components/home/home';
import { AuthRoute, ProtectedRoute } from '../utils/route_utils';
// import LogInContainer from '../components/session/login_container';
import FeedContainer from './feed/feed_container';
import Modal from './modal/modal';
import ModalUpload from './modal/uploadModal';
import EditModal from './modal/editBoard';
import EditPin from './modal/editPin';
import UserProfileContainer from './user/show_container';
import EditContainer from './user/edit_container';
import SignUpModal from './modal/signUpModal';
import CreateBoardModal from './modal/createBoard';
// import UserShowContainer from "./"
import BoardShow from './board/show_board_container';
import CreatePin from './pin/create_pin_container';
import CreatePinLink from './pin/create_pin_link_container';
import PinShow from './pin/pin_show_container';
import ScrollToTop from '../components/nav_bar/scroll_to_top';
import LandingComponent from '../components/home/landing_container'
import SearchFeedContainer from '../components/feed/search_feed_container';

export default () => ( 
    <div>
        {/* <AuthRoute path="/signup" component={SignUpContainer}/>
        <AuthRoute exact path="/login" component={LogInContainer}/> */}
        <ScrollToTop />
        <Modal />
        <ModalUpload/>
        <SignUpModal/>
        <EditPin/> {/* this should be a protected page */}
        <EditModal/>
        <CreateBoardModal/>
        <CreatePinLink/>
        <div className="the-whole-page">
            <header className='primary-header-app'>
                <Route path="/" component={NavBarContainer}/>
            </header>
            <div className="space-provider"></div>
            {/* <Route path="/home" component={Home}/> */}
            {/* <Route path={`/profile/`} */}
            <AuthRoute exact path="/" component={LandingComponent}/>
            <Route path="/board/:id" component={BoardShow}/>
            <Route path="/pin/:id" component={PinShow} />
            <ProtectedRoute path='/pin-create' component={CreatePin}/>
            <ProtectedRoute path="/edit-profile" component={EditContainer}/>
            <ProtectedRoute path="/feed" component={FeedContainer}/>
            <ProtectedRoute path="/feed-search" component={SearchFeedContainer} />
            <ProtectedRoute path="/profile/:id" component={UserProfileContainer}/>
        </div>


        {/* <ProtectedRoute exact path="/profile/edit" component={UserEditContainer}/> */}

    </div>
);

