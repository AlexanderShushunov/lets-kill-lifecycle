import React from 'react';
import ReactDOM from 'react-dom';
import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import {devToolsEnhancer} from 'redux-devtools-extension';
import {reducer as formReducer} from 'redux-form';
import {App} from './App';
import registerServiceWorker from './registerServiceWorker';

let store = createStore(
    combineReducers({
        form: formReducer
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
