import {
    put,
    takeLatest,
    call
} from 'redux-saga/effects';
import {isLastNameChanging} from '../ContactForm';
import {isVipApiCall} from '../api';
import {setIsVip} from '../vipState';

export function* findOutIsVip() {
    yield takeLatest(
        isLastNameChanging,
        fetchIsVip
    );
}

function* fetchIsVip({payload: lastName}) {
    const isVip = yield call(
        isVipApiCall,
        lastName
    );
    yield put(setIsVip(isVip));
}
