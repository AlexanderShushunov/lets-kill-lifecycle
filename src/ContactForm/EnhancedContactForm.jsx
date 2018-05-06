import React from 'react';
import {connect} from 'react-redux';
import {ContactForm} from './ContactForm';
import {
    getFirstName,
    isNotEmailTouched
} from './selectors';
import {changeEmail} from './actions';

@connect(
    state => ({
        firstName: getFirstName(state),
        isNotEmailTouched: isNotEmailTouched(state)
    }),
    {
        changeEmail
    }
)
export class EnhancedContactForm extends React.Component {
    componentDidUpdate({
        firstName,
        isNotEmailTouched
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
