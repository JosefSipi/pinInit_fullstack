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

export const deleteComment = commentIds => {
    debugger
    return $.ajax({
        method: 'DELETE',
        url: `/api/pins/${commentIds.pinId}/comments/${commentIds.commentId}`
    })
}