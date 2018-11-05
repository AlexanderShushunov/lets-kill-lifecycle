import {connect} from 'react-redux';
import {compose} from 'redux';
import {isVipApiCall} from '../../api';
import {asyncDerivative} from '../../hocs/asynDerivative';
import {getLastName} from '../selectors';

export const findOutIsVip = compose(
    connect(state => ({
        lastName: getLastName(state)
    })),
    asyncDerivative(
        ['lastName'],
        ({lastName}) => isVipApiCall(lastName),
        'isVip'
    )
);
