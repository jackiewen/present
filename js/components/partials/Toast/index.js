import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetToast } from '../../../actions/toast';

export default function Toast() {
    const toast = useSelector(state => state.toast);
    const dispatch = useDispatch();

    useEffect(() => {
        if (toast && toast.status) {
            toastr[toast.type](toast.message);
            dispatch(resetToast());
        }
    });

    return (
        <div></div>
    );
}