import {of} from 'rxjs';
import {bufferCount} from 'rxjs/operators';
import {change} from 'redux-form';
import {noop} from '../utils';
import {autofillEmail} from './autofillEmail';
import {
    changeFormState,
    createFormState
} from './formStateTestUtils';

describe('autofillEmail', () => {
    test('should change email by first name', done => {
        autofillEmail(
            null,
            of(
                createFormState({firstName: 'a'}),
                createFormState({firstName: 'b'})
            )
        )
            .pipe(bufferCount(2))
            .subscribe(
                result =>
                    expect(result).toEqual([
                        change(
                            'ContactForm',
                            'email',
                            'a@hotmail.com'
                        ),
                        change(
                            'ContactForm',
                            'email',
                            'b@hotmail.com'
                        )
                    ]),
                noop,
                done
            );
    });

    test('should not change email if it was touched', done => {
        const emailTouched = createFormState(
            {},
            {
                email: {
                    touched: true
                }
            }
        );
        const firstNameChanged = changeFormState(
            emailTouched,
            {
                firstName: 'a'
            }
        );
        const next = jest.fn();
        autofillEmail(
            null,
            of(emailTouched, firstNameChanged)
        ).subscribe(next, noop, () => {
            expect(next).not.toHaveBeenCalled();
            done();
        });
    });

    test('should not change email if first name was not changed', done => {
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
        autofillEmail(
            null,
            of(firstNameChanged, lastNameChanged)
        ).subscribe(next, noop, () => {
            expect(next).toHaveBeenCalledTimes(1);
            done();
        });
    });
});
