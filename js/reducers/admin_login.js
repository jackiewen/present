import {
    CLEAR_ADMIN_LOGIN,
    POST_ADMIN_LOGIN,
    RECEIVE_POST_ADMIN_LOGIN,
    RECEIVE_POST_ADMIN_LOGIN_FAILURE,
} from '../constants/action_types';

const initialState = {
    isFetching: false,
    isFailure: false,
    receiveData: {},
    errors: {}
};

export default function (state = initialState, action)
{
    switch (action.type) {
        case CLEAR_ADMIN_LOGIN:
            return initialState;
        case POST_ADMIN_LOGIN:
            return Object.assign({}, state, {
                isFetching: true,
                receiveData: {},
                errors: {}
            });
        case RECEIVE_POST_ADMIN_LOGIN:
            return Object.assign({}, state, {
                isFetching: false,
                receiveData: action.receiveData,
                errors: {}
            });
        case RECEIVE_POST_ADMIN_LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isFailure: true,
                errors: action.receiveData
            });
        default:
            return state;
    }
}