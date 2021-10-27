import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SearchFeed from './search_feed';
import { searchFeedCall } from '../../actions/pin_action';

const mSTP = state => {
    return {
    }
}

const mDTP = dispatch => {
    return {
        searchFeedCall: (word) => {
            return dispatch(searchFeedCall(word));
        }
    }
}

export default withRouter(connect(mSTP, mDTP)(SearchFeed));