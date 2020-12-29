/**
 * This file contains api endpoint path constants
 */

export const ROOT_URL = '';

export const USER_FORGOT_PASSWORD_ENDPOINT = '/users/forgot-password/send-mail';
export const USER_LOGIN_ENDPOINT = '/users/login';
export const USER_LOGOUT_ENDPOINT = '/users/logout';
export const USER_PROFILE_ENDPOINT = '/users/profile';
export const USER_PROFILE_UPDATE_ENDPOINT = '/users/profile/:id/update';
export const USER_PASSWORD_UPDATE_ENDPOINT = '/users/profile/:id/password-update';
export const USER_REQUEST_ADVISER_ENDPOINT = '/users/request-advisers';
export const USER_DETAIL_REQUEST_ADVISER_ENDPOINT = '/users/request-advisers/:id';
export const USER_SELECTED_REQUEST_ADVISER_ENDPOINT = '/users/request-advisers/:id/selected-advisers';

export const USER_FAVORITES_ENDPOINT = '/users/favorites';
export const USER_INTERVIEWS = '/users/interviews';
export const USER_INTERVIEWS_COMMENTS_CREATE = '/users/interviews/:id/comments/create';
export const USER_INTERVIEWS_CANCEL = '/users/interviews/cancel';
export const USER_INTERVIEWS_COMMENTS_LOAD_MORE = '/users/interviews/:id/comments';
export const USER_INTERVIEWS_CREATE = '/users/interviews/create';

/**
 * Admin
 * @type {string}
 */
export const ADMIN_LOGIN_ENDPOINT = '/admins/login';
export const ADMIN_LOGOUT_ENDPOINT = '/admins/logout';

export const ADMIN_FOR_SELECT = '/admins/admins';
export const ADMIN_LIST_ACC = '/admins/accounts/staff';
export const ADMIN_CREATE_ACC = '/admins/accounts/staff/create';
export const ADMIN_UPDATE_ACC = '/admins/accounts/staff/:id/update';

export const ADMIN_ADVISER_SELECTION_ENDPOINT = '/admins/adviser-selection';
export const ADMIN_DETAIL_ADVISER_SELECTION_ENDPOINT = '/admins/adviser-selection/:id';
export const ADMIN_SELECTED_ADVISER_SELECTION_ENDPOINT = '/admins/adviser-selection/:id/selected-advisers';
export const ADMIN_ADVISER_SELECTION_CHANGE_PIC_ENDPOINT = '/admins/adviser-selection/:id/change-race-user';
export const ADMIN_ADVISER_SELECTION_CONFIRM_SEND_ENDPOINT = '/admins/adviser-selection/:id/confirm-send';
export const ADMIN_ADVISER_SELECTION_SAVE_ADVISER_ENDPOINT = '/admins/adviser-selection/:id/save-adviser';

export const ADMIN_FAVORITES_ENDPOINT = '/admins/favorites';

export const COMPANY_LIST = '/admins/company';
export const COMPANY_CREATE = '/admins/company/create';
export const COMPANY_UPDATE= '/admins/company/:id/update';
export const COMPANY_DELETE= '/admins/company/:id/delete';

export const COMPANY_ACC_LIST = '/admins/company/:id/accounts';
export const COMPANY_ACC_CREATE = '/admins/company/:id/accounts/create';
export const COMPANY_ACC_UPDATE = '/admins/company/:id/accounts/:acc_id/update';

export const ADMINS_INTERVIEWS = '/admins/interview';
export const ADMINS_INTERVIEW_DETAIL = '/admins/interview/:id/detail';
export const ADMINS_INTERVIEW_UPDATE_ADMIN = '/admins/interview/:id/update-admin';
export const ADMINS_INTERVIEW_UPDATE_DATE = '/admins/interview/:id/update-date';
export const ADMINS_INTERVIEW_CONFIRM_CANCEL = '/admins/interview/:id/confirm-cancel';
export const ADMINS_INTERVIEWS_COMMENTS_CREATE = '/admins/interview/:id/comments/create';
export const ADMINS_INTERVIEWS_COMMENTS_LOAD_MORE = '/admins/interview/:id/comments';
export const USER_INQUIRE_COMMENTS_CREATE = '/users/inquires/:id/comments/create';
export const USER_INQUIRE_COMMENTS_LOAD_MORE = '/users/inquires/:id/comments';

export const ADMINS_INQUIRE = '/admins/inquire';
export const ADMINS_INQUIRE_DETAIL = '/admins/inquire/:id';
export const ADMINS_INQUIRE_UPDATE_ADMIN = '/admins/inquire/:id/update-admin';
export const ADMINS_INQUIRE_COMMENTS_CREATE = '/admins/inquire/:id/comments/create';
export const ADMINS_INQUIRE_COMMENTS_LOAD_MORE = '/admins/inquire/:id/comments';


export const SEARCH_INQUIRE_ENDPOINT = '/users/inquires';


export const CREATE_REQUEST_ADVISER_ENDPOINT = '/users/request-advisers/create';


export const CREATE_INQUIRE_ENDPOINT = '/users/inquires/create';


// common endpoint
export const BASE_USER = '/users';
export const BASE_ADMIN = '/admins';
export const COMMONS_ADMIN_CONFIG = '/admins/commons-config';
export const COMMONS_USER_CONFIG = '/users/commons-config';

export const SEARCH_ADVISER_ENDPOINT = '/advisers';
export const DETAIL_ADVISER_ENDPOINT = '/advisers/:id';
export const DOC_ADVISER_ENDPOINT = '/advisers/:id/doc';
export const SEARCH_RELATED_ADVISER_ENDPOINT = '/related-advisers';
export const POPULAR_KEYWORD_ENDPOINT = '/popular-keywords';
export const TOGGLE_FAVORITE_ENDPOINT = '/toggle-favorite';
export const LAST_LOGIN_ENDPOINT = '/last-login';
export const NOTIFY_ENDPOINT = '/notify';
export const DOWNLOAD_ADVISER_ENDPOINT = '/download-advisers/:id';
export const OPTION_ADVISER_SEARCH_ENDPOINT = '/option-adviser-search';
export const SEARCH_OPTIONS_ENDPOINT = '/search-options/:type';

