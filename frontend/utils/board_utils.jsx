
export const createNewBoard = (creatForm) => {
    // debugger

    return $.ajax({
        method: 'POST',
        data: {board: creatForm},
        url: `/api/boards`
    })
}

export const fetchBoards = (userId) => {
    return $.ajax({
        method: 'GET',
        url: `/api/users/${userId}/boards`
    });
};

export const fetchBoard = (boardId) => {
    return $.ajax({
        method: 'GET',
        url: `/api/boards/${boardId}`
    })
}

