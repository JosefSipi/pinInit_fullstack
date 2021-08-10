
export const isFollowing = follows => {
    debugger
    return $.ajax({
        method: 'GET',
        data: {follows},
        url: '/api/follows'
    })
}

export const fetchUserFollowing = (userId) => {
    debugger
    return $.ajax({
        method: 'GET',
        url: `/api/users/${userId}/follows`
    })
}

export const createFollow = follow => {
    debugger
    return $.ajax({
        method: 'POST',
        data: {follow: follow},
        url: '/api/follows'
    })
}

export const deleteFollow = deleteIds => {
    debugger
    return $.ajax({
        method: 'DELETE',
        url: `/api/follows/${deleteIds.id}`,
        data: {deleteIds}
    })
}