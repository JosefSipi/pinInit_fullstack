import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { closeModal } from "../../actions/modal";
import { fetchPin, updatePin, deletePin } from "../../actions/pin_action";
import { fetchBoards } from "../../actions/board_actions";
import EditPinShow from "./edit_pin";

const mSTP = (state) => {
  return {
    pin: state.pin,
    boards: state.boards,
  };
};

const mDTP = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    fetchPin: (pinId) => {
      return dispatch(fetchPin(pinId));
    },
    updatePin: (pin) => {
      return dispatch(updatePin(pin));
    },
    deletePin: (pinId) => dispatch(deletePin(pinId)),
    fetchBoards: (userId) => {
      return dispatch(fetchBoards(userId));
    },
  };
};

export default withRouter(connect(mSTP, mDTP)(EditPinShow));
