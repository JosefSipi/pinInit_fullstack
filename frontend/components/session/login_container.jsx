import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/session';
import LogIn from './login';
import { openModal, closeModal } from '../../actions/modal';
import { withRouter } from 'react-router-dom';
import { fetchUser } from '../../actions/user_actions'

const mSTP = state => {

    return {
        formType: 'login',
        errors: state.errors
    };
};


const mDTP = dispatch => ({
    login: (userForm) => dispatch(login(userForm)),
    otherForm: (
        <button onClick={() => dispatch(openModal('signup'))} >
        Sign up
        </button>
    ),
    closeModal: () => dispatch(closeModal()),
    openModal: (modal) => dispatch(openModal(modal)),
    fetchUser: userId => {
        return dispatch(fetchUser(userId))
    }
});

export default withRouter(connect(mSTP, mDTP)(LogIn));