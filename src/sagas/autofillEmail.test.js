// see https://github.com/redux-saga/redux-saga/blob/master/docs/advanced/Testing.md#testing-the-saga-generator-function
import {worker} from './autofillEmail';
import {put} from 'redux-saga/effects';
import {cloneableGenerator} from 'redux-saga/utils';
import {changeEmail} from '../ContactForm';

describe('autofillEmail worker', () => {
    const workerIterator = cloneableGenerator(
        worker
    )({
        payload: 'name'
    });
    workerIterator.next(); // select

    test('should not change email, if email field was touched', () => {
        const clone = workerIterator.clone();
        expect(clone.next(false).done).toBe(true);
    });

    test('should change email, if email field was not touched', () => {
        const clone = workerIterator.clone();
        expect(clone.next(true).value).toEqual(
            put(changeEmail('name@hotmail.com'))
        );
    });
});
