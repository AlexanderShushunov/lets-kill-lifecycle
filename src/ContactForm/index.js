import {compose} from 'redux';
import {ContactForm as DumbContactForm} from './ContactForm';
import {autofillEmail, switchBetweenPhones} from './enhancements';

export const ContactForm = compose(autofillEmail, switchBetweenPhones)(
    DumbContactForm
);
