import {compose} from 'redux';
import {ContactForm as DumbContactForm} from './ContactForm';
import {autofillEmail, findOutIsVip, switchBetweenPhones} from './enhancements';

export const ContactForm = compose(
    autofillEmail,
    switchBetweenPhones,
    findOutIsVip
)(DumbContactForm);
