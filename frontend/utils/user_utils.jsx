

export const fetchUser = (userId) => {
    return $.ajax({
        method: 'GET',
        url: `/api/users/${userId}`
    });
};

export const fetchUsers = (dataStuff) => {
    return $.ajax({
        method: 'GET',
        url: `/api/users`,
        data: {dataStuff}
    });
};



export const updateUser = (user) => {
    return $.ajax({
        method: 'PATCH',
        url: `/api/users/${'user.user[id]'}`,
        data: user,
        contentType: false,
        processData: false,
    });
};

export const updateUserInfo = (user) => {
    return $.ajax({
        method: 'PATCH',
        url: `api/users/${'user.user[id]'}`,
        data: {user}
    })
}

export const updateSearch = input => {
    return $.ajax({
        method: 'GET',
        url: '/api/users',
        data: {input}
    })
}