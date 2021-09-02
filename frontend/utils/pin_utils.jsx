
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
        url: `/api/boards/${boardId}/pins`
    })
}

export const fetchFeedPins = userId => {
    return $.ajax({
        method: 'GET',
        url: `/api/users/${userId}/pins`
    })
}

export const updatePin = (pin) => {

    return $.ajax({
        method: 'PATCH',
        url: `api/pins/${pin.id}`,
        data: {pin}
    });
};

export const deletePin = pinId => {

    return $.ajax({
        method: 'DELETE',
        url: `api/pins/${pinId}`
    })
}