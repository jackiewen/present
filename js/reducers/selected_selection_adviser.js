import * as type from '../constants/action_types';

const initialState = {info: {}, data: [], first_load: true };

export default function (state = initialState, action) {
    switch(action.type) {
        case type.INIT_SELECTED_SELECTION_ADVISER:
            return { info: action.info, data: action.data, first_load: false }
        case type.SET_SELECTED_SELECTION_ADVISER:
            return { ...state, data: action.data }
        case type.ADD_SELECTED_SELECTION_ADVISER:
            return {...state, data: [...state.data, action.item]};
        case type.CHANGE_INFO_SELECTED_SELECTION_ADVISER:
            return {...state, info: {...state.info, ...action.item}};
        case type.REMOVE_SELECTED_SELECTION_ADVISER:
            return { ...state, data: state.data.filter(it => it.adviser_id !== action.adviser_id) };
        case type.CLEAR_SELECTED_SELECTION_ADVISER:
            return initialState;
        default:
            return state;
    }
}