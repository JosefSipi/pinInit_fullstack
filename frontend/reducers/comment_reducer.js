import { RECEIVE_COMMENT } from '../actions/comment_actions';

export default (state = {}, action) => {

    Object.freeze(state);
    debugger
    switch (action.type){
        case RECEIVE_COMMENT:
            return Object.assign({}, state, {comments: action.comment})
        default:
            return state;
    }
}