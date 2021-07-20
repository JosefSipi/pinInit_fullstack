import * as APIUtil from '../utils/pin_utils';

export const RECEIVE_PIN = 'RECEIVE_PIN';

export const receivePin = pin => {
    debugger
    return {
        type: RECEIVE_PIN,
        pin
    }
}

export const createNewPin = pinForm => {
    debugger
    return (dispatch) => {
        return APIUtil.createNewPin(pinForm)
            .then(pin => dispatch(receivePin(pin)));
    }
}