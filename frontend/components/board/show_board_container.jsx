import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchBoards, fetchBoard } from '../../actions/board_actions';
import { fetchUser, fetchUserProfile } from '../../actions/user_actions';
import { fetchPins } from '../../actions/pin_action';
import BoardShow from './show_board';
import { openModal, closeModal } from '../../actions/modal';

const mSTP = (state) => {
    debugger
    return {
        boards: state.boards,
        boardProfile: state.boards.displayBoard,
        userProfile: state.user.profileUser,
        pins: state.pin
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
        },
        fetchUserProfile: (userId) => {
            return dispatch(fetchUserProfile(userId))
        },
        fetchPins: (boardId) => {
            return dispatch(fetchPins(boardId))
        },
        openModal: (modal) => dispatch(openModal(modal)),
        closeModal: () => dispatch(closeModal())
    };
};

export default withRouter(connect(mSTP, mDTP)(BoardShow));