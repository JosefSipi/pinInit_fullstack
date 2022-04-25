import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import NavBar from "./nav_bar";
import { openModal, closeModal } from "../../actions/modal";
import { logout } from "../../actions/session";
import { fetchUser } from "../../actions/user_actions";
import { updateSearch, fetchUserProfile } from "../../actions/user_actions";
import { searchFeedCall } from "../../actions/pin_action";

const mSTP = (state) => {
  return {
    currentUser: state.session.currentUser,
    user: state.user,
    users: state.user.searchUsers,
    logedInUser: state.session.currentUSer,
  };
};

const mDTP = (dispatch) => ({
  logout: () => dispatch(logout()),
  openModal: (modal) => dispatch(openModal(modal)),
  closeModal: () => dispatch(closeModal()),
  fetchUser: (userId) => {
    return dispatch(fetchUser(userId));
  },
  updateSearch: (input) => {
    //
    return dispatch(updateSearch(input));
  },
  fetchUserProfile: (userId) => {
    return dispatch(fetchUserProfile(userId));
  },
  searchFeedCall: (word) => {
    return dispatch(searchFeedCall(word));
  },
});

export default withRouter(connect(mSTP, mDTP)(NavBar));
