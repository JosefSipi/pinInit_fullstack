import { combineReducers } from 'redux';
import sessionReducer from './session';
// import entitiesReducer from './entities';
import uiReducer from './ui_reducer';


export default combineReducers({
    // entities: entitiesReducer,
    session: sessionReducer,
    ui: uiReducer,
});