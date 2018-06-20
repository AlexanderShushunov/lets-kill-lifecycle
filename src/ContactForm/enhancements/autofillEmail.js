import {connect} from '@redneckz/react-redux-rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/ignoreElements';
import {
    getFirstName,
    isNotEmailTouched
} from '../selectors';
import {changeEmail} from '../actions';

const calcEmail = firstName => {
    if (!firstName) {
        return '';
    }
    return `${firstName}@hotmail.com`;
};

export const autofillEmail = connect(
    (state$, props$, dispatch) =>
        state$
            .takeWhile(isNotEmailTouched)
            .map(getFirstName)
            .distinctUntilChanged()
            .map(calcEmail)
            ::dispatch(changeEmail)
            .ignoreElements()
);
