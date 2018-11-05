import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {ContactForm} from './ContactForm';
import {
    getEmployed,
    getFirstName,
    getPhone,
    isNotEmailTouched
} from './selectors';
import {changeEmail, changePhone} from './actions';

export const EnhancedContactForm = connect(
    state => ({
        firstName: getFirstName(state),
        isNotEmailTouched: isNotEmailTouched(state),
        employed: getEmployed(state),
        phone: getPhone(state)
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
        changePhone
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
        return <ContactForm />;
    }
);

const calcEmail = firstName => {
    if (!firstName) {
        return '';
    }
    return `${firstName}@hotmail.com`;
};
