import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchBoards, fetchBoard } from '../../actions/board_actions';
import { fetchUser } from '../../actions/user_actions';
import BoardShow from './show_board';


const mSTP = (state) => {
    return {
        boards: state.boards,
        boardProfile: state.boards.displayBoard,
        userProfile: state.user
    };
};

const mDTP = dispatch => {
    return {
        fetchBoards: (userId) => {
            return dispatch(fetchBoards(userId));
        },
        fetchBoard: (boardId) => {
            return dispatch(fetchBoard(boardId));
        },
        fetchUser: (userId) => {
            return dispatch(fetchUser(userId));
        }
    };
};

export default withRouter(connect(mSTP, mDTP)(BoardShow));