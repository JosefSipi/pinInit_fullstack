import { RECEIVE_PIN } from '../actions/pin_action';

export default (state = {}, action) => {
    debugger
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_PIN:
            return Object.assign({}, state, {pin: action.pin})
        default:
            return state;
    }
};