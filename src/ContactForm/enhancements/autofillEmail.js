import {connect} from 'react-redux';
import {compose} from 'redux';
import {onChange} from '../../hocs';
import {changeEmail} from '../actions';
import {getFirstName, isNotEmailTouched} from '../selectors';

const calcEmail = firstName => {
    if (!firstName) {
        return '';
    }
    return `${firstName}@hotmail.com`;
};

export const autofillEmail = compose(
    connect(
        state => ({
            firstName: getFirstName(state),
            isNotEmailTouched: isNotEmailTouched(state)
        }),
        {
            changeEmail
        }
    ),
    onChange(['firstName'], ({firstName, isNotEmailTouched, changeEmail}) => {
        if (isNotEmailTouched) {
            changeEmail(calcEmail(firstName));
        }
    })
);
