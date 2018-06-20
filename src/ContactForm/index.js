import {ContactForm as DumbContactForm} from './ContactForm';
import {
    autofillEmail,
    switchBetweenPhones
} from './enhancements';

export const ContactForm =
    switchBetweenPhones(
    autofillEmail(
        DumbContactForm
    ));
