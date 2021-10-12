import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Feed from './feed'
import { fetchFeedPins } from '../../actions/pin_action'
import { fetchUsers } from '../../actions/user_actions'

const mSTP = state => {
    return {
        feed: state.feed.feed,
        currentUser: state.session.currentUser,
        numFollowers: state.session.currentUser.numFollows
    }
}

const mDTP = dispatch => {

    return {

        fetchFeedPins: (userId) => {
            return dispatch(fetchFeedPins(userId));
        },
        fetchUsers: () => {
            return dispatch(fetchUsers());
        }
    }

}

export default withRouter(connect(mSTP, mDTP)(Feed));