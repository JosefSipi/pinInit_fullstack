import { connect } from 'react-redux';
import CreatePin from './create_pin';
import { createNewPin } from '../../actions/pin_action';
import { fetchUser } from '../../actions/user_actions';
import { withRouter } from 'react-router';
import { fetchBoards } from '../../actions/board_actions';

const mSTP = state => {
    return {
        user: state.user,
        boards: Object.values(state.boards)
    }
}

const mDTP = dispatch => {
    return {
        createNewPin: (pinForm) => dispatch(createNewPin(pinForm)),
    
        fetchUser: (userId) => dispatch(fetchUser(userId)),

        fetchBoards: (userId) => dispatch(fetchBoards(userId))
    }
}

export default withRouter(connect(mSTP, mDTP)(CreatePin))