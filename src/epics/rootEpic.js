import {combineEpics} from 'redux-observable';
import {autofillEmail} from './autofillEmail';
import {switchBetweenPhones} from './switchBetweenPhones';

export const rootEpic = combineEpics(
    autofillEmail,
    switchBetweenPhones
);
