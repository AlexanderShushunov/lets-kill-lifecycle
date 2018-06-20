import {ContactForm as DumbContactForm} from './ContactForm';
import {autofillEmail} from './enhancements';

export const ContactForm = autofillEmail(DumbContactForm);
