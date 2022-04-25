import React from "react";
import { closeModal } from "../../actions/modal";
import { connect } from "react-redux";
import EditPinContainer from "../pin/edit_pin_container";
import { withRouter } from "react-router-dom";

function Modal({ modal, closeModal }) {
  if (!modal) {
    return null;
  }

  let renderModal;

  switch (modal) {
    case "editPin":
      renderModal = <EditPinContainer />;
      break;
    default:
      return null;
  }

  return (
    <div className="modal-background-edit-pin" onClick={closeModal}>
      <div
        className="modal-child-edit-pin"
        onClick={(e) => e.stopPropagation()}
      >
        {renderModal}
      </div>
    </div>
  );
}

const mSTP = (state) => {
  return {
    modal: state.ui.modal,
  };
};

const mDTP = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
  };
};

export default withRouter(connect(mSTP, mDTP)(Modal));
