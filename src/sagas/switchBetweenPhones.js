import {
    put,
    takeEvery,
    select
} from 'redux-saga/effects';
import {
    changePhone,
    getPhone,
    isEmployedChanging
} from '../ContactForm';

const tempValues = {};

export function* switchBetweenPhones() {
    yield takeEvery(
        isEmployedChanging,
        worker
    );
}

function* worker({meta: {form}}) {
    const phone = yield select(getPhone);
    yield put(
        changePhone(tempValues[form] || '')
    );
    tempValues[form] = phone;
}
