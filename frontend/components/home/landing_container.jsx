import { connect } from "react-redux";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import Landing from "../home/landing";

const mSTP = (state) => {
  return {
    user: state.user,
  };
};

const mDTP = (dispatch) => {
  return {};
};

export default withRouter(connect(mSTP, mDTP)(Landing));
