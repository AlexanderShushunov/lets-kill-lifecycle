import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {ContactForm} from './ContactForm';
import {getFirstName, isNotEmailTouched} from './selectors';
import {changeEmail} from './actions';

export const EnhancedContactForm = connect(
    state => ({
        firstName: getFirstName(state),
        isNotEmailTouched: isNotEmailTouched(state)
    }),
    {
        changeEmail
    }
)(({changeEmail, firstName, isNotEmailTouched}) => {
    useEffect(
        () => {
            if (isNotEmailTouched) {
                changeEmail(calcEmail(firstName));
            }
        },
        [firstName]
    );
    return <ContactForm />;
});

const calcEmail = firstName => {
    if (!firstName) {
        return '';
    }
    return `${firstName}@hotmail.com`;
};
