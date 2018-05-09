import React from 'react';
import ReactDOM from 'react-dom';
import {
    combineReducers,
    createStore,
    applyMiddleware
} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import {reducer as formReducer} from 'redux-form';
import {App} from './App';
import registerServiceWorker from './registerServiceWorker';
import {rootSaga} from './sagas';
import {vipStateReducer} from './vipState';

const sagaMiddleware = createSagaMiddleware();

let store = createStore(
    combineReducers({
        form: formReducer,
        vip: vipStateReducer
    }),
    composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    )
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
