import {useSubstate} from 'use-substate';

export const useSelector = selector => {
    const [{result}] = useSubstate(state => {
        return {
            result: selector(state)
        };
    });
    return result;
};
