import { connect } from 'react-redux';
import CreateBoard from './create_board';
import { openModal, closeModal } from '../../actions/modal';
import { createNewBoard, fetchBoards } from '../../actions/board_actions';
import { fetchUser } from '../../actions/user_actions';
import { withRouter } from 'react-router-dom';


const mSTP = state => ({
    errors: state.errors,
    boards: Object.values(state.boards)
})

const mDTP = dispatch => ({
    createNewBoard: (formBoard) => dispatch(createNewBoard(formBoard)),
    openModal: (modal) => dispatch(openModal(modal)),

    closeModal: () => dispatch(closeModal()),
    
    fetchUser: (userId) => {
        return dispatch(fetchUser(userId));
    },
    fetchBoards: (userId) => {
        return dispatch(fetchBoards(userId));
    },
    fetchUser: (userId) => {
        return dispatch(fetchUser(userId));
    },

})

export default withRouter(connect(mSTP, mDTP)(CreateBoard))