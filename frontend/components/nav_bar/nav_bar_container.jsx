import React from 'react';
import { connect } from 'react-redux';
import NavBar from './nav_bar';

import { logout } from '../../actions/session';

// not sure exactly how state as currentUser
const mSTP = state => ({
    currentUser: state.session.currentUser
});

const mDTP = dispatch => ({
    logout: () => dispatch(logout())
});




export default connect(mSTP, mDTP)(NavBar);