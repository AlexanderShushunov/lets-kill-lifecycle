import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {ContactForm} from './ContactForm';
import {
    getEmployed,
    getFirstName,
    getLastName,
    getPhone,
    isNotEmailTouched
} from './selectors';
import {changeEmail, changePhone} from './actions';
import {isVipApiCall} from '../api';

export const EnhancedContactForm = connect(
    state => ({
        firstName: getFirstName(state),
        isNotEmailTouched: isNotEmailTouched(state),
        employed: getEmployed(state),
        phone: getPhone(state),
        lastName: getLastName(state)
    }),
    {
        changeEmail,
        changePhone
    }
)(
    ({
        changeEmail,
        firstName,
        isNotEmailTouched,
        employed,
        phone,
        changePhone,
        lastName
    }) => {
        useEffect(
            () => {
                if (isNotEmailTouched) {
                    changeEmail(calcEmail(firstName));
                }
            },
            [firstName]
        );

        const tempPhone = useRef();
        useEffect(
            () => {
                changePhone(tempPhone.current);
                tempPhone.current = phone || '';
            },
            [employed]
        );

        const [isVip, setIsVip] = useState(false);
        useEffect(
            () => {
                let changedAfterOrUnmounted = false;
                isVipApiCall(lastName).then(isVip => {
                    if (!changedAfterOrUnmounted) {
                        setIsVip(isVip);
                    }
                });
                return () => (changedAfterOrUnmounted = true);
            },
            [lastName]
        );

        return <ContactForm isVip={isVip} />;
    }
);

const calcEmail = firstName => {
    if (!firstName) {
        return '';
    }
    return `${firstName}@hotmail.com`;
};
