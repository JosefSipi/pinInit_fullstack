import { RECEIVE_BOARDS, RECEIVE_BOARD } from '../actions/board_actions';

export default (state = {}, action) => {


    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_BOARDS:
            return action.boards;
        case RECEIVE_BOARD: {
            return action.board
        }
        default:
            return state;
    }
};