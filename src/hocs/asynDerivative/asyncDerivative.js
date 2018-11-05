import {pick} from 'lodash';
import {compose} from 'redux';
import {withState} from '../withState/index';
import {mapProps} from '../mapProps/index';
import {onChange} from '../onChange/index';
import {withDidMount} from '../withDidMount/index';

export const asyncDerivative = (
    propNames,
    operation,
    resultPropName
) => Component => {
    const operationOnProps = makeOperationOnProps(propNames, operation);
    return compose(
        withState(resultPropName, 'setResult'),
        withDidMount(operationOnProps),
        onChange(propNames, operationOnProps),
        // cut setResult
        mapProps(({setResult, ...otherProps}) => ({
            ...otherProps
        }))
    )(Component);
};

export const makeOperationOnProps = (propNames, operation) => {
    let last;
    return ({setResult, ...otherProps}) => {
        const operationParams = pick(otherProps, propNames);
        const current = operation(operationParams).then(result => {
            if (last === current) {
                setResult(result);
            }
        });
        last = current;
    };
};
