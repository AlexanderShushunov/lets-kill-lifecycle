import {change} from 'redux-form';
import {CONTACT_FORM_NAME} from './contactFormName';

export const changeEmail = newValue =>
    change(CONTACT_FORM_NAME, 'email', newValue);

export const changePhone = newValue =>
    change(CONTACT_FORM_NAME, 'phone', newValue);
