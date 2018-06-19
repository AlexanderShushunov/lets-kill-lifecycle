import React from 'react';
import {connect} from 'react-redux';
import {ContactForm} from './ContactForm';
import {
    getEmployed,
    getFirstName,
    getPhone,
    isNotEmailTouched
} from './selectors';
import {
    changeEmail,
    changePhone
} from './actions';

@connect(
    state => ({
        firstName: getFirstName(state),
        isNotEmailTouched: isNotEmailTouched(state),
        employed: getEmployed(state),
        phone: getPhone(state)
    }),
    {
        changeEmail,
        changePhone
    }
)
export class EnhancedContactForm extends React.Component {
    tempPhone = '';

    componentDidUpdate({
        firstName,
        isNotEmailTouched,
        employed
    }) {
        if (this.props.firstName !== firstName) {
            if (isNotEmailTouched) {
                this.props.changeEmail(
                    calcEmail(
                        this.props.firstName
                    )
                );
            }
        }
        if (this.props.employed !== employed) {
            this.props.changePhone(
                this.tempPhone
            );
            this.tempPhone =
                this.props.phone || '';
        }
    }

    render() {
        return <ContactForm />;
    }
}

const calcEmail = firstName => {
    if (!firstName) {
        return '';
    }
    return `${firstName}@hotmail.com`;
};
