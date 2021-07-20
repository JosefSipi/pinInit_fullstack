import * as APIUtil from '../utils/board_utils';


export const RECEIVE_BOARD = 'RECEIVE_BOARD';
export const RECEIVE_BOARDSHOW = 'RECEIVE_BOARDSHOW';
export const RECEIVE_BOARDS = 'RECEIVE_BOARDS';
export const DELETED_BOARD = 'DELETED_BOARD';

export const receiveBoard = board => {
    return {
        type: RECEIVE_BOARD,
        board
    };
};

export const receiveBoardShow = board => {
    return {
        type: RECEIVE_BOARDSHOW,
        board
    };
};

export const receiveBoards = boards => {
    return {
        type: RECEIVE_BOARDS,
        boards
    };
};

export const deletedBoard = message => {
    return {
        type: DELETED_BOARD,
        message
    };
};



export const fetchBoards = userId => {
    return (dispatch) => {
        return APIUtil.fetchBoards(userId)
            .then(boards => dispatch(receiveBoards(boards))); // posibly add in error handeling
    };
};

export const fetchBoard = boardId => {
    return (dispatch) => {
        return APIUtil.fetchBoard(boardId)
            .then(board => dispatch(receiveBoardShow(board)));
    }
}


export const createNewBoard = formBoard => {
    return (dispatch) => {
        return APIUtil.createNewBoard(formBoard)
            .then(board => dispatch(receiveBoard(board))); // posibly add in error handeling
    }
}

export const updateBoard = board => {
    return (dispatch) => {
        return APIUtil.updateBoard(board)
            .then(board => dispatch(receiveBoard(board)));
    }
}

export const deleteBoard = boardId => {
    return (dispatch) => {
        return APIUtil.deleteBoard(boardId)
            .then(deletedInfo => dispatch(deletedBoard(deletedInfo)));
    }
}