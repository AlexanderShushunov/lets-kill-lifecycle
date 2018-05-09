import {all} from 'redux-saga/effects';
import {autofillEmail} from './autofillEmail';

export function* rootSaga() {
    yield all([
        autofillEmail()
    ]);
}
