import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Feed from './feed'
import { fetchFeedPins } from '../../actions/pin_action'

const mSTP = state => ({
    feed: state.feed

})

const mDTP = dispatch => {
    return {

        fetchFeedPins: (userId) => {
            debugger
            return dispatch(fetchFeedPins(userId));
        }
    }

}

export default withRouter(connect(mSTP, mDTP)(Feed));