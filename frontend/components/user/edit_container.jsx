import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateUser, fetchUser } from '../../actions/user_actions';
import EditForm from './edit_form';

const mSTP = state => {
    return {
       
    };
};

const mDTP = dispatch => {
    return {
        updateUser: (user) => {
            return dispatch(updateUser(user));
        },
        fetchUser: (userId) => {
            return dispatch(fetchUser(userId));
        }
    };
};


export default withRouter(connect(mSTP, mDTP)(EditForm));