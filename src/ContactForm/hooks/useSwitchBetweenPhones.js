import {useEffect, useRef} from 'react';
import {useSelector, useAction} from '../../redux-hooks';
import {getEmployed, getPhone} from '../selectors';
import {changePhone as changePhoneActionCreator} from '../actions';

export const useSwitchBetweenPhones = () => {
    const phone = useSelector(getPhone);
    const employed = useSelector(getEmployed);
    const changePhone = useAction(changePhoneActionCreator);

    const tempPhone = useRef();
    useEffect(
        () => {
            changePhone(tempPhone.current);
            tempPhone.current = phone || '';
        },
        [employed]
    );
};
