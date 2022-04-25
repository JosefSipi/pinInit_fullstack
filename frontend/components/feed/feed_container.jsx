import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Feed from "./feed";
import { fetchFeedPins } from "../../actions/pin_action";
import { fetchUsers } from "../../actions/user_actions";
import {
  createFollow,
  deleteFollow,
  numFollowing,
} from "../../actions/follow_action";

const mSTP = (state) => {
  return {
    feed: state.feed.feed,
    currentUser: state.session.currentUser,
    numFollowers: state.follow.numFollowing,
    usersFollowed: state.user.usersIndex,
  };
};

const mDTP = (dispatch) => {
  return {
    fetchFeedPins: (userId) => {
      return dispatch(fetchFeedPins(userId));
    },
    fetchUsers: (dataStuff) => {
      return dispatch(fetchUsers(dataStuff));
    },
    createFollow: (followForm) => dispatch(createFollow(followForm)),
    unfollowUser: (deleteIds) => dispatch(deleteFollow(deleteIds)),
    numFollowing: (id) => {
      return dispatch(numFollowing(id));
    },
  };
};

export default withRouter(connect(mSTP, mDTP)(Feed));
