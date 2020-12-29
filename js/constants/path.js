/**
 * This file contains path constants
 */


export const USER_BASE_PATH = {path: '/', route: 'users.base'};
export const USER_LOGIN_PATH = {path: '/login', route: 'users.login'};
export const USER_PAGE_NOT_FOUND_PATH = {path: '/404', route: 'users.404'};
export const USER_PAGE_502_PATH = {path: '/502', route: 'users.502'};
export const USER_PAGE_500_PATH = {path: '/500', route: 'users.500'};
export const USER_ADVISER_DETAIL_PATH = {path: '/advisers/:id', route: 'users.adviser_detail'};
export const USER_LIST_REQUEST_ADVISER_PATH = {path: '/request-advisers', route: 'users.list_request_adviser'};
export const USER_DETAIL_REQUEST_ADVISER_PATH = {path: '/request-advisers/:id', route: 'users.detail_request_adviser'};
export const USER_LIST_INQUIRE_ADVISER_PATH = {path: '/list-inquire-adviser', route: 'users.list_inquire_adviser'};

export const USER_FORGOT_PASSWORD_PATH = {path:'/forgot-password', route: 'users.forgot_password'};
export const USER_LIST_INTERVIEW = {path: '/interview-setting', route: 'users.interview'};

export const USER_LIST_INTERVIEW_SETTING_NEW_PATH = {path: '/interview-setting-new', route: 'users.interview_setting_new'};
export const USER_FAVORITES_PATH = {path: '/favorites', route: 'users.favorites'};
export const USER_FAQ_PATH = {path: '/faq', route: 'users.faq'};
export const USER_LIMIT_REQUEST_PATH = {path: '/limit-request', route: 'users.limit_request'};


export const ADMIN_BASE_PATH = {path: '/admin', route: 'admins.base'};
export const ADMIN_LOGIN_PATH = {path: '/admin/login', route: 'admins.login'};

export const LIST_ACCOUNTS = {path: '/admin/accounts', route: 'admins.race_users'};
export const LIST_COMPANY = {path: '/admin/companies', route: 'admins.company'};
export const LIST_ACCOUNT_COMPANY = {path: '/admin/companies/:id/accounts', route: 'admins.company_user'};

export const ADMIN_PAGE_NOT_FOUND_PATH = {path: '/admin/404', route: 'admins.404'};
export const ADMIN_PAGE_502_PATH = {path: '/admin/502', route: 'admins.502'};
export const ADMIN_PAGE_500_PATH = {path: '/admin/500', route: 'admins.500'};

export const ADMIN_ADVISER_DETAIL_PATH = {path: '/admin/advisers/:id', route: 'admins.adviser_detail'};
export const ADMIN_LIST_ADVISER_SELECTION_PATH = {path: '/admin/adviser-selection', route: 'admins.list_adviser_selection'};
export const ADMIN_DETAIL_ADVISER_SELECTION_PATH = {path: '/admin/adviser-selection/:id', route: 'admins.detail_adviser_selection'};
export const ADMIN_CHOOSE_ADVISER_SELECTION_PATH = {path: '/admin/adviser-selection/:id/choose-adviser', route: 'admins.choose_adviser_selection'};

export const ADMIN_INQUIRE_LIST_PATH = {path: '/admin/inquiry-list', route: 'admins.inquiry_list'};
export const ADMIN_INQUIRE_DETAIL = {path: '/admin/inquiry/:id', route: 'admin.inquiry_detail'};
export const ADMIN_INTERVIEWS_PATH = {path: '/admin/interview-setting', route: 'admins.interview'};
export const ADMIN_INTERVIEWS_DETAIL_PATH = {path: '/admin/interview-setting/:id', route: 'admins.interview_detail'};
export const ADMIN_FAVORITES_PATH = {path: '/admin/favorites', route: 'admins.favorites'};
export const ADMIN_FAQ_PATH = {path: '/admin/faq', route: 'admins.faq'};
