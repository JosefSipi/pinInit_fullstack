import React from 'react';
import { connect } from 'react-redux';
import NavBar from './nav_bar';
import { openModal, closeModal } from '../../actions/modal';
import { logout } from '../../actions/session';


const mSTP = state => ({
    currentUser: state.session.currentUser
});

const mDTP = dispatch => ({
    logout: () => dispatch(logout()),
    openModal: (modal) => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal())
});




export default connect(mSTP, mDTP)(NavBar);