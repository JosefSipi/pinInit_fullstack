import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPin } from '../../actions/pin_action';
import PinShow from './pin_show';
import { openModal } from '../../actions/modal';
import { newComment, fetchComments, deleteComment, editComment } from '../../actions/comment_actions';
import { deleteLike, createLike } from '../../actions/like_action';

const mSTP = (state) => {
        debugger
    return {
        pin: state.pin,
        comments: state.comment
        // ViewingUser: 
    }
}

const mDTP = dispatch => {
    return{
        fetchPin: (pinId) => {
            return dispatch(fetchPin(pinId));
        },
        newComment: (comment) => {
            return dispatch(newComment(comment))
        },
        fetchComments: pinId => {
            return dispatch(fetchComments(pinId))
        },
        openModal: (modal) => dispatch(openModal(modal)),
        deleteComment: (commentIds) => {
            return dispatch(deleteComment(commentIds))
        },
        editComment: (commentIds) => {
            
            return dispatch(editComment(commentIds))
        },
        deleteLike: (info) => {
            return dispatch(deleteLike(info))
        },
        createLike: (info) => {
            return dispatch(createLike(info))
        }
    }
}

export default withRouter(connect(mSTP, mDTP)(PinShow));