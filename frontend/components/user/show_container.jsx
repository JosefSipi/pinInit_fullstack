import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/user_actions';
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
        }
    };
};


export default connect(mSTP, mDTP)(User);