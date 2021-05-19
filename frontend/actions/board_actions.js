import * as APIUtil from '../utils/board_utils';


// export const RECEIVE_BOARD = 'RECEIVE_BOARD';
export const RECEIVE_BOARDS = 'RECEIVE_BOARDS';

// export const reveiveBoard = board => {
//     return {
//         type: RECEIVE_BOARD,
//         board
//     };
// };

export const receiveBoards = boards => {
    return {
        type: RECEIVE_BOARDS,
        boards
    };
};

// export const fetchBoard = userId => {
//     return (dispatch) => {
//         return APIUtil.fetchBoard(userId)
//     }
// }