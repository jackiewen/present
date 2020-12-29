import Axios from 'axios';
import React, { Component } from 'react';
import * as User from '../../../components/user';
import * as helpers from '../../../helpers';
import { ROOT_URL, USER_FORGOT_PASSWORD_ENDPOINT } from './../../../constants/endpoint';

export default class ForgotPasswordContainer extends Component {
    state = {
        code: '',
        message: ''
    };

    componentDidMount() {
        $('body').attr('class', '');
        $('body').attr('style', '');
        $('body').addClass('hold-transition login-page');
        document.title = helpers.getTitlePage(trans('main.SCN_LOGIN'));
    }

    handleSend = () => {
        axios.post(ROOT_URL + USER_FORGOT_PASSWORD_ENDPOINT, this.state)
            .then(json => {
                if (json.data?.message) {
                    this.setState({code: 'success', message: json.data.message});
                }
            })
            .catch(err => {
                if (err.response?.data?.errors?.email) {
                    this.setState({code: 'error', message: err.response?.data?.errors?.email || ''});
                } else if (err.message) {
                    this.setState({code: 'error', message: err.message});
                }
            });
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return <User.ForgotPassword
            {...this.state}
            handleChange={this.handleChange}
            handleSend={this.handleSend}
            code={this.state.code}
            message={this.state.message}
        />
    }
}
