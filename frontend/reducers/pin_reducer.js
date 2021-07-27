import { RECEIVE_PIN, RECEIVE_PINS } from '../actions/pin_action';

export default (state = {}, action) => {
    debugger
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_PIN:
            return Object.assign({}, state, {pin: action.pin})
        case RECEIVE_PINS:
            return Object.assign({}, state, {pins: action.pins})
        default:
            return state;
    }
};