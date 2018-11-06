import {useEffect} from 'react';
import {getFirstName, isNotEmailTouched} from '../selectors';
import {changeEmail as changeEmailActionCreator} from '../actions';
import {useAction, useSelector} from '../../redux-hooks';

const calcEmail = firstName => {
    if (!firstName) {
        return '';
    }
    return `${firstName}@hotmail.com`;
};

export const useAutofillEmail = () => {
    const firstName = useSelector(getFirstName);
    const shouldUpdateEmail = useSelector(isNotEmailTouched);
    const changeEmail = useAction(changeEmailActionCreator);
    useEffect(
        () => {
            if (shouldUpdateEmail) {
                changeEmail(calcEmail(firstName));
            }
        },
        [firstName]
    );
};
