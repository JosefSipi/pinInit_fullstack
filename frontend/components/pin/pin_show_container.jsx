import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPin } from '../../actions/pin_action';
import PinShow from './pin_show';
import { openModal } from '../../actions/modal';
import { newComment, fetchComments } from '../../actions/comment_actions';

const mSTP = (state) => {
    debugger
    return {
        pin: state.pin
    }
}

const mDTP = dispatch => {
    return{
        fetchPin: (pinId) => {
            return dispatch(fetchPin(pinId));
        },
        newComment: (comment) => {
            debugger
            return dispatch(newComment(comment))
        },
        fetchComments: pinId => {
            debugger
            return dispatch(fetchComments(pinId))
        },
        openModal: (modal) => dispatch(openModal(modal))
    }
}

export default withRouter(connect(mSTP, mDTP)(PinShow));