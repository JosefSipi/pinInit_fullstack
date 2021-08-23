export const newComment = comment => {
    debugger
    return $.ajax({
        method: 'POST',
        url: '/api/comments',
        data: {comment}
    })
}

export const fetchComments = pinId => {
    debugger
    return $.ajax({
        method: 'GET',
        url: `/api/pins/${pinId}/comments`
    })
}