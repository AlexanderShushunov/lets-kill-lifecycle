import {
    map,
    filter
} from 'rxjs/operators';
import {
    changePhone,
    getPhone,
    isEmployedChanging
} from '../ContactForm';

const tempValues = {};

export const switchBetweenPhones = (
    action$,
    state
) =>
    action$.pipe(
        filter(isEmployedChanging),
        map(toChangePhoneAction(state))
    );

const toChangePhoneAction = state => ({
    meta: {form}
}) => {
    const savedPhone = tempValues[form];
    tempValues[form] = getPhone(state.value);
    return changePhone(savedPhone || '');
};
