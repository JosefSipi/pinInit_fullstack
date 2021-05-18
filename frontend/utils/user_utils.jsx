

export const fetchUser = (userId) => {
    return $.ajax({
        method: 'GET',
        url: `/api/users/${userId}`
    });
};

export const updateUser = (user) => {
    debugger
    return $.ajax({
        method: 'PATCH',
        url: `/api/users/${user.id}`,
        data: user,
        contentType: false,
        processData: false,
    });
};