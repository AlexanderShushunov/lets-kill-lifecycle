import {combineEpics} from 'redux-observable';
import {autofillEmail} from './autofillEmail';
import {switchBetweenPhones} from './switchBetweenPhones';
import {findOutIsVip} from './findOutIsVip';

export const rootEpic = combineEpics(
    autofillEmail,
    switchBetweenPhones,
    findOutIsVip
);
