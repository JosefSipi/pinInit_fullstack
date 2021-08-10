import * as APIUtil from '../utils/follow_utils';

export const RECEIVE_FOLLOW_STATUS = 'RECEIVE_FOLLOW_STATUS';
export const RECIEVE_USERS_FOLLOWING = 'RECIEVE_USERS_FOLLOWING';
export const RECIEVE_DELETE_MESSAGE = 'RECIEVE_DELETE_MESSAGE';

export const recieveDeleteMessage = message => {
    debugger
    return {
        type: RECIEVE_DELETE_MESSAGE,
        message
    }
}

export const recieveFollowStatus = info => {
    debugger
    return {
        type: RECEIVE_FOLLOW_STATUS,
        info
    }
}

export const recieveUsersFollowing = UsersFollowing => {
    debugger
    return {
        type: RECIEVE_USERS_FOLLOWING,
        UsersFollowing
    }
}

export const isFollowing = info => {
    debugger
    return (dispatch) => {
        return APIUtil.isFollowing(info)
            .then(followInst => dispatch(recieveFollowStatus(followInst)))
    }
}

export const fetchUserFollowing = userId => {
    debugger
    return (dispatch) => {
        return APIUtil.fetchUserFollowing(userId)
            .then(following => dispatch(recieveUsersFollowing(following)))
    }
}

export const createFollow = follow => {
    return (dispatch) => {
        return APIUtil.createFollow(follow)
            .then(followStatus => dispatch(recieveFollowStatus(followStatus)))
    }
}

export const deleteFollow = deleteIds => {
    return (dispatch) => {
        return APIUtil.deleteFollow(deleteIds)
            .then( message => dispatch(recieveDeleteMessage(message)))
    }
}
