import {
    CLEAR_ADMIN_LOGIN,
    POST_ADMIN_LOGIN,
    RECEIVE_POST_ADMIN_LOGIN,
    RECEIVE_POST_ADMIN_LOGIN_FAILURE,
} from '../constants/action_types';
import * as endpoint from '../constants/endpoint';
import { clearAdminLogout } from "./admin_logout";

export function clearAdminLogin() {
    return {
        type: CLEAR_ADMIN_LOGIN
    }
}

function receivePostAdminLogin(json) 
{
    return {
        type: RECEIVE_POST_ADMIN_LOGIN,
        receiveData: json.data
    }    
}

function postAdminLogin() 
{
    return {
        type: POST_ADMIN_LOGIN
    }    
}

function receivePostAdminLoginFailure(err)
{
    return {
        type: RECEIVE_POST_ADMIN_LOGIN_FAILURE,
        receiveData: err,
    }
}

function adminLogin(postData)
{
    return dispatch => {
        dispatch(clearAdminLogout());
        dispatch(postAdminLogin());
        return axios.post(endpoint.ROOT_URL + endpoint.ADMIN_LOGIN_ENDPOINT, postData)
            .then(json => dispatch(receivePostAdminLogin(json)))
            .catch(err => dispatch(receivePostAdminLoginFailure(err.response.data)));
    }
}

function shouldLogin(state)
{
    return !state.adminLogin.isFetching;
}

export function adminLoginIfNeeded(postData)
{
    return (dispatch, getState) => {
        if(shouldLogin(getState()))
        {
            return dispatch(adminLogin(postData));
        }
    }
}