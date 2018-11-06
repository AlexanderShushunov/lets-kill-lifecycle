import {useEffect, useState} from 'react';
import {isVipApiCall} from '../../api';
import {useSelector} from '../../redux-hooks';
import {getLastName} from '../selectors';

export const useFindOutIsVip = () => {
    const lastName = useSelector(getLastName);
    const [isVip, setIsVip] = useState(false);
    useEffect(
        () => {
            let changedAfterOrUnmounted = false;
            isVipApiCall(lastName).then(isVip => {
                if (!changedAfterOrUnmounted) {
                    setIsVip(isVip);
                }
            });
            return () => (changedAfterOrUnmounted = true);
        },
        [lastName]
    );
    return isVip;
};
