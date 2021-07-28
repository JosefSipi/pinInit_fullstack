
export const fetchPin = (pinId) => {
    debugger
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

export const updatePin = pinId => {
    debugger
    return $.ajax({
        method: 'PATCH',
        url: `api/pins/${pinId}`,
        data: {pin}
    });
};

export const deletePin = pinId => {
    debugger
    return $.ajax({
        method: 'DELETE',
        url: `api/pins/${pinId}`
    })
}