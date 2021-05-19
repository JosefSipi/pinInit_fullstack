import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchUser } from '../../actions/user_actions';
import UserShow from './show';


const mSTP = state => {
    return {
        user: state.user,
        photo: state.photoUrl
    };
};

const mDTP = dispatch => {
    return {
        fetchUser: (userId) => {
            return dispatch(fetchUser(userId));
        },
        
    };
};


export default withRouter(connect(mSTP, mDTP)(UserShow));