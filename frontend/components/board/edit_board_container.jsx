import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchBoard, updateBoard } from '../../actions/board_actions';
import EditBoardShow from './edit_board';

const mSTP = (state) => {
    debugger
    return{
        board: state.board
    }
}

const mDTP = dispatch => {
    return {
        fetchBoard: (boardId) => {
            return dispatch(fetchBoard(boardId));
        },
        updateBoard: (board) => {
            return dispatch(updateBoard(board))
        }
    }
}

export default withRouter(connect(mSTP, mDTP)(EditBoardShow));