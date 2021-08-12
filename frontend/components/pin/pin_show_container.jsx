import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPin } from '../../actions/pin_action';
import PinShow from './pin_show';

const mSTP = (state) => {
    return {
        pin: state.pin
    }
}

const mDTP = dispatch => {
    return{
        fetchPin: (pinId) => {
            return dispatch(fetchPin(pinId));
        }
    }
}

export default withRouter(connect(mSTP, mDTP)(PinShow));