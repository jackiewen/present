import React from 'react';
import {adminLoginIfNeeded} from "../../../actions/admin_login";
import {connect} from "react-redux";
import * as Admin from "../../../components/admin";
import * as helpers from "../../../helpers";
import * as commonConstants from "../../../constants/common";
import { ADMIN_BASE_PATH } from "../../../constants/path";


class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: '',
            remember_me: '',
            validateForm: {},
            errors: '',
            receiveDataLogin: {}
        };
    }

    isLogin = false;

    handleAccountChange = (account) => {
        this.setState({
            account: account
        });
    };

    handlePasswordChange = (password) => {
        this.setState({
            password: password
        })
    };

    handleRememberChange = (remember) => {
        this.setState({
            remember_me: remember
        });
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!_.isEmpty(prevState.validateForm)) {
            return {
                receiveDataLogin: {},
                errors: ''
            };
        }
        if (!_.isEqual(nextProps.adminLogin.receiveData ,prevState.receiveDataLogin))
        {
            if(nextProps?.adminLogin?.receiveData?.logged_in !== 'undefined' && nextProps?.adminLogin?.receiveData?.logged_in !== '') {
                helpers.setLogin({
                    'logged_in': nextProps?.adminLogin?.receiveData?.logged_in || '',
                    'user_type': commonConstants.USER_TYPE_ADMIN,
                    'auth': nextProps?.adminLogin?.receiveData?.info || ''
                });

                window.location = helpers.getPath(ADMIN_BASE_PATH);
                // nextProps.history.push(helpers.getPath(ADMIN_BASE_PATH));
            }

            return { receiveDataLogin: nextProps?.adminLogin?.receiveData, errors: '' };
        }
        if (nextProps?.adminLogin?.errors) {
            return {
                receiveDataLogin: {},
                errors: nextProps?.adminLogin?.errors
            };
        }
        return null;
    }

    componentDidUpdate() {
        if (!this.state?.receiveDataLogin?.logged_in) {
            this.isLogin = false;
        }
    }

    validateForm = (params) => {
        let messages = {};
        Object.keys(params).forEach(function (element) {
            if (params[element] === '' && element !== 'remember')
            {
                messages[element] = trans('main.EVAL_REQUIRED', {
                    'attribute': trans('main.INFO_LBL_' + element.toUpperCase())
                });
            }
        });
        return messages;
    };

    handleSubmit = (e) => {
        let params = {
            account: this.state.account,
            password: this.state.password,
            remember: this.state.remember_me
        };
        let messages = this.validateForm(params);
        if(Object.keys(messages).length === 0)
        {
            if (!this.isLogin) {
                this.setState({validateForm: {}}, () => {
                    this.isLogin = true;
                    this.props.adminLoginIfNeeded(params);
                });

            }
        }
        else
        {
            this.setState({
                validateForm: messages
            });
        }
        e.preventDefault();
    };

    render() {
        const account = this.state.account;
        const password = this.state.password;
        const remember_me = this.state.remember_me;
        const validateField = this.state.validateForm;
        const errors = this.state.errors || '';

        return (
            <Admin.LoginComponent
                errors={errors}
                account={account}
                passward={password}
                remember_me={remember_me}
                validateField={validateField}
                handleChangeAccountEvent={this.handleAccountChange}
                handleChangePasswordEvent={this.handlePasswordChange}
                handleChangeRememberEvent={this.handleRememberChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }

}

const mapStateToProps = state => {
    const { adminLogin } = state;
    return {
        adminLogin
    };
};

const mapDispatchToProps = dispatch => ({
    adminLoginIfNeeded: (postData) => dispatch(adminLoginIfNeeded(postData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
