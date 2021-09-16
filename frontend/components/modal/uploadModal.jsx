import React from 'react';
import { closeModal } from '../../actions/modal';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UploadEditContainer from '../user/edit_modal';
import { fetchUser } from '../../actions/user_actions';

function Modal({ modal, closeModal }) {
    if (!modal) {
        return null;
    }

    let loginOrSignup;

    switch (modal) {
        case 'uploadPhoto':
            loginOrSignup = <UploadEditContainer />
            break;
        default:
            return null;
    }


    return (
        <div className="modal-background" onClick={closeModal}>
            <div className="modal-child-upload" onClick={e => e.stopPropagation()}>
                {loginOrSignup}
            </div>

        </div>
    )
}


const mSTP = state => {
    
    // window.currentUser = state.session.currentUser

    return {
        modal: state.ui.modal,
        currentUser: window.currentUser = state.session.currentUser
    };
};

const mDTP = dispatch => {
    return {
        closeModal: () => dispatch(closeModal()),
        fetchUser: (userId) => {
            return dispatch(fetchUser(userId));
        }
    };
};

export default withRouter(connect(mSTP, mDTP)(Modal));