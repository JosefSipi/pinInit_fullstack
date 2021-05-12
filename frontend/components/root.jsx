import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import App from './app';

// not exactly sure how the store is being used on line 8 and how its connected to
// the use in index.jsx when the root component is instantiated

const Root =({ store }) => (
    <Provider store={store}>
        <HashRouter>
            <App store={store}/>
        </HashRouter>
    </Provider>
) 

export default Root;
