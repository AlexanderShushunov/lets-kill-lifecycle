import {useSubstate} from 'use-substate';

export const useAction = actionCreator => {
    const [, dispatch] = useSubstate(() => {});
    return (...args) => dispatch(actionCreator(...args));
};
