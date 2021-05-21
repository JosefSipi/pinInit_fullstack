

export const fetchBoards = (userId) => {
    return $.ajax({
        method: 'GET',
        url: `/api/users/${userId}/boards`
    });
};