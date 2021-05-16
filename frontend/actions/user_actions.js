import * as APIUtil from "../utils/user_utils";


export const RECEIVE_USER = "RECEIVE_USER";


export const receiveUser = user => {
    return {
        type: RECEIVE_USER,
        user
    };
};



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