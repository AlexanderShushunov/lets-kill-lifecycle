import {
    map,
    distinctUntilChanged,
    pairwise
} from 'rxjs/operators';
import {
    changePhone,
    getEmployed,
    getPhone
} from '../ContactForm';
import {equal} from '../utils';

export const switchBetweenPhones = (_, state$) =>
    state$.pipe(
        distinctUntilChanged(equal, getEmployed),
        map(getPhone),
        pairwise(),
        map(([prev]) => prev || ''),
        map(changePhone)
    );
