import {USER_TYPE_ADMIN} from "./constants/common";

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './configureStore';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import RootContainer from './RootContainer';
import * as helpers from './helpers';
import { NOTIFY_ENDPOINT } from './constants/endpoint';

const store = configureStore();

// helpers.setAccessTokenHeader();
helpers.InterceptorsResponse();

let isFetchingNotify = false;
const countDownLogin = 2000;
const countDownNotify = 300000; // 5 minutes

const getNotify = () => {
    if (!isFetchingNotify) {
        isFetchingNotify = true;
        const path = helpers.getEndpointByUserType(NOTIFY_ENDPOINT);
        axios.get(path).then(json => {
            isFetchingNotify = false;
            localStorage.setItem('notify', JSON.stringify(json.data));
            if (json.data) {
                Object.keys(json.data).map((key) => {
                    let newKey = key.replace('.', '_');
                    if (json.data[key] && json.data[key] > 0) {
                        $('#p-' + newKey).find('#span-' + newKey).remove();
                        $('#p-' + newKey).append('<span id="span-' + newKey + '" class="badge badge-danger right">' + json.data[key] + '</span>')
                    } else {
                        $('#p-' + newKey).find('#span-' + newKey).remove();
                    }

                })
            }
        }).catch( err => {
            isFetchingNotify = false;
        });
    }
}

const checkLoggedIn = () => {
    if (localStorage.getItem('logged_in') && localStorage.getItem('user_type')) {
        clearInterval(intervalCheckLogin);
        getNotify();
        setInterval(getNotify, countDownNotify);
    }
}

let intervalCheckLogin = setInterval(checkLoggedIn, countDownLogin);

ReactDOM.render(
        <Provider store={store}>
            <Router>
                <RootContainer />
            </Router>
        </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
