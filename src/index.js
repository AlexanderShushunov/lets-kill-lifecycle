import React from 'react';
import ReactDOM from 'react-dom';
import {
    applyMiddleware,
    combineReducers,
    createStore
} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import {createEpicMiddleware} from 'redux-observable';
import {reducer as formReducer} from 'redux-form';
import {App} from './App';
import registerServiceWorker from './registerServiceWorker';
import {rootEpic} from './epics';

const epicMiddleware = createEpicMiddleware();

let store = createStore(
    combineReducers({
        form: formReducer
    }),
    composeWithDevTools(
        applyMiddleware(epicMiddleware)
    )
);

epicMiddleware.run(rootEpic);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
