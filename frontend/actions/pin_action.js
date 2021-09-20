import * as APIUtil from '../utils/pin_utils';

export const RECEIVE_PIN = 'RECEIVE_PIN';
export const RECEIVE_PINS = 'RECEIVE_PINS';
export const RECEIVE_FEED_PINS = 'RECEIVE_FEED_PINS';

export const receivePin = pin => {
    return {
        type: RECEIVE_PIN,
        pin
    }
}

export const receivePins = pins => {
    return {
        type: RECEIVE_PINS,
        pins
    }
}

export const receiveFeedPins = feed => {
    return {
        type: RECEIVE_FEED_PINS,
        feed
    }
}

export const createNewPin = pinForm => {
    return (dispatch) => {
        return APIUtil.createNewPin(pinForm)
            .then(pin => dispatch(receivePin(pin)));
    }
}

export const fetchPins = boardId => {
    return (dispatch) => {
        return APIUtil.fetchPins(boardId)
            .then(pins => dispatch(receivePins(pins)));
    }
}

export const fetchFeedPins = userId => {
    return (dispatch) => {
        return APIUtil.fetchFeedPins(userId)
            .then(feed => dispatch(receiveFeedPins(feed)));
    }
}

export const fetchPin = pinId => {
    return  (dispatch) => {
        return APIUtil.fetchPin(pinId)
            .then(pin => dispatch(receivePin(pin)));
    }
}

export const updatePin = (pinUpdate) => {
    return (dispatch) => {
        return APIUtil.updatePin(pinUpdate)
            .then(pin => dispatch(receivePin(pin)));
    }
}

export const deletePin = pinId => {
    return (dispatch) => {
        return APIUtil.deletePin(pinId)
            .then(deleteInfo => dispatch(deletePin(deleteInfo)));
    }
}