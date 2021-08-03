import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchBoard, updateBoard, deleteBoard, fetchBoards } from '../../actions/board_actions';
import { closeModal } from '../../actions/modal';
// import { deleteBoard } from '../../utils/board_utils';
import EditBoardShow from './edit_board';

const mSTP = (state) => {
    return{
        boards: state.boards
    }
}

const mDTP = dispatch => {
    return {
        closeModal: () => dispatch(closeModal()),

        fetchBoard: (boardId) => {
            return dispatch(fetchBoard(boardId));
        },
        updateBoard: (board) => {
            return dispatch(updateBoard(board))
        },
        deleteBoard: (boardId) => dispatch(deleteBoard(boardId)),
        fetchBoards: (userId) => dispatch(fetchBoards(userId))
    }
}

export default withRouter(connect(mSTP, mDTP)(EditBoardShow));