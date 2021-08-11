import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchUser } from '../../actions/user_actions';
import { fetchBoards } from '../../actions/board_actions';
import UserShow from './show';
import { isFollowing, fetchUserFollowing, createFollow, deleteFollow } from '../../actions/follow_action'; 

import { openModal, closeModal } from '../../actions/modal';

const mSTP = state => {
    debugger
    return {
        user: state.user,
        photo: state.photoUrl,
        // boards: Object.values(state.boards)
        boards: state.boards,
        follow: state.follow.usersFollowing,
        // following: state.follow.usersFollowing,
        // isFollowing: state.follow.usersFollowing
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
    },
    isFollowing: (info) => {
        // debugger
        return dispatch(isFollowing(info))
    },
    fetchUserFollowing: (userId) => {
        debugger
        return dispatch(fetchUserFollowing(userId))
    },
    createFollow: followForm => dispatch(createFollow(followForm)),
    unfollowUser: deleteIds => dispatch(deleteFollow(deleteIds))
    // };
});


export default withRouter(connect(mSTP, mDTP)(UserShow));