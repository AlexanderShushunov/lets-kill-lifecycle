import {all} from 'redux-saga/effects';
import {autofillEmail} from './autofillEmail';
import {switchBetweenPhones} from './switchBetweenPhones';
import {findOutIsVip} from './findOutIsVip';

export function* rootSaga() {
    yield all([
        autofillEmail(),
        switchBetweenPhones(),
        findOutIsVip()
    ]);
}
