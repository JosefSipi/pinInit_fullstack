import { RECEIVE_BOARDS, RECEIVE_BOARD, RECEIVE_BOARDSHOW } from '../actions/board_actions';

export default (state = {}, action) => {


    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_BOARDS:
            return action.boards;
        case RECEIVE_BOARD: {
            return Object.assign({}, state, {[action.board.id]: action.board})
        }
        case RECEIVE_BOARDSHOW: 
            return Object.assign({}, state, {displayBoard: action.board})
            // return action.board
        default:
            return state;
    }
};