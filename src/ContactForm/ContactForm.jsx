import React from 'react';
import {Field, formValues, reduxForm} from 'redux-form';
import {FormLabel} from '../FormLabel';
import {CONTACT_FORM_NAME} from './contactFormName';

export const ContactForm =
    reduxForm({form: CONTACT_FORM_NAME})(
        formValues('employed')(
            ({employed}) => (
                <form>
                    <FormLabel text="First Name">
                        <Field name="firstName" component="input" type="text" />
                    </FormLabel>
                    <FormLabel text="Last Name">
                        <Field name="lastName" component="input" type="text" />
                    </FormLabel>
                    <FormLabel text="Email">
                        <Field name="email" component="input" type="email" />
                    </FormLabel>
                    <FormLabel text="Employed">
                        <Field name="employed" component="input" type="checkbox" />
                    </FormLabel>
                    <FormLabel text={employed ? 'Inner phone number' : 'Mobile'}>
                        <Field name="phone" component="input" type="text" />
                    </FormLabel>
                </form>
            )
        )
    );
