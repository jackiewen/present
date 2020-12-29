import * as type from '../constants/action_types';

const initialState = {
    isFetching: false,
    isFailure: false,
    keepSearchOnRedirect: false,
    receiveData: {}
};

export default function (state = initialState, action) {
    switch(action.type) {
        case type.RECEIVE_GET_SEARCH_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isFailure: true,
                receiveData: action.receiveData
            });
        case type.GET_SEARCH:
            return Object.assign({}, state, {
                isFetching: true,
                isFailure: false,
                url: action.url,
                params: action.params
            });
        case type.RECEIVE_GET_SEARCH:
            return Object.assign({}, state, {
                isFetching:  false,
                isFailure: false,
                receiveData: action.receiveData
            });
        case type.KEEP_SEARCH_ON_REDIRECT:
            return Object.assign({}, state, {
                keepSearchOnRedirect: action.keepSearchStatus
            });
        case type.CLEAR_SEARCH:
            return initialState;
        default:
            return state;
    }
}