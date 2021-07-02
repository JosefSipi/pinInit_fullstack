
export const createNewBoard = (creatForm) => {
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

