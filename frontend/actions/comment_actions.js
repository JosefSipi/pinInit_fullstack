import * as APIUtil from "../utils/comment_utils";

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";

export const receiveComments = (comments) => {
  return {
    type: RECEIVE_COMMENTS,
    comments,
  };
};

export const receiveComment = (comment) => {
  return {
    type: RECEIVE_COMMENT,
    comment,
  };
};

export const receiveMessage = (message) => {
  return {
    type: RECEIVE_MESSAGE,
    message,
  };
};

export const newComment = (comment) => {
  return (dispatch) => {
    return APIUtil.newComment(comment).then((message) =>
      dispatch(receiveMessage(message))
    );
  };
};

export const fetchComments = (pinId) => {
  return (dispatch) => {
    return APIUtil.fetchComments(pinId).then((comments) =>
      dispatch(receiveComments(comments))
    );
  };
};

export const deleteComment = (commentIds) => {
  return (dispatch) => {
    return APIUtil.deleteComment(commentIds).then((message) =>
      dispatch(receiveMessage(message))
    );
  };
};

export const editComment = (commentIds) => {
  return (dispatch) => {
    return APIUtil.editComment(commentIds).then((comment) =>
      dispatch(receiveMessage(comment))
    );
  };
};
