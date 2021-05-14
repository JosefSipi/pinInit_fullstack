import React from 'react';
import { connect } from 'react-redux';
import { updateUser, fetchUser } from '../../actions/user_actions';
import User from './show';


const mSTP = state => {
    return {
        user: state.user
    };
};

const mDTP = dispatch => {
    return {
        fetchUser: (userId) => {
            return dispatch(fetchUser(userId));
        },
        updateUser: (user) => {
            return dispatch(updateUser(user));
        }
    };
};


export default connect(mSTP, mDTP)(User);
