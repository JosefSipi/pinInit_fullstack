import { RECEIVE_FEED_PINS } from '../actions/pin_action';

export default (state = {}, action) => {

    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_FEED_PINS:
            return Object.assign({}, state, {feed: action.feed})
        default:
            return state;
        }

    }