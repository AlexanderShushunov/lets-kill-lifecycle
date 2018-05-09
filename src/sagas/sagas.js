import {all} from 'redux-saga/effects';
import {autofillEmail} from './autofillEmail';
import {switchBetweenPhones} from './switchBetweenPhones';

export function* rootSaga() {
    yield all([
        autofillEmail(),
        switchBetweenPhones()
    ]);
}
