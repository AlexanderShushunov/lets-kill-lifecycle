// see https://github.com/redux-saga/redux-saga/blob/master/docs/advanced/Testing.md#testing-the-full-saga
import {runSaga} from 'redux-saga';
import {switchBetweenPhones} from './switchBetweenPhones';
import {change} from 'redux-form';

const noop = () => {};

const createStoreEmulator = (initial = {}) => {
    const dispatchedActions = [];
    let pushActionToMiddleware = noop;
    const store = {
        subscribe: callback => {
            pushActionToMiddleware = callback;
            return () =>
                (pushActionToMiddleware = noop);
        },
        dispatch: action =>
            dispatchedActions.push(action),
        getState: () => initial
    };
    return {
        store,
        dispatchedActions,
        pushActionToMiddleware: action =>
            pushActionToMiddleware(action) // too save context
    };
};

describe('switchBetweenPhones', () => {
    test('should change phone if employed was been changed or restore it', () => {
        const emulator = createStoreEmulator({
            form: {
                ContactForm: {
                    values: {
                        phone: '911'
                    }
                }
            }
        });

        runSaga(
            emulator.store,
            switchBetweenPhones
        );

        emulator.pushActionToMiddleware(
            change(
                'ContactForm',
                'employed',
                true
            )
        );

        expect(
            emulator.dispatchedActions[0]
        ).toEqual(
            change('ContactForm', 'phone', '')
        );

        runSaga(
            emulator.store,
            switchBetweenPhones
        );

        emulator.pushActionToMiddleware(
            change(
                'ContactForm',
                'employed',
                false
            )
        );

        expect(
            emulator.dispatchedActions[1]
        ).toEqual(
            change('ContactForm', 'phone', '911')
        );
    });

    test('should not do anything, if employed was not changed', () => {
        const emulator = createStoreEmulator();

        runSaga(
            emulator.store,
            switchBetweenPhones
        );

        emulator.pushActionToMiddleware(
            change(
                'ContactForm',
                'otherField',
                true
            )
        );

        expect(
            emulator.dispatchedActions.length
        ).toBe(0);
    });
});
