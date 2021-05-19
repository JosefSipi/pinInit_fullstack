import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BoardShow from './show_board';


const mSTP = state => {
    return {
        
    };
};

const mDTP = dispatch => {
    return {
        fetchBoards: (userId) => {
            return dispatch(fetchBoards(userId));
        }
    };
};


export default withRouter(connect(mSTP, mDTP)(BoardShow));