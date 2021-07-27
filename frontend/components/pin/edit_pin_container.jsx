import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { closeModal } from '../../actions/modal';
import { fetchPin, updatePin, deletePin } from '../../actions/pin_action';
import EditPinShow from './edit_pin';

const mSTP = (state) => {
    debugger
    return{
        pins: state.pins
    }
}

const mDTP = dispatch => {
    return{
        closeModal: () => dispatch(closeModal()),
        fetchPin: (pinId) => {
            return dispatch(fetchPin(pinId));
        },
        updatePin: (pin) => {
            return dispatch(updatePin(pin));
        },
        deletePin: (pinId) => dispatch(deletePin(pinId))
        
    }
}

export default withRouter(connect(mSTP, mDTP)(EditPinShow));