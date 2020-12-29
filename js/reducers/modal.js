import * as type from '../constants/action_types';



const initialState = {
    name: '',
    selector: '',
    isOpen: false,
    step: 0,
    data: {}
};

export default function (state = initialState, action) {
    switch(action.type) {
        case type.OPEN_MODAL:
            return Object.assign({}, state, {
                name:  action.data.name,
                selector: action.data.selector,
                isOpen: true,
                step: 1,
                isChangeStep: true,
                data: action.data.data
            });
        case type.CLOSE_MODAL:
            return Object.assign({}, state, {
                name:  action.data.name,
                selector: action.data.selector,
                isOpen: false,
                step: 0,
                isChangeStep: false,
                data: action.data.data
            });
        case type.HANDLE_CHANGE_MODAL:
            return Object.assign({}, state, {
                isChangeStep: false,
                data: action.data.data
            });
        case type.NEXT_MODAL:
            return Object.assign({}, state, {
                name:  action.data.name,
                selector: action.data.selector,
                isOpen: true,
                isChangeStep: true,
                step: ++action.data.step,
                data: action.data.data
            });
        case type.PREVIOUS_MODAL:
            return Object.assign({}, state, {
                name:  action.data.name,
                selector: action.data.selector,
                isOpen: true,
                isChangeStep: true,
                step: --action.data.step,
                data: action.data.data
            });
        default:
            return state;
    }
}