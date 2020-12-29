import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as User from '../../../components/user';

import { userLoginIfNeeded } from '../../../actions/user_login';

import * as commonConstants from './../../../constants/common';

import * as helpers from './../../../helpers';
import { USER_BASE_PATH } from "../../../constants/path";

class LoginContainer extends Component {
    state = {
        dataInput: {},
        receiveDataLogin: {},
        errors: {}
    };

    isLogin = false;

    componentDidMount() {
        let body = $('body');
        body.attr('class', '');
        body.attr('style', '');
        body.addClass('hold-transition login-page');
        if($('.modal-backdrop.fade.show').length > 0){
            $('.modal-backdrop.fade.show').remove();
        }
        document.title = helpers.getTitlePage(trans('main.SCN_LOGIN'));
    }

    componentDidUpdate() {
        if (!this.state?.receiveDataLogin?.logged_in) {
            this.isLogin = false;
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!_.isEmpty(prevState.errors)) {
            return { receiveDataLogin: {} };
        }
        if (!_.isEqual(nextProps.userLogin.receiveData, prevState.receiveDataLogin)) {
            if (nextProps?.userLogin?.receiveData?.status === true) {
                helpers.setLogin({
                    'logged_in': nextProps?.userLogin?.receiveData?.logged_in || '',
                    'user_type': commonConstants.USER_TYPE_USER,
                    'auth': nextProps?.userLogin?.receiveData?.info || ''
                });
                window.location = helpers.getPath(USER_BASE_PATH);
                // nextProps.history.push(helpers.getPath(USER_BASE_PATH));
            }
            return { receiveDataLogin: nextProps?.userLogin?.receiveData };
        }
        return null;
    }

    validateForm = () => {
        let rules = {
            company_id: {
                required: true,
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
            },
        };

        let validatorMS = $('#form-login').validate({
            rules: rules,
            messages: {
                company_id: {
                    required: trans('main.EVAL_REQUIRED', {'attribute': trans('main.INFO_LBL_COMPANY_ID')}),
                },
                email: {
                    required: trans('main.EVAL_REQUIRED', {'attribute': trans('main.INFO_LBL_EMAIL')}),
                    email: trans('main.EVAL_EMAIL_INVALID')
                },
                password: {
                    required: trans('main.EVAL_REQUIRED', {'attribute': trans('main.INFO_LBL_PASSWORD')}),
                },
            },
            invalidHandler: (event, validator) => {
                this.setState({
                    errors: validator.errorMap
                });
            },
            errorPlacement: (error, element) => {

            },
        });
    };

    handleLoginSubmit = (e) => {
        this.validateForm();
        let valid = $('#form-login').valid();
        if(valid) {
            if (!this.isLogin) {
                this.setState({errors: {}}, () => {
                    this.isLogin = true;
                    this.props.userLoginIfNeeded(this.state.dataInput);
                });
            }
        }
        e.preventDefault();
    };

    handleChangeLogin = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState(prevState => ({
            dataInput: {
                ...prevState.dataInput,
                [name]: value
            }
        }))
    };

    render() {
        return <User.Login
            dataInput={this.state.dataInput}
            receiveDataLogin={this.state.receiveDataLogin}
            handleLoginSubmit={this.handleLoginSubmit}
            handleChangeLogin={this.handleChangeLogin}
            errors={this.state.errors}
        />;
    }
}

const mapStateToProps = state => {
    const { userLogin } = state;
    return {
        userLogin
    };
}

const mapDispatchToProps = dispatch => ({
    userLoginIfNeeded: (postData) => dispatch(userLoginIfNeeded(postData)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
