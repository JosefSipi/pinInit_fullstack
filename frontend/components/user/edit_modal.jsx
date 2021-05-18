import React from 'react';
import { connect } from 'react-redux';
import UploadPhoto from './uploader';
import { updateUser } from '../../actions/user_actions';
import { openModal, closeModal } from '../../actions/modal';
import { withRouter } from 'react-router-dom';



const mSTP = state => {

    return {
        formType: 'uploadPhoto',
        errors: state.errors
    };
};


const mDTP = dispatch => ({
    updateUser: user => dispatch(updateUser(user)),
    closeModal: () => dispatch(closeModal()),
    openModal: (modal) => dispatch(openModal(modal))
});

export default withRouter(connect(mSTP, mDTP)(UploadPhoto));