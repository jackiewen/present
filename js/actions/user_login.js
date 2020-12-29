import * as type from '../constants/action_types';

import * as endpoint from '../constants/endpoint';

import { clearUserLogout } from './user_logout';

export function clearUserLogin() {
    return {
        type: type.CLEAR_USER_LOGIN
    }
}

function postUserLogin() {
    return {
        type: type.POST_USER_LOGIN
    }
}

function receivePostUserLogin(json) {
    return {
        type: type.RECEIVE_POST_USER_LOGIN,
        receiveData: json.data
    }
}

function receivePostUserLoginFailure(err) {
    return {
        type: type.RECEIVE_POST_USER_LOGIN_FAILURE,
        receiveData: err
    }
}

function userLogin(postData) {
    return dispatch => {
        dispatch(clearUserLogout());
        dispatch(postUserLogin());
        return axios.post(endpoint.ROOT_URL + endpoint.USER_LOGIN_ENDPOINT, postData)
            .then(json => dispatch(receivePostUserLogin(json)))
            .catch(err => dispatch(receivePostUserLoginFailure(err.response)));
    }
}

function shouldUserLogin(state) {
    return !state.userLogin.isFetching;
}

export function userLoginIfNeeded(postData) {
    return (dispatch, getState) => {
        if (shouldUserLogin(getState())) {
            return dispatch(userLogin(postData));
        }
    }
}