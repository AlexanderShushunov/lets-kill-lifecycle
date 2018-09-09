import {
    put,
    takeEvery,
    select
} from 'redux-saga/effects';
import {
    changeEmail,
    isFirstNameChanging,
    isNotEmailTouched
} from '../ContactForm';

export function* autofillEmail() {
    yield takeEvery(
        isFirstNameChanging, worker
    );
}

export function* worker({payload: firstName}) {
    const shouldAutofill = yield select(
        isNotEmailTouched
    );
    if (shouldAutofill) {
        yield put(
            changeEmail(calcEmail(firstName))
        );
    }
}

const calcEmail = firstName => {
    if (!firstName) {
        return '';
    }
    return `${firstName}@hotmail.com`;
};
