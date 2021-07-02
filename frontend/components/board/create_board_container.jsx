import { connect } from 'react-redux';
import CreateBoard from './create_board';
import { openModal, closeModal } from '../../actions/modal';
import { createNewBoard } from '../../actions/board_actions';
import { withRouter } from 'react-router';


const mSTP = state => ({
    errors: state.errors
})

const mDTP = dispatch => ({
    createNewBoard: (formBoard) => dispatch(createNewBoard(formBoard)),
    openModal: (modal) => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal())

})

export default withRouter(connect(mSTP, mDTP)(CreateBoard))