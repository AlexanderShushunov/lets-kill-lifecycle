import {combineEpics} from 'redux-observable';
import {autofillEmail} from './autofillEmail';

export const rootEpic = combineEpics(
    autofillEmail
);
