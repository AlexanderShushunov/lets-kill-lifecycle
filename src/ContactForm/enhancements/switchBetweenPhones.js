import {connect} from 'react-redux';
import {compose} from 'redux';
import {onChange} from '../../hocs/onChange';
import {changePhone} from '../actions';
import {getEmployed, getPhone} from '../selectors';

export const switchBetweenPhones = Component => {
    let tempPhone = '';

    return compose(
        connect(
            state => ({
                employed: getEmployed(state),
                phone: getPhone(state)
            }),
            {
                changePhone
            }
        ),
        onChange(['employed'], ({phone, changePhone}) => {
            changePhone(tempPhone);
            tempPhone = phone || '';
        })
    )(Component);
};
