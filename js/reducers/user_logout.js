import * as type from '../constants/action_types';

const initialState = {
    isFetching: false,
    isFailure: false,
    receiveData: {}
};

export default function (state = initialState, action) {
    switch(action.type) {
        case type.RECEIVE_POST_USER_LOGOUT_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isFailure: true,
                receiveData: action.receiveData
            });
        case type.POST_USER_LOGOUT:
            return Object.assign({}, state, {
                isFetching: true,
                isFailure: false
            });
        case type.RECEIVE_POST_USER_LOGOUT:
            return Object.assign({}, state, {
                isFetching:  false,
                isFailure: false,
                receiveData: action.receiveData
            });
        case type.CLEAR_USER_LOGOUT:
            return initialState;
        default:
            return state;
    }
}