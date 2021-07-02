import * as APIUtil from '../utils/board_utils';


export const RECEIVE_BOARD = 'RECEIVE_BOARD';
export const RECEIVE_BOARDS = 'RECEIVE_BOARDS';

export const receiveBoard = board => {
    return {
        type: RECEIVE_BOARD,
        board
    };
};

export const receiveBoards = boards => {
    return {
        type: RECEIVE_BOARDS,
        boards
    };
};



export const fetchBoards = userId => {
    return (dispatch) => {
        return APIUtil.fetchBoards(userId)
            .then(boards => dispatch(receiveBoards(boards))); // posibly add in error handeling
    };
};

export const createNewBoard = formBoard => {
    return (dispatch) => {
        return APIUtil.createNewBoard(formBoard)
            .then(board => dispatch(receiveBoard(board))); // posibly add in error handeling
    }
}