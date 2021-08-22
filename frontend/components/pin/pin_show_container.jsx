import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPin } from '../../actions/pin_action';
import PinShow from './pin_show';
import { openModal } from '../../actions/modal';

const mSTP = (state) => {
    return {
        pin: state.pin
    }
}

const mDTP = dispatch => {
    return{
        fetchPin: (pinId) => {
            return dispatch(fetchPin(pinId));
        },
        
        openModal: (modal) => dispatch(openModal(modal))
    }
}

export default withRouter(connect(mSTP, mDTP)(PinShow));