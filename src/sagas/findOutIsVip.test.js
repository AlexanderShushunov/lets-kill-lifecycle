// see https://github.com/redux-saga/redux-saga/blob/master/docs/advanced/Testing.md#testing-the-saga-generator-function
import {fetchIsVip} from './findOutIsVip';
import {put, call} from 'redux-saga/effects';
import {isVipApiCall} from '../api';
import {setIsVip} from '../vipState';

describe('fetchIsVip', () => {
    test('should call api and put result to store', () => {
        const fetchIsVipIterator = fetchIsVip({
            payload: 'lastName'
        });
        expect(
            fetchIsVipIterator.next().value
        ).toEqual(call(isVipApiCall, 'lastName'));
        expect(
            fetchIsVipIterator.next(true).value
        ).toEqual(put(setIsVip(true)));
    });
});
