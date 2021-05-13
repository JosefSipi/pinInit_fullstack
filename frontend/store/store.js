import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import thunk from '../thunk/thunk';
import roodReducer from '../reducers/root_reducer';

// not sure if i will need a preloadedState

const configureStore = (preloadedState = {}) => {
    return createStore(roodReducer, preloadedState, applyMiddleware(thunk));
};

export default configureStore;

