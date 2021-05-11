import { createStore, applyMiddleware } from 'redux';
import thunk from '../thunk/thunk';
import roodReducer from '../reducers/root_reducer';

// not sure if i will need a preloadedState

const configureStore = () => {
    return createStore(roodReducer, applyMiddleware(thunk));
};

export default configureStore;

