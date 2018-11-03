import {compose} from 'redux';
import {ContactForm as DumbContactForm} from './ContactForm';
import {autofillEmail} from './enhancements';

export const ContactForm = compose(autofillEmail)(DumbContactForm);
