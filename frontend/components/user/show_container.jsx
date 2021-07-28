import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchUser } from '../../actions/user_actions';
import { fetchBoards } from '../../actions/board_actions';
import UserShow from './show';

import { openModal, closeModal } from '../../actions/modal';

const mSTP = state => {

    return {
        user: state.user,
        photo: state.photoUrl,
        // boards: Object.values(state.boards)
        boards: state.boards
    };
};

const mDTP = dispatch => ({
    openModal: (modal) => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal()),
    // return {
    fetchUser: (userId) => {
        return dispatch(fetchUser(userId));
    },
    fetchBoards: (userId) => {
        return dispatch(fetchBoards(userId));
    }
    // };
});


export default withRouter(connect(mSTP, mDTP)(UserShow));