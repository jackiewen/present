import * as type from '../constants/action_types';

import * as endpoint from '../constants/endpoint';

import { clearUserLogin } from './user_login';

export function clearUserLogout() {
    return {
        type: type.CLEAR_USER_LOGOUT
    }
}

function postUserLogout() {
    return {
        type: type.POST_USER_LOGOUT
    }
}

function receivePostUserLogout(json) {
    return {
        type: type.RECEIVE_POST_USER_LOGOUT,
        receiveData: json.data
    }
}

function receivePostUserLogoutFailure(err) {
    return {
        type: type.RECEIVE_POST_USER_LOGOUT_FAILURE,
        receiveData: err
    }
}

function userLogout(postData) {
    return dispatch => {
        dispatch(clearUserLogin());
        dispatch(postUserLogout());
        return axios.post(endpoint.ROOT_URL + endpoint.USER_LOGOUT_ENDPOINT, postData)
            .then(json => dispatch(receivePostUserLogout(json)))
            .catch(err => dispatch(receivePostUserLogoutFailure(err.response)));
    }
}

function shouldUserLogout(state) {
    return !state.userLogout.isFetching;
}

export function userLogoutIfNeeded(postData) {
    return (dispatch, getState) => {
        if (shouldUserLogout(getState())) {
            return dispatch(userLogout(postData));
        }
    }
}