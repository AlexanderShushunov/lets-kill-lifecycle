import {map, filter} from 'rxjs/operators';
import {
    changeEmail,
    isFirstNameChanging,
    isNotEmailTouched
} from '../ContactForm';

export const autofillEmail = (action$, state) =>
    action$.pipe(
        filter(isFirstNameChanging),
        map(toChangeEmailAction(state)),
        filter(Boolean)
    );

const toChangeEmailAction = state => ({
    payload: firstName
}) => {
    const shouldAutofill = isNotEmailTouched(
        state.value
    );
    if (shouldAutofill) {
        return changeEmail(calcEmail(firstName));
    }
};

const calcEmail = firstName => {
    if (!firstName) {
        return '';
    }
    return `${firstName}@hotmail.com`;
};
