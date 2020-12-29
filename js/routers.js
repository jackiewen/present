import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { routes } from './config/routes.js';

import * as commonConstants from './constants/common';
import * as pathConstants from './constants/path';
import * as helpers from './helpers';

import * as UserContainer from './containers/user';
import * as AdminContainer from  './containers/admin';
import { getPath } from "./helpers";

import AppContainer from './AppContainer';

function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            render={props => (
                <route.component {...props} routes={route.routes} />
            )}
        />
    );
}

function PrivateRoute(route) {
    let isLogin = helpers.isLogin();
    let body = $('body');
    let isRedirect = false;

    let redirectTo = getPath(pathConstants.USER_LOGIN_PATH);
    if (route.guard === commonConstants.USER_TYPE_ADMIN) {
        redirectTo = getPath(pathConstants.ADMIN_LOGIN_PATH);
    }


    if (isLogin) {
        body.attr('class', '');
        body.addClass('hold-transition sidebar-mini layout-fixed');

        if (route.guard !== helpers.getUserType()) {
            isRedirect = true;
            redirectTo = getPath(pathConstants.USER_PAGE_NOT_FOUND_PATH);
            if (helpers.getUserType() === commonConstants.USER_TYPE_ADMIN) {
                redirectTo = getPath(pathConstants.ADMIN_PAGE_NOT_FOUND_PATH);
            }
        }
    }
    return isLogin && !isRedirect ? (
        <AppContainer {...route}>
            <RouteWithSubRoutes {...route} />
        </AppContainer>
    ) : (
        <Redirect
            to={{
                pathname: redirectTo,
                state: { from: route.path }
        }}/>
    )
}

function UserLoginRoute(route) {
    let isLogin = false;

    if (helpers.isLogin() && helpers.getUserType() === commonConstants.USER_TYPE_ADMIN) {
        return (
            <Redirect
                to={{
                    pathname: getPath(pathConstants.ADMIN_BASE_PATH),
                    state: { from: route.path }
                }}/>
        );
    }

    if (helpers.isLogin() && helpers.getUserType() === commonConstants.USER_TYPE_USER) {
        isLogin = true;
    }
    // isLogin = true;
    return !isLogin ? (
        <Route path={route.path} component={UserContainer.LoginContainer} />
    ) :
    (
        <Redirect
            to={{
                pathname: getPath(pathConstants.USER_BASE_PATH),
                state: { from: route.path }
        }}/>
    )
    // window.location = '/';
}

function AdminLoginRoute(route) {
    let isLogin = false;

    if (helpers.isLogin() && helpers.getUserType() === commonConstants.USER_TYPE_USER) {
        return (
            <Redirect
                to={{
                    pathname: getPath(pathConstants.USER_BASE_PATH),
                    state: { from: route.path }
                }}/>
        );
    }

    if (helpers.isLogin() && helpers.getUserType() === commonConstants.USER_TYPE_ADMIN) {
        isLogin = true;
    }
    return !isLogin ? (
        <Route path={route.path} component={AdminContainer.LoginContainer} />
    ) : (
        <Redirect
            to={{
                pathname: getPath(pathConstants.ADMIN_BASE_PATH),
                state: { from: route.path }
        }}/>
    )
}

export default (
    <Switch>
        <UserLoginRoute path={ getPath(pathConstants.USER_LOGIN_PATH) } component={UserContainer.LoginContainer} />
        <AdminLoginRoute path={ getPath(pathConstants.ADMIN_LOGIN_PATH) } component={AdminContainer.LoginContainer} />

        <Route path={getPath(pathConstants.USER_FORGOT_PASSWORD_PATH)} component={UserContainer.ForgotPasswordContainer} />
        {routes.map( (route, i) => (
            <PrivateRoute key={i} {...route} />
        ))}
    </Switch>
);
