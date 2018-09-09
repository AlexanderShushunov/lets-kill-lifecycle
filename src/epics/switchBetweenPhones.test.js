import {of} from 'rxjs';
import {bufferCount} from 'rxjs/operators';
import {change} from 'redux-form';
import {noop} from '../utils';
import {switchBetweenPhones} from './switchBetweenPhones';
import {
    changeFormState,
    createFormState
} from './formStateTestUtils';

describe('switchBetweenPhones', () => {
    test('should restore phone if employed was not changed', done => {
        const init = createFormState({});
        const firstPhone = changeFormState(init, {
            phone: '911'
        });
        const firstSwitch = changeFormState(
            firstPhone,
            {
                employed: true
            }
        );
        const newPhone = changeFormState(
            firstSwitch,
            {
                phone: '112'
            }
        );
        const secondSwitch = changeFormState(
            newPhone,
            {
                employed: false
            }
        );
        const thirdSwitch = changeFormState(
            newPhone,
            {
                employed: true
            }
        );
        switchBetweenPhones(
            null,
            of(
                init,
                firstSwitch,
                newPhone,
                secondSwitch,
                thirdSwitch
            )
        )
            .pipe(bufferCount(3))
            .subscribe(
                result =>
                    expect(result).toEqual([
                        change(
                            'ContactForm',
                            'phone',
                            ''
                        ),
                        change(
                            'ContactForm',
                            'phone',
                            '911'
                        ),
                        change(
                            'ContactForm',
                            'phone',
                            '112'
                        )
                    ]),
                noop,
                done
            );
    });

    test('should do nothing if employed was not changed', done => {
        const firstNameChanged = createFormState({
            firstName: 'a'
        });
        const lastNameChanged = changeFormState(
            firstNameChanged,
            {
                lastName: 'b'
            }
        );
        const next = jest.fn();
        switchBetweenPhones(
            null,
            of(firstNameChanged, lastNameChanged)
        ).subscribe(next, noop, () => {
            expect(next).not.toHaveBeenCalled();
            done();
        });
    });
});
