import {
    map,
    takeWhile,
    distinctUntilChanged
} from 'rxjs/operators';
import {
    changeEmail,
    getFirstName,
    isNotEmailTouched
} from '../ContactForm';

export const autofillEmail = (_, state$) =>
    state$.pipe(
        takeWhile(isNotEmailTouched),
        map(getFirstName),
        distinctUntilChanged(),
        map(calcEmail),
        map(changeEmail)
    );

const calcEmail = firstName => {
    if (!firstName) {
        return '';
    }
    return `${firstName}@hotmail.com`;
};
