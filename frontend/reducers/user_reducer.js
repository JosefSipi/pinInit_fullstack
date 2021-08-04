import { RECEIVE_USER, RECEIVE_USERS } from '../actions/user_actions';

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_USER:
            return Object.assign({}, state, action.user)
            // return action.user;
        case RECEIVE_USERS:
            return Object.assign({}, state, {searchUsers: action.users})
        default:
            return state;
    }
};


