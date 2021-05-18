import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateUser, fetchUser } from '../../actions/user_actions';
import {openModal, closeModal } from '../../actions/modal';
import EditForm from './edit_form';

const mSTP = state => {
    return {
        user: state.user,
        photo: state.photoUrl
    };
};

const mDTP = dispatch => {
    return {
        updateUser: (user) => {
            return dispatch(updateUser(user));
        },
        fetchUser: (userId) => {
            return dispatch(fetchUser(userId));
        },
        openModal: (modal) => dispatch(openModal(modal)),
        closeModal: () => dispatch(closeModal())
    };
};


export default withRouter(connect(mSTP, mDTP)(EditForm));