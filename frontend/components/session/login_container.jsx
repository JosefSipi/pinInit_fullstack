import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/session';
import LogIn from './login';


const mDTP = dispatch => ({
    login: (userForm) => dispatch(login(userForm))
});

export default connect(null, mDTP)(LogIn);