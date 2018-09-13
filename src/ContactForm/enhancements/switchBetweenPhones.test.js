import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {noop} from '../../utils';
import {stateToPropsMapper} from './switchBetweenPhones';
import {
    changeFormState,
    createFormState,
    createMockedDisptach
} from '../../utils/test';
import {changePhone} from '../actions';

const createState = createFormState(
    'ContactForm'
);
const changeState = changeFormState(
    'ContactForm'
);

describe('switchBetweenPhones', () => {
    test('should restore phone if employed was not changed', done => {
        const mockedDispatch = createMockedDisptach();
        const init = createState({});
        const firstPhone = changeState(init, {
            phone: '911'
        });
        const firstSwitch = changeState(
            firstPhone,
            {
                employed: true
            }
        );
        const newPhone = changeState(
            firstSwitch,
            {
                phone: '112'
            }
        );
        const secondSwitch = changeState(
            newPhone,
            {
                employed: false
            }
        );
        const thirdSwitch = changeState(
            newPhone,
            {
                employed: true
            }
        );
        stateToPropsMapper(
            Observable.of(
                init,
                firstSwitch,
                newPhone,
                secondSwitch,
                thirdSwitch
            ),
            null,
            mockedDispatch.operator
        ).subscribe(noop, noop, () => {
            expect(
                mockedDispatch.operator
            ).toHaveBeenCalledWith(changePhone);
            expect(
                mockedDispatch.step.mock.calls
            ).toEqual([[''], ['911'], ['112']]);
            done();
        });
    });

    test('should do nothing if employed was not changed', done => {
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
        ).subscribe(noop, noop, () => {
            expect(
                mockedDispatch.step
            ).not.toHaveBeenCalled();
            done();
        });
    });
});
