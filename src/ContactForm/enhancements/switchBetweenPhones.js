import {connect} from '@redneckz/react-redux-rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/ignoreElements';
import {equal, prev} from '../../utils';
import {
    getEmployed,
    getPhone
} from '../selectors';
import {changePhone} from '../actions';

export const stateToPropsMapper = (
    state$,
    _,
    dispatch
) =>
    state$
        .distinctUntilChanged(equal, getEmployed)
        .map(getPhone)
        ::prev()
        ::dispatch(changePhone)
        .ignoreElements();

export const switchBetweenPhones = connect(
    stateToPropsMapper
);
