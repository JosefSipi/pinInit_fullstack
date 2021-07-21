
export const fetchPin = (pinId) => {
    return $.ajax({
        method: 'GET',
        url: `/api/pins/${pinId}`
    })
}

export const createNewPin = (pinForm ) => {
    debugger
    return $.ajax({
        method: 'POST',
        url: '/api/pins',
        data: pinForm,
        contentType: false,
        processData: false,
    })
}

