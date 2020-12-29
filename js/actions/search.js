import * as type from '../constants/action_types';

import * as endpoint from '../constants/endpoint';

export function clearSearch() {
    return {
        type: type.CLEAR_SEARCH
    }
}

export function keepSearchOnRedirect(keepSearchStatus) {
    return {
        type: type.KEEP_SEARCH_ON_REDIRECT,
        keepSearchStatus
    }
}

function getSearch(url, params) {
    return {
        type: type.GET_SEARCH,
        url,
        params
    }
}

function receiveGetSearch(json) {
    return {
        type: type.RECEIVE_GET_SEARCH,
        receiveData: json.data
    }
}
   
function receiveGetSearchFailure(err) {
    return {
        type: type.RECEIVE_GET_SEARCH_FAILURE,
        receiveData: err
    }
}

function search(url, params) {
    return dispatch => {
        dispatch(getSearch(url, params));
        return axios.get(url, { params: params })
            .then(json => dispatch(receiveGetSearch(json)))
            .catch(err => dispatch(receiveGetSearchFailure(err.response)));
    }
}

function shouldSearch(state) {
    return !state.search.isFetching;
}

export function searchIfNeeded(url, params) {
    return (dispatch, getState) => {
        if (shouldSearch(getState())) {
            return dispatch(search(url, params));
        }
    }
}