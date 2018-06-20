import {ContactForm as DumbContactForm} from './ContactForm';
import {
    autofillEmail,
    switchBetweenPhones,
    findOutIsVip
} from './enhancements';

export const ContactForm =
    switchBetweenPhones(
    autofillEmail(
    findOutIsVip(
        DumbContactForm
    )));
