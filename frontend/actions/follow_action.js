import * as APIUtil from "../utils/follow_utils";

export const RECEIVE_FOLLOW_STATUS = "RECEIVE_FOLLOW_STATUS";
export const RECIEVE_USERS_FOLLOWING = "RECIEVE_USERS_FOLLOWING";
export const RECIEVE_DELETE_MESSAGE = "RECIEVE_DELETE_MESSAGE";
export const RECIEVE_NUM_FOLLOWING = "RECIEVE_NUM_FOLLOWING";

export const recieveDeleteMessage = (message) => {
  return {
    type: RECIEVE_DELETE_MESSAGE,
    message,
  };
};

export const recieveNumFollowing = (num) => {
  return {
    type: RECIEVE_NUM_FOLLOWING,
    num,
  };
};

export const recieveFollowStatus = (info) => {
  return {
    type: RECEIVE_FOLLOW_STATUS,
    info,
  };
};

export const recieveUsersFollowing = (UsersFollowInfo) => {
  //
  return {
    type: RECIEVE_USERS_FOLLOWING,
    UsersFollowInfo,
  };
};

export const isFollowing = (info) => {
  //
  return (dispatch) => {
    return APIUtil.isFollowing(info).then((followInst) =>
      dispatch(recieveFollowStatus(followInst))
    );
  };
};

export const fetchUserFollowing = (userId) => {
  return (dispatch) => {
    return APIUtil.fetchUserFollowing(userId).then((following) =>
      dispatch(recieveUsersFollowing(following))
    );
  };
};

export const numFollowing = (id) => {
  return (dispatch) => {
    return APIUtil.numFollowing(id).then((num) => {
      dispatch(recieveNumFollowing(num));
    });
  };
};

export const createFollow = (follow) => {
  return (dispatch) => {
    return APIUtil.createFollow(follow).then((followingStat) =>
      dispatch(recieveFollowStatus(followingStat))
    );
  };
};

export const deleteFollow = (deleteIds) => {
  return (dispatch) => {
    return APIUtil.deleteFollow(deleteIds).then((message) =>
      dispatch(recieveDeleteMessage(message))
    );
  };
};
