import { RECEIVE_ERRORS, RECEIVE_ERRORS_LOGIN, RECEIVE_ERRORS_SIGNUP } from '../actions/session';

export default (state = [], action) => {

    Object.freeze(state);

    switch (action.type) {
        // case RECEIVE_ERRORS:
        //     return action.errors;
        case RECEIVE_ERRORS_SIGNUP:
            // return action.errors_sign_up;
            return Object.assign({}, state, {errors_sign_up: action.errors_sign_up})
            case RECEIVE_ERRORS_LOGIN:
                // return action.errors_log_in;
                return Object.assign({}, state, {errors_log_in: action.errors_log_in})
        default:
            return state;
    }
};
