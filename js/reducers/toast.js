import * as type from '../constants/action_types';

const initialState = {
    status: false,
    type: 'success',
    message: ''
};

export default function (state = initialState, action) {
    switch(action.type) {
        case type.SHOW_TOAST:
            return Object.assign({}, state, {
                status: true,
                type: action.data.type,
                message: action.data.message
            });
        case type.RESET_TOAST:
            return initialState;
        default:
            return state;
    }
}