import { RECEIVE_BOARDS } from '../actions/board_actions';

export default (state = {}, action) => {


    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_BOARDS:
            return action.boards;
        default:
            return state;
    }
};