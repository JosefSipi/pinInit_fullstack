
export const fetchPin = (pinId) => {
    return $.ajax({
        method: 'GET',
        url: `/api/pins/${pinId}`
    })
}

export const createNewPin = (pinForm ) => {
    return $.ajax({
        method: 'POST',
        url: '/api/pins',
        data: pinForm,
        contentType: false,
        processData: false,
    })
}

export const fetchPins = boardId => {
    return $.ajax({
        method: 'GET',
        url: `api/boards/${boardId}/pins`
    })
}