import * as commonConstants from './constants/common';
import * as pathConstants from './constants/path';
import * as endpointConstants from './constants/endpoint';
import { generatePath } from 'react-router-dom';
import { USER_TYPE_USER, USER_TYPE_ADMIN } from "./constants/common";

const queryString = require('query-string');

export function setLogin(info) {
    localStorage.setItem('logged_in', info.logged_in || '');
    localStorage.setItem('user_type', info.user_type || '');
    localStorage.setItem('info', JSON.stringify(info.auth) || '');
    // if (info.logged_in) {
    //     setAccessTokenHeader(info.logged_in);
    // }
}

export function setLogout() {
    localStorage.removeItem('logged_in');
    localStorage.removeItem('user_type');
    localStorage.removeItem('config');
    localStorage.removeItem('last_login');
    localStorage.removeItem('notify');
    localStorage.removeItem('info');
    delete axios.defaults.headers.common["Authorization"];
}

// export function setAccessTokenHeader(token = '') {
//     if (!token) {
//         token = localStorage.getItem('logged_in') || '';
//     }
//     if (token) {
//         axios.defaults.headers.common['Authorization'] = 'bearer ' + token;
//     }
// }

export function InterceptorsResponse() {
    window.axios.interceptors.response.use(rs => {
        return rs;
    },
    error => {
        let messages = ['Token has expired', 'The token has been blacklisted'];
        if(error.response.status === 401) {
            let type = localStorage.getItem('user_type');
            localStorage.removeItem('logged_in');
            localStorage.removeItem('user_type');
            localStorage.removeItem('config');
            localStorage.removeItem('last_login');
            localStorage.removeItem('notify');
            localStorage.removeItem('info');
            const adminPath = getPath(pathConstants.ADMIN_LOGIN_PATH);
            const userPath = getPath(pathConstants.USER_LOGIN_PATH);
            if (window.location.pathname !== adminPath && window.location.pathname !== userPath) {
                if(type === USER_TYPE_ADMIN) {
                    window.location = adminPath;
                    // history.push(getPath(pathConstants.ADMIN_LOGIN_PATH));
                } else {
                    window.location = userPath;
                    // history.push(getPath(pathConstants.USER_LOGIN_PATH));
                }
            }
        } else if (error.response.status === 429 && error.response?.data?.code === 'EVAL_LIMIT_REQUEST') {
            window.location = getPath(pathConstants.USER_LIMIT_REQUEST_PATH);
            // history.push(getPath(pathConstants.USER_LIMIT_REQUEST_PATH));
        } else if (error.response.status === 502 || error.response.status === 500) {
            let type = localStorage.getItem('user_type');
            const adminErrPath = getPath(pathConstants["ADMIN_PAGE_" + error.response.status + "_PATH"]);
            const userErrPath = getPath(pathConstants["USER_PAGE_" + error.response.status + "_PATH"]);
            // if(type === USER_TYPE_ADMIN) {
            //     window.location = adminErrPath;
            // } else {
            //     window.location = userErrPath;
            // }
        }
        return Promise.reject(error);
    });
}

export function getRedirectLogin(userType = null) {
    if (!userType) {
        userType = localStorage.getItem('user_type');
    }
    if (userType === commonConstants.USER_TYPE_ADMIN) {
        return getPath(pathConstants.ADMIN_LOGIN_PATH);
    }
    return getPath(pathConstants.USER_LOGIN_PATH);
}

export function setUserType(userType) {
    localStorage.setItem('user_type', userType);
}

export function getUserType() {
    let userType = localStorage.getItem('user_type') || '';
    if (!userType) {
        userType = USER_TYPE_USER;
        if (window.location.pathname == getPath(pathConstants.ADMIN_LOGIN_PATH)) {
            userType = USER_TYPE_ADMIN;
        }
    }

    return userType;
}

export function isLogin() {
    return !!localStorage.getItem('logged_in');
}

export function getTitlePage(title = '') {
    return title ? (title + ' | ' + trans('main.INFO_APPNAME')) : trans('main.INFO_APPNAME');
}

export function generatePathByUserType(adminPath, userPath, params = {}) {
    return generatePath(
        getUserType() === USER_TYPE_ADMIN ? adminPath : userPath,
        params
    )
}

export function getPath(contract) {
    return contract.path;
}

export function getEndpointByUserType(endpoint, params = {}) {
    let baseEndpoint = endpointConstants.BASE_USER;

    if (getUserType() === USER_TYPE_ADMIN) {
        baseEndpoint = endpointConstants.BASE_ADMIN;
    }
    return generatePath(
        endpointConstants.ROOT_URL + baseEndpoint + endpoint,
        params
    )
}

export function truncate(str, n, more = '...'){
    return (str.length > n) ? str.substr(0, n) + more : str;
}

export function getCommonsConfig() {
    return JSON.parse(localStorage.getItem('config')) || null;
}

export function getConfig(key) {
    const commonConfig = getCommonsConfig();
    return commonConfig[key];
}

export function getParamsWithSortDefault(query, columnSort, typeSort) {
    let params = queryString.parse(query);
    if (_.isEmpty(params)) {
        params['column_sort'] = columnSort;
        params['type_sort'] = typeSort;
    }
    return params;
}

function byteCount(s) {
    return encodeURI(s).split(/%..|./).length - 1;
}

export function checkInputSize(maxSize, event, callback) {
    const value = event.target.value;
    if (byteCount(value) <= maxSize) {
        callback(event);
    }
}

export function validateInputLength(maxSize, event, callback) {
    const value = event.target.value;
    if (value.length <= maxSize) {
        callback(event);
    }
}

export function focusInput(ref) {
    if (ref) {
        ref.focus();
    }
}

export function initLayout() {
    let body = $('body');
    let screen_w = screen.width;
    if (screen_w < 992) {
        body.addClass('sidebar-closed sidebar-collapse');
    }
}
