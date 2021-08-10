import { combineReducers } from 'redux';
import sessionReducer from './session';
// import entitiesReducer from './entities';
import uiReducer from './ui_reducer';
import errorReducer from './error_reducer';
import userReducer from './user_reducer';
import boardReducer from './board_reducer';
import pinReducer from './pin_reducer';
import follow_reducer from './follow_reducer';


export default combineReducers({
    // entities: entitiesReducer,
    session: sessionReducer,
    ui: uiReducer,
    errors: errorReducer,
    user: userReducer,
    boards: boardReducer,
    pin: pinReducer,
    follow: follow_reducer,
});