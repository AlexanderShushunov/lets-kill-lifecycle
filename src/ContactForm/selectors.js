import {formValueSelector} from 'redux-form';
import {CONTACT_FORM_NAME} from './contactFormName';
import {isFieldTouched} from '../utils';

export const getValue = fieldName => state =>
    formValueSelector(CONTACT_FORM_NAME)(
        state,
        fieldName
    );

export const getFirstName = getValue('firstName');
export const getEmployed = getValue('employed');
export const getPhone = getValue('phone');
export const getLastName = getValue('lastName');

export const isNotEmailTouched = state => !isFieldTouched(
    CONTACT_FORM_NAME,
    'email'
)(state);
