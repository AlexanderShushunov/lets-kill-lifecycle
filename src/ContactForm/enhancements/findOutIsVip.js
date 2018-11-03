import {connect} from 'react-redux';
import {compose} from 'redux';
import {isVipApiCall} from '../../api';
import {effect} from '../../hocs/effect';
import {getLastName} from '../selectors';

export const findOutIsVip = compose(
    connect(state => ({
        lastName: getLastName(state)
    })),
    effect(['lastName'], ({lastName}) => isVipApiCall(lastName), 'isVip')
);
