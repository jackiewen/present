import * as type from '../constants/action_types';

export function clear() {
    return {
        type: type.CLEAR_SELECTED_SELECTION_ADVISER
    }
}

export function init(info, data) {
    return {
        type: type.INIT_SELECTED_SELECTION_ADVISER,
        info,
        data
    }
}

export function set(data) {
    return {
        type: type.SET_SELECTED_SELECTION_ADVISER,
        data
    }
}

export function changeInfo(item) {
    return {
        type: type.CHANGE_INFO_SELECTED_SELECTION_ADVISER,
        item
    }
}

export function add(item) {
    return {
        type: type.ADD_SELECTED_SELECTION_ADVISER,
        item
    }
}
   
export function remove(adviser_id) {
    return {
        type: type.REMOVE_SELECTED_SELECTION_ADVISER,
        adviser_id
    }
}