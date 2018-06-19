import {actionTypes} from 'redux-form';
import {CONTACT_FORM_NAME} from './contactFormName';

const isFieldChangeAction = fieldName => ({
    type,
    meta: {form, field}
}) =>
    type === actionTypes.CHANGE &&
    form === CONTACT_FORM_NAME &&
    field === fieldName;

export const isFirstNameChanging = isFieldChangeAction(
    'firstName'
);

export const isEmployedChanging = isFieldChangeAction(
    'employed'
);

export const isLastNameChanging = isFieldChangeAction(
    'lastName'
);
