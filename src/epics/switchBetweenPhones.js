import {
    map,
    distinctUntilChanged
} from 'rxjs/operators';
import {
    changePhone,
    getEmployed,
    getPhone
} from '../ContactForm';
import {equal, prev} from '../utils';

export const switchBetweenPhones = (_, state$) =>
    state$.pipe(
        distinctUntilChanged(equal, getEmployed),
        map(getPhone),
        prev(),
        map(changePhone)
    );
