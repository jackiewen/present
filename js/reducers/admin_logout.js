import {
    CLEAR_ADMIN_LOGOUT,
    POST_ADMIN_LOGOUT,
    RECEIVE_POST_ADMIN_LOGOUT,
    RECEIVE_POST_ADMIN_LOGOUT_FAILURE
} from '../constants/action_types';

const initialState = {
    isFetching: false,
    isFailure: false,
    receiveData: {},
    errors: {},
};

export default function (state = initialState, action)
{
    switch (action.type) {
        case CLEAR_ADMIN_LOGOUT:
            return initialState;
        case POST_ADMIN_LOGOUT:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_POST_ADMIN_LOGOUT:
            return Object.assign({}, state, {
                isFetching: false,
                receiveData: action.receiveData
            });
        case RECEIVE_POST_ADMIN_LOGOUT_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isFailure: true,
                errors: action.receiveData
            });
        default:
            return state;
    }
}