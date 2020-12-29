import React from 'react';
import * as helpers from "../../../helpers";
import * as commonConstants from "../../../constants/common";

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let body = $('body');
        body.attr('class', '');
        body.attr('style', '');
        body.addClass('hold-transition login-page');
        document.title = helpers.getTitlePage(trans('main.SCN_ADMIN_LOGIN'));
    }

    handleChaneAccount = (e) => {
        this.props.handleChangeAccountEvent(e.target.value);
    };

    handleChangePassword = (e) => {
        this.props.handleChangePasswordEvent(e.target.value);
    };

    handleChangeRemember = (e) => {
        this.props.handleChangeRememberEvent(e.target.value);
    };

    render() {
        const errors = this.props.errors;
        const account = this.props.account;
        const password = this.props.password;
        const remember = this.props.remember_me;
        const validate = this.props.validateField;
        return (
            <div className="login-box">
                <div className="login-logo login-logo-custom" />
                { errors.length > 0 &&
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <div className="messages">
                            <span>{errors}</span>
                        </div>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                }
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg"><b>頭脳網</b></p>
                        <p className="login-msg"><b>管理者ページログイン</b></p>
                        <form action="" method="post" id="form-login" onSubmit={this.props.handleSubmit}>
                            <div className="input-group mb-3">
                                <input type="text"
                                       className={ validate.hasOwnProperty('account') ? "form-control is-invalid" : "form-control"}
                                       placeholder="ユーザー名" value={account} onChange={this.handleChaneAccount} />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-user" />
                                        </div>
                                    </div>
                                {
                                    validate.hasOwnProperty('account') &&
                                    <span id="account-error" className="error invalid-feedback">{validate.account}</span>
                                }
                            </div>
                            <div className="input-group mb-3">
                                <input type="password"
                                       className={validate.hasOwnProperty('password') ? "form-control is-invalid" : "form-control"}
                                       placeholder="パスワード" value={password} onChange={this.handleChangePassword} />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-lock" />
                                        </div>
                                    </div>
                                {
                                    validate.hasOwnProperty('password') &&
                                    <span id="password-error" className="error invalid-feedback">{validate.password}</span>
                                }
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <div className="icheck-primary">
                                        <input type="checkbox" id="remember" value={remember} onChange={this.handleChangeRemember}/>
                                            <label htmlFor="remember" className="remember-me">
                                                {trans('main.INFO_LBL_REMEMBER_ME')}
                                            </label>
                                    </div>
                                </div>
                                <div className="col-12 mt-3">
                                    <button type="submit" className="btn btn-primary btn-block" id="btn-login"
                                            onClick={this.props.handleSubmit}>ログイン
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginComponent;
