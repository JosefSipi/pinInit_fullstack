import { Link } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";

const mSTP = (state) => {
  return {
    loggedIn: Boolean(state.session.currentUser),
  };
};

const CreatePinLink = (state) => {
  return state.loggedIn &&
  <div className="logo-on-logged-in-header-plus-allpage">
    <Link className="link-thing-plus" to="/pin-create">
      {" "}
      <img
        className="the-big-plus-in-corner"
        src={window.plusSignURL}
        alt="+"
      />{" "}
    </Link>
  </div>
};

export default connect(mSTP)(CreatePinLink);
