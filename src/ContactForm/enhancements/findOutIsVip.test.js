import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import {noop} from '../../utils';
import {stateToPropsMapper} from './findOutIsVip';
import {createFormState} from '../../utils/test';
import {isVipApiCall} from '../../api';

jest.mock('../../api', () => {
    const isVipApiCall = jest.fn();
    return {isVipApiCall};
});

const createState = createFormState(
    'ContactForm'
);

describe('stateToPropsMapper of findOutIsVip', () => {
    test('should request isVip if last name was changed', done => {
        const result = [];
        isVipApiCall
            .mockResolvedValueOnce(true)
            .mockResolvedValueOnce(false);
        stateToPropsMapper(
            // "async" stream
            Observable.interval(0)
                .map(count =>
                    createState({lastName: count})
                )
                .take(2)
        ).subscribe(
            result.push.bind(result),
            noop,
            () => {
                expect(result).toEqual([
                    {isVip: true},
                    {isVip: false}
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
        stateToPropsMapper(
            Observable.of(
                createState({lastName: 'a'}),
                createState({lastName: 'b'})
            )
        ).subscribe(
            result.push.bind(result),
            noop,
            () => {
                expect(result).toEqual([
                    {isVip: false}
                ]);
                done();
            }
        );
    });
});
