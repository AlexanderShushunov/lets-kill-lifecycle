import * as React from 'react';
import {makeOperationOnProps} from './effect';

describe('makeOperationOnProps', () => {
    test('should invoke operation with rights params', () => {
        const operation = jest.fn().mockReturnValue(Promise.resolve());
        makeOperationOnProps(['prop'], operation)({
            prop: 1,
            otherProp: 2,
            setResult: () => {}
        });
        expect(operation).toHaveBeenCalledWith({prop: 1});
    });

    test('should invoke set result with operation result', done => {
        const result = Promise.resolve(42);
        const operation = () => result;
        const setResult = jest.fn();
        makeOperationOnProps([], operation)({
            setResult
        });
        result.then(() => {
            expect(setResult).toHaveBeenCalledWith(42);
            done();
        });
    });

    test('if two operations invoke in parallel, setResult should be invoked with last result only', done => {
        const results = [];
        const operation = ({prop}) => {
            const result = Promise.resolve(prop);
            results.push(result);
            return result;
        };
        const setResult = jest.fn();
        const operationOnProps = makeOperationOnProps(['prop'], operation);
        operationOnProps({
            prop: 1,
            setResult
        });
        operationOnProps({
            prop: 2,
            setResult
        });
        Promise.all(results).then(() => {
            expect(setResult).toHaveBeenCalledTimes(1);
            expect(setResult).toHaveBeenCalledWith(2);
            done();
        });
    });
});
