import React from 'react';
import {connect} from 'react-redux';
import {ContactForm} from './ContactForm';
import {
    getEmployed,
    getFirstName,
    getLastName,
    getPhone,
    isNotEmailTouched
} from './selectors';
import {
    changeEmail,
    changePhone
} from './actions';
import {isVipApiCall} from '../api';

@connect(
    state => ({
        firstName: getFirstName(state),
        isNotEmailTouched: isNotEmailTouched(state),
        employed: getEmployed(state),
        phone: getPhone(state),
        lastName: getLastName(state)
    }),
    {
        changeEmail,
        changePhone
    }
)
export class EnhancedContactForm extends React.Component {
    tempPhone = '';
    state = {
        isVip: false
    };

    componentDidMount() {
        this.fetchIsVip(this.props.firstName);
    }

    componentDidUpdate({
        firstName,
        isNotEmailTouched,
        employed,
        lastName
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
        if (this.props.lastName !== lastName) {
            this.fetchIsVip(this.props.lastName);
        }
    }

    fetchIsVip(lastName) {
        isVipApiCall(lastName).then(isVip =>
            this.setState({
                isVip
            })
        );
    }

    render() {
        return (
            <ContactForm
                isVip={this.state.isVip}
            />
        );
    }
}

const calcEmail = firstName => {
    if (!firstName) {
        return '';
    }
    return `${firstName}@hotmail.com`;
};
