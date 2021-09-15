import { connect } from 'react-redux';
import { updateUser } from '../../actions/user_actions';
import Uploader from './uploader';
import { closeModal, openModal } from '../../actions/modal';
import { withRouter } from 'react-router-dom';
import { fetchUser } from '../../actions/user_actions';


const mSTP = state => {
    debugger
    return {
        errors: state.errors,
        currentUser: state.session.currentUser
    };
};


const mDTP = dispatch => ({
    updateUser: formUser => dispatch(updateUser(formUser)),
    closeModal: () => dispatch(closeModal()),
    openModal: (modal) => dispatch(openModal(modal)),
    fetchUser: (userId) => {
        return dispatch(fetchUser(userId));
    }
});

export default withRouter(connect(mSTP, mDTP)(Uploader));