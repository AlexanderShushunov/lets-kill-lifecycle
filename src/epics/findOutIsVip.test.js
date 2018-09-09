import {interval, of} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {change} from 'redux-form';
import {noop} from '../utils';
import {setIsVip} from '../vipState';
import {findOutIsVip} from './findOutIsVip';
import {isVipApiCall} from '../api';

jest.mock('../api', () => {
    const isVipApiCall = jest.fn();
    return {isVipApiCall};
});

describe('findOutIsVip', () => {
    test('should request isVip if last name was changed', done => {
        const result = [];
        isVipApiCall
            .mockResolvedValueOnce(true)
            .mockResolvedValueOnce(false);
        findOutIsVip(
            // "async" stream
            interval(0).pipe(
                map(count =>
                    change(
                        'ContactForm',
                        'lastName',
                        count
                    )
                ),
                take(2)
            )
        ).subscribe(
            result.push.bind(result),
            noop,
            () => {
                expect(result).toEqual([
                    setIsVip(true),
                    setIsVip(false)
                ]);
                done();
            }
        );
    });

    test(`should react on last lastName changing only,
          if it is received before api has answered for first one`, done => {
        const result = [];
        isVipApiCall
            .mockResolvedValueOnce(true)
            .mockResolvedValueOnce(false);
        findOutIsVip(
            of(
                change(
                    'ContactForm',
                    'lastName',
                    'a'
                ),
                change(
                    'ContactForm',
                    'lastName',
                    'b'
                )
            )
        ).subscribe(
            result.push.bind(result),
            noop,
            () => {
                expect(result).toEqual([
                    setIsVip(false)
                ]);
                done();
            }
        );
    });

    test('should do nothing if lastName was not changed', done => {
        const next = jest.fn();
        findOutIsVip(
            of(
                change(
                    'ContactForm',
                    'email',
                    'a@hotmail.com'
                ),
                change(
                    'ContactForm',
                    'firstName',
                    'A'
                )
            )
        ).subscribe(next, noop, () => {
            expect(next).not.toHaveBeenCalled();
            done();
        });
    });
});
