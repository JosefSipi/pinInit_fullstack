import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchBoards } from '../../actions/board_actions';
import BoardShow from './show_board';


const mSTP = (state) => {
    debugger
    return {
        boards: state.boards
    };
};

const mDTP = dispatch => {
    return {
        fetchBoards: (userId) => {
            return dispatch(fetchBoards(userId));
        }
    };
};

// what i'm going to need availabler
// - fetch info for each bord for this specific user

export default withRouter(connect(mSTP, mDTP)(BoardShow));