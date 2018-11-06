import React from 'react';
import ReactDOM from 'react-dom';
import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import {SubstateProvider} from 'use-substate';
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
    <SubstateProvider value={store}>
        <Provider store={store}>
            <App />
        </Provider>
    </SubstateProvider>,
    document.getElementById('root')
);
registerServiceWorker();
