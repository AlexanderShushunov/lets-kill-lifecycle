import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {noop} from '../../utils';
import {stateToPropsMapper} from './autofillEmail';
import {
    changeFormState,
    createFormState,
    createMockedDisptach
} from '../../utils/test';
import {changeEmail} from '../actions';

const createState = createFormState(
    'ContactForm'
);
const changeState = changeFormState(
    'ContactForm'
);

describe('stateToPropsMapper of autofillEmail ', () => {
    test('should change email by first name', done => {
        const mockedDispatch = createMockedDisptach();
        stateToPropsMapper(
            Observable.of(
                createState({firstName: 'a'}),
                createState({firstName: 'b'})
            ),
            null,
            mockedDispatch.operator
        ).subscribe(noop, noop, () => {
            expect(
                mockedDispatch.operator
            ).toHaveBeenCalledWith(changeEmail);
            expect(
                mockedDispatch.step.mock.calls
            ).toEqual([
                ['a@hotmail.com'],
                ['b@hotmail.com']
            ]);
            done();
        });
    });

    test('should not change email if it was touched', done => {
        const mockedDispatch = createMockedDisptach();
        const emailTouched = createState(
            {},
            {
                email: {
                    touched: true
                }
            }
        );
        const firstNameChanged = changeState(
            emailTouched,
            {
                firstName: 'a'
            }
        );
        stateToPropsMapper(
            Observable.of(
                emailTouched,
                firstNameChanged
            ),
            null,
            mockedDispatch.operator
        ).subscribe(noop, noop, () => {
            expect(
                mockedDispatch.step
            ).not.toHaveBeenCalled();
            done();
        });
    });

    test('should not change email if first name was not changed', done => {
        const mockedDispatch = createMockedDisptach();
        const firstNameChanged = createState({
            firstName: 'a'
        });
        const lastNameChanged = changeState(
            firstNameChanged,
            {
                lastName: 'b'
            }
        );
        stateToPropsMapper(
            Observable.of(
                firstNameChanged,
                lastNameChanged
            ),
            null,
            mockedDispatch.operator
        ).subscribe(noop(), noop, () => {
            expect(
                mockedDispatch.step
            ).toHaveBeenCalledTimes(1);
            done();
        });
    });
});
