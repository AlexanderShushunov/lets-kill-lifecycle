import {SET_IS_VIP} from './actions';

export const vipStateReducer = (
    state = {},
    {type, payload}
) => {
    switch (type) {
        case SET_IS_VIP: {
            return {...state, isVip: payload};
        }
        default:
            return state;
    }
};
