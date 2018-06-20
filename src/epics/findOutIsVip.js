import {
    map,
    pluck,
    switchMap,
    filter
} from 'rxjs/operators';
import {isLastNameChanging} from '../ContactForm';
import {setIsVip} from '../vipState';
import {isVipApiCall} from '../api';

export const findOutIsVip = action$ =>
    action$.pipe(
        filter(isLastNameChanging),
        pluck('payload'),
        switchMap(isVipApiCall),
        map(setIsVip)
    );
