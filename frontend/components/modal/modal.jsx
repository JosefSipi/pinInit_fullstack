import React from 'react';
import { closeModal } from '../../actions/modal';
import { connect } from 'react-redux';
import SignUpContainer from '../session/signup_container';
import LogInContainer from '../session/login_container';
import { withRouter } from 'react-router-dom';

function Modal({ modal, closeModal }) {
    if (!modal) {
        return null;
    }

    let loginOrSignup;

    switch(modal) {
        case 'login':
            loginOrSignup = <LogInContainer />;
            break;
        case 'signup':
            loginOrSignup = <SignUpContainer />
            break;
        default:
            return null;
    }


    return(
        <div className="modal-backgrou" onClick={closeModal}>
            <div className="modal-child" onClick={e => e.stopPropagation()}>
                { loginOrSignup }
            </div>
        </div>
    )
}


const mSTP = state => {
    return {
        modal: state.ui.modal
    };
};

const mDTP = dispatch => {
    return {
        closeModal: () => dispatch(closeModal())
    };
};

export default withRouter(connect(mSTP, mDTP)(Modal));