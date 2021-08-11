import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from './nav_bar';
import { openModal, closeModal } from '../../actions/modal';
import { logout } from '../../actions/session';
import { fetchUser } from '../../actions/user_actions';
import { updateSearch } from '../../actions/user_actions';
    // debugger
const mSTP = state => ({
    currentUser: state.session.currentUser,
    user: state.user,
    users: state.user.searchUsers
});

const mDTP = dispatch => ({
    logout: () => dispatch(logout()),
    openModal: (modal) => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal()),
    fetchUser: (userId) => {
        return dispatch(fetchUser(userId));
    },
    updateSearch: (input) => {
        // debugger
        return dispatch(updateSearch(input))
    }
    

});




export default withRouter(connect(mSTP, mDTP)(NavBar));