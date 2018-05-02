import React from 'react';
import ReactDOM from 'react-dom';
import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import {devToolsEnhancer} from 'redux-devtools-extension';
import {App} from './App';
import registerServiceWorker from './registerServiceWorker';

let store = createStore(
    combineReducers({
        foo: state => state || {}
    }),
    devToolsEnhancer()
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
