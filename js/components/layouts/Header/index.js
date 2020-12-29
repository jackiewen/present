import React from 'react';
import {NavLink, Link} from "react-router-dom";
import * as Path from "../../../constants/path";
import { useDispatch } from 'react-redux'
import {openModal} from "../../../actions/modal";
import ModelContainer from "../../../containers/partials/ModelContainer";
import Breadcrumbs from "../Breadcrumbs";
import {getPath, getUserType} from "../../../helpers";
import {USER_TYPE_ADMIN} from "../../../constants/common";
import {
    ADMIN_FAQ_PATH,
    USER_FAQ_PATH
} from "../../../constants/path";

export default function Header(props) {
    const dispatch = useDispatch();
    let faqPath = getUserType() === USER_TYPE_ADMIN ? ADMIN_FAQ_PATH : USER_FAQ_PATH;
    return (
        <React.Fragment>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <Breadcrumbs sidebar={props.sidebar} />
                    </li>

                </ul>

                <ul className="navbar-nav ml-auto">

                    {(props.is_admin && props.user_info?.roles === "1") && (
                        <li className="nav-item dropdown">
                            <a className="nav-link nav-link-custom" data-toggle="dropdown" href="#">
                                <i className="fas fa-cog mr-2 nav-link-icon-custom"/>
                            </a>
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                                <span className="dropdown-item dropdown-header">
                                    {trans('main.SCN_DASHBOARD')}
                                </span>
                                <div className="dropdown-divider"/>
                                <NavLink exact key={"navlink-list-acc"} to={ getPath(Path.LIST_ACCOUNTS) } className="dropdown-item">
                                    <span>{trans('main.SCN_ACT_INHOUSE')}</span>
                                </NavLink>
                                <div className="dropdown-divider"/>
                                <NavLink exact key={"navlink-list-com"} to={ getPath(Path.LIST_COMPANY) } className="dropdown-item">
                                    <span>{trans('main.SCN_COMPANY')}</span>
                                </NavLink>
                            </div>
                        </li>
                    )}

                    <li className="nav-item">
                        <Link to={faqPath.path} className="nav-link nav-link-custom">
                            <i className="fas fa-question-circle nav-link-icon-custom mr-2" />
                            <span className="d-none d-sm-block">{ trans('main.SCN_FAQ') }</span>
                        </Link>
                    </li>

                    <li className="nav-item dropdown">
                        <a className="nav-link nav-link-custom" data-toggle="dropdown" href="#" id="my-toggle-button">
                            <i className="fas fa-user-circle nav-link-icon-custom mr-2" />
                            <span className="d-none d-sm-block">{ props.user_info?.name }</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            {!props.is_admin && (
                                <a href="#" className="dropdown-item" onClick={() => dispatch(openModal({name: 'ProfileModal', data: {}}))}>
                                    <i className="fas fa-user-circle sub-nav-link-icon-custom mr-1" />
                                    <span>{ props.user_info?.name }</span>
                                </a>
                            )}
                            <div className="dropdown-divider" />
                            <a href="#" className="dropdown-item" onClick={props.handleSubmitLogout}>
                                <i className="fas fa-power-off sub-nav-link-icon-custom mr-1" />
                                <span>{ trans('main.SCN_LOGOUT') }</span>
                            </a>
                        </div>
                    </li>
                    <li className="nav-item d-none d-xl-block">
                        <a className="nav-link nav-link-custom"><b>{trans('main.INFO_LBL_LAST_LOGIN')}<br/>{moment(props.last_login).format('YYYY年MM月DD日 HH:mm')}</b></a>
                    </li>
                </ul>
            </nav>
            <ModelContainer
                modal={props.modal}
                handleChangeUserInfo={props.handleChangeUserInfo}
            />
        </React.Fragment>
    );

}
