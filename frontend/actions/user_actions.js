import * as APIUtil from "../utils/user_utils";


export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USERS = "RECEIVE_USERS";

export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
const receiveErrors = (errors) => ({
    type: RECEIVE_ERRORS,
    errors
});

export const receiveUser = user => {
    return {
        type: RECEIVE_USER,
        user
    };
};

export const receiveUsers = users => {
    return {
        type: RECEIVE_USERS,
        users
    }
}


export const fetchUser = userId => {
    return (dispatch) => {
        return APIUtil.fetchUser(userId)
            .then((userinfo) => dispatch(receiveUser(userinfo)));
    };
};

export const updateUser = user => {

    return (dispatch) => {
        return APIUtil.updateUser(user)
            .then(user => dispatch(receiveUser(user)));
    };
};

export const updateSearch = input => {
    debugger
    return(dispatch) => {
        return APIUtil.updateSearch(input)
            .then(user => dispatch(receiveUsers(user)),  err => dispatch(receiveErrors(err.responseJSON)));
    }
}