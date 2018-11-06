import React from 'react';
import {ContactForm} from './ContactForm';
import {useAutofillEmail, useSwitchBetweenPhones} from './hooks';
import {useFindOutIsVip} from './hooks/useFindOutIsVip';

export const EnhancedContactForm = () => {
    useAutofillEmail();
    useSwitchBetweenPhones();
    const isVip = useFindOutIsVip();
    return <ContactForm isVip={isVip} />;
};
