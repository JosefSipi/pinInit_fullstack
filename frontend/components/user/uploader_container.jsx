import { connect } from 'react-redux';
import { updateUser } from '../../actions/user_actions';
import Uploader from './uploader';
import { closeModal, openModal } from '../../actions/modal';
import { withRouter } from 'react-router-dom';


const mSTP = state => {
    return {
        errors: state.errors
    };
};


const mDTP = dispatch => ({
    updateUser: formUser => dispatch(updateUser(formUser)),
    closeModal: () => dispatch(closeModal()),
    openModal: (modal) => dispatch(openModal(modal))
});

export default withRouter(connect(mSTP, mDTP)(Uploader));