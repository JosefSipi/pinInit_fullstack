import { createStore, applyMiddleware } from 'redux';
// import logger from 'redux-logger';
import thunk from 'redux-thunk';
import roodReducer from '../reducers/root_reducer';


const configureStore = (preloadedState = {}) => {
    return createStore(roodReducer, preloadedState, applyMiddleware(thunk));
    // return createStore(roodReducer, preloadedState, applyMiddleware(thunk, logger));
};

export default configureStore;

