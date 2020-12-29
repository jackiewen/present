import {
    CLEAR_ADMIN_LOGOUT,
    POST_ADMIN_LOGOUT,
    RECEIVE_POST_ADMIN_LOGOUT,
    RECEIVE_POST_ADMIN_LOGOUT_FAILURE,
} from '../constants/action_types';
import * as endpoint from '../constants/endpoint';
import { clearAdminLogin } from "./admin_login";

export function clearAdminLogout() {
    return {
        type: CLEAR_ADMIN_LOGOUT
    }
}

function receivePostAdminLogout(json)
{
    return {
        type: RECEIVE_POST_ADMIN_LOGOUT,
        receiveData: json.data
    }
}

function postAdminLogout()
{
    return {
        type: POST_ADMIN_LOGOUT
    }
}

function receivePostAdminLogLogoutFailure(err)
{
    return {
        type: RECEIVE_POST_ADMIN_LOGOUT_FAILURE,
        receiveData: err,
    }
}

function adminLogout(postData)
{
    return dispatch => {
        dispatch(clearAdminLogin());
        dispatch(postAdminLogout());
        return axios.post(endpoint.ROOT_URL + endpoint.ADMIN_LOGOUT_ENDPOINT, postData)
            .then(json => dispatch(receivePostAdminLogout(json)))
            .catch(err => dispatch(receivePostAdminLogLogoutFailure(err.response.data)));
    }
}

function shouldLogout(state)
{
    return !state.adminLogin.isFetching;
}

export function adminLogoutIfNeeded(postData)
{
    return (dispatch, getState) => {
        dispatch(clearAdminLogout());
        if(shouldLogout(getState()))
        {
            return dispatch(adminLogout(postData));
        }
    }
}