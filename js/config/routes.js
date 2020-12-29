import * as User from './../containers/user';
import {PageDeveloping} from './../components/layouts';
import PageNotFound from './../components/PageNotFound';
import PageLimitRequest from './../components/PageLimitRequest';
import * as Admin from './../containers/admin';
import * as commonConstants from './../constants/common';
import Faq from "../components/partials/Faq";
import * as pathConstants from './../constants/path';
import {getPath} from "../helpers";
import { useStore } from 'react-redux';
import InterviewDetailContainer from "../containers/admin/InterviewDetailContainer";

export const routes = [
    {
        exact: "exact",
        path: getPath(pathConstants.USER_BASE_PATH),
        guard: commonConstants.USER_TYPE_USER,
        component: User.TopContainer,
    },
    {
        path: getPath(pathConstants.USER_PAGE_NOT_FOUND_PATH),
        guard: commonConstants.USER_TYPE_USER,
        component: PageNotFound,
    },
    {
        path: getPath(pathConstants.USER_LIMIT_REQUEST_PATH),
        guard: commonConstants.USER_TYPE_USER,
        component: PageLimitRequest,
    },
    {
        path: getPath(pathConstants.USER_ADVISER_DETAIL_PATH),
        guard: commonConstants.USER_TYPE_USER,
        component: User.DetailAdviserContainer,
    },
    {
        exact: "exact",
        path: getPath(pathConstants.USER_LIST_REQUEST_ADVISER_PATH),
        guard: commonConstants.USER_TYPE_USER,
        component: User.ListRequestAdviserContainer,
    },
    {
        path: getPath(pathConstants.USER_DETAIL_REQUEST_ADVISER_PATH),
        guard: commonConstants.USER_TYPE_USER,
        component: User.DetailRequestAdviserContainer,
    },
    {
        path: getPath(pathConstants.USER_LIST_INQUIRE_ADVISER_PATH),
        guard: commonConstants.USER_TYPE_USER,
        component: User.ListInquireAdviser,
    },
    {
        path: getPath(pathConstants.USER_LIST_INTERVIEW_SETTING_NEW_PATH),
        guard: commonConstants.USER_TYPE_USER,
        component: PageDeveloping,
    },
    {
        path: getPath(pathConstants.USER_FAVORITES_PATH),
        guard: commonConstants.USER_TYPE_USER,
        component: User.ListFavoriteContainer,
    },
    {
        path: getPath(pathConstants.USER_FAQ_PATH),
        guard: commonConstants.USER_TYPE_USER,
        component: Faq,
    },
    {
        path: getPath(pathConstants.USER_LIST_INTERVIEW),
        guard: commonConstants.USER_TYPE_USER,
        component: User.ListInterviewContainer,
    },
    {
        exact: "exact",
        path: getPath(pathConstants.ADMIN_BASE_PATH),
        guard: commonConstants.USER_TYPE_ADMIN,
        component: Admin.TopContainer,
    },
    {
        path: getPath(pathConstants.LIST_ACCOUNTS),
        guard: commonConstants.USER_TYPE_ADMIN,
        component: Admin.ListAccountContainer,
    },
    {
        exact: "exact",
        path: getPath(pathConstants.LIST_COMPANY),
        guard: commonConstants.USER_TYPE_ADMIN,
        component: Admin.ListCompanyContainer,
    },
    {
        path: getPath(pathConstants.LIST_ACCOUNT_COMPANY),
        guard: commonConstants.USER_TYPE_ADMIN,
        component: Admin.ListCompanyAccountsContainer,
    },
    {
        path: getPath(pathConstants.ADMIN_PAGE_NOT_FOUND_PATH),
        guard: commonConstants.USER_TYPE_ADMIN,
        component: PageNotFound,
    },
    {
        path: getPath(pathConstants.ADMIN_ADVISER_DETAIL_PATH),
        guard: commonConstants.USER_TYPE_ADMIN,
        component: Admin.DetailAdviserContainer,
    },
    {
        exact: "exact",
        path: getPath(pathConstants.ADMIN_LIST_ADVISER_SELECTION_PATH),
        guard: commonConstants.USER_TYPE_ADMIN,
        component: Admin.ListAdviserSelectionContainer,
    },
    {
        exact: "exact",
        path: getPath(pathConstants.ADMIN_DETAIL_ADVISER_SELECTION_PATH),
        guard: commonConstants.USER_TYPE_ADMIN,
        component: Admin.DetailAdviserSelectionContainer,
    },
    {
        path: getPath(pathConstants.ADMIN_CHOOSE_ADVISER_SELECTION_PATH),
        guard: commonConstants.USER_TYPE_ADMIN,
        component: Admin.ChooseAdviserContainer,
    },
    {
        path: getPath(pathConstants.ADMIN_INQUIRE_LIST_PATH),
        guard: commonConstants.USER_TYPE_ADMIN,
        component: Admin.ListInquiryContainer,
    },
    {
        path: getPath(pathConstants.ADMIN_INQUIRE_DETAIL),
        guard: commonConstants.USER_TYPE_ADMIN,
        component: Admin.InquiryDetailContainer,
    },
    {
        exact: "exact",
        path: getPath(pathConstants.ADMIN_INTERVIEWS_PATH),
        guard: commonConstants.USER_TYPE_ADMIN,
        component: Admin.ListInterviewContainer,
    },
    {
        path: getPath(pathConstants.ADMIN_INTERVIEWS_DETAIL_PATH),
        guard: commonConstants.USER_TYPE_ADMIN,
        component: Admin.InterviewDetailContainer,
    },
    {
        path: getPath(pathConstants.ADMIN_FAVORITES_PATH),
        guard: commonConstants.USER_TYPE_ADMIN,
        component: Admin.ListFavoriteContainer,
    },
    {
        path: getPath(pathConstants.ADMIN_FAQ_PATH),
        guard: commonConstants.USER_TYPE_ADMIN,
        component: Faq,
    },
    // {
    //     path: "/sub-menu",
    //     component: Public,
    //     routes: [
    //         {
    //             path: "/sub-menu/menu-item1",
    //             component: Public,
    //         },
    //         {
    //             path: "/sub-menu/menu-item2",
    //             component: Private,
    //         },
    //     ],
    // },
    {
        path: "*",
        component: PageNotFound,
    },
];
