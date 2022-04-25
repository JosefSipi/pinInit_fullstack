import {
  RECEIVE_FEED_PINS,
  RECEIVE_PINS_SEARCHED,
} from "../actions/pin_action";

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_FEED_PINS:
      return Object.assign({}, state, { feed: action.feed });
    case RECEIVE_PINS_SEARCHED:
      return Object.assign({}, state, { searchPins: action.pins });
    default:
      return state;
  }
};
