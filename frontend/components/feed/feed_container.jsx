import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Feed from './feed'
import { fetchFeedPins } from '../../actions/pin_action'

const mSTP = state => {
    debugger
    return {
        feed: state.feed.feed,
        currentUser: state.session.currentUser
    }
}

const mDTP = dispatch => {
        debugger
    return {

        fetchFeedPins: (userId) => {
            return dispatch(fetchFeedPins(userId));
        }
    }

}

export default withRouter(connect(mSTP, mDTP)(Feed));