import { connect } from 'react-redux';
import { createNewUser } from '../../actions/session';
import SignUp from './signup';
import { closeModal, openModal } from '../../actions/modal';
import { withRouter } from 'react-router-dom';


const mSTP = state => {
   return{
       errors: state.errors
   };
};


const mDTP = dispatch => ({
    createNewUser: formUser => dispatch(createNewUser(formUser)),
    closeModal: () => dispatch(closeModal()),
    openModal: (modal) => dispatch(openModal(modal))
});

export default withRouter(connect(mSTP, mDTP)(SignUp));
