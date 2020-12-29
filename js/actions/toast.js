import * as type from '../constants/action_types';

export function showToast(data) {
    return {
        type: type.SHOW_TOAST,
        data
    }
}

export function resetToast() {
    return {
        type: type.RESET_TOAST
    }
}