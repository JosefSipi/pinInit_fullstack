import React from 'react';
import { closeModal } from 'react-redux';
import { connect } from 'react-redux';
import EditBoardContainer from '../board/edit_board_container';
import { withRouter } from 'react-router-dom';

function Modal({ modal, closeModal}) {
    debugger
    if(!modal) {
        return null;
    }
    let renderModal;
    
    switch(modal) {
        case 'editBoard':
            renderModal = <EditBoardContainer />
            break;
    
        default:
            return null;
    }
    
    return(
        <div className="modal-background-create-b" onClick={closeModal}> 
            <div className="modal-child-create-b" onClick={e => e.stopPropagation()}>
                { renderModal }
            </div>
        </div>
    )
}


const mSTP = state => {
    return {
        modal: state.ui.modal
    }
}

const mDTP = dispatch => {
    return {
        closeModal: () => dispatch(closeModal())
    }
}

export default withRouter(connect(mSTP, mDTP)(Modal));