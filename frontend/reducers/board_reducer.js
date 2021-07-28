import { RECEIVE_BOARDS, RECEIVE_BOARD, RECEIVE_BOARDSHOW, DELETED_BOARD } from '../actions/board_actions';

export default (state = {}, action) => {


    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_BOARDS:
            // return action.boards;
            return Object.assign({}, state, {boards: action.boards});
        case RECEIVE_BOARD: {
            return Object.assign({}, state, {[action.board.id]: action.board})
        }
        case RECEIVE_BOARDSHOW: 
            return Object.assign({}, state, {displayBoard: action.board})
            // return action.board

        case DELETED_BOARD:

            return state
        default:
            return state;
    }
};