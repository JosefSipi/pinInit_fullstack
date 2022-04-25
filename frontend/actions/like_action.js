import * as APIUtil from "../utils/like_utils";

export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
// export const RECEIVE_LIKES = 'RECEIVE_LIKES'

export const receiveMessage = (message) => {
  return {
    type: RECEIVE_MESSAGE,
    message,
  };
};

// export const receiveLikes = likes => {
//     return {
//         type: RECEIVE_LIKES,
//         likes
//     }
// }

export const deleteLike = (id) => {
  return (dispatch) => {
    return APIUtil.deleteLike(id).then((message) =>
      dispatch(receiveMessage(message))
    );
  };
};

export const createLike = (info) => {
  return (dispatch) => {
    return APIUtil.createLike(info).then((message) =>
      dispatch(receiveMessage(message))
    );
    // .then(likes => dispatch(receiveLikes(likes)))
  };
};
