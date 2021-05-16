import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import roodReducer from '../reducers/root_reducer';


const configureStore = (preloadedState = {}) => {
    return createStore(roodReducer, preloadedState, applyMiddleware(thunk));
};

export default configureStore;

