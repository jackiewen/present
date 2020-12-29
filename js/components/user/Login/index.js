import React from 'react';
import { USER_FORGOT_PASSWORD_PATH } from '../../../constants/path';
import { Link } from 'react-router-dom';
import {getPath} from "../../../helpers";

export default function Login(props) {
    return (
        <div className="login-box">
            <div className="login-logo login-logo-custom" />

            <div className="card">
                <div className="card-body login-card-body">
                    <p className="login-box-msg"><b>頭脳網</b></p>
                    <form action="" method="post" id="form-login" onSubmit={props.handleLoginSubmit}>
                        {props?.receiveDataLogin?.data?.message &&
                            <p className="text-danger">{props?.receiveDataLogin?.data?.message}</p>
                        }
                        <div className="input-group mb-3">
                            <input maxLength="20" type="text" onChange={props.handleChangeLogin} value={props?.dataInput?.company_id || ''}
                                   className={props.errors.company_id ? "form-control is-invalid" : "form-control"}
                                   placeholder="企業ID" name="company_id" id="company_id" />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fa fa-building" />
                                </div>
                            </div>
                            {props.errors.company_id && (
                                <span id="company_id-error" className="error invalid-feedback">{props.errors.company_id}</span>
                            )}
                        </div>
                        <div className="input-group mb-3">
                            <input
                                maxLength="50"
                                type="email" onChange={props.handleChangeLogin}
                                value={props?.dataInput?.email || ''}
                                className={props.errors.email ? "form-control is-invalid" : "form-control"}
                                placeholder="メールアドレス" name="email" id="email" />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                <span className="fas fa-envelope" />
                                </div>
                            </div>
                            {props.errors.email && (
                                <span id="email-error" className="error invalid-feedback">{props.errors.email}</span>
                            )}
                        </div>
                        <div className="input-group mb-3">
                            <input maxLength="20" type="password" onChange={props.handleChangeLogin} value={props?.dataInput?.password || ''}
                               className={props.errors.password ? "form-control is-invalid" : "form-control"}
                               placeholder="パスワード" name="password" id="password" />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                <span className="fas fa-lock" />
                                </div>
                            </div>
                            {props.errors.password && (
                                <span id="password-error" className="error invalid-feedback">{props.errors.password}</span>
                            )}
                        </div>
                        <div className="row">
                        <div className="col-8">
                            <div className="icheck-primary">
                            <input type="checkbox" onChange={props.handleChangeLogin || ''} id="remember" name="remember"  value={props?.dataInput?.remember || ''} />
                            <label htmlFor="remember" className="remember-me">
                                {trans('main.INFO_LBL_REMEMBER_ME')}
                            </label>
                            </div>
                        </div>

                        <div className="col-4">
                            <button onClick={props.handleLoginSubmit} type="submit" className="btn btn-primary btn-block" id="btn-login">ログイン</button>
                        </div>

                        </div>
                    </form>
                    <hr />
                    <p className="mb-1 forgot-password">
                        <Link to={getPath(USER_FORGOT_PASSWORD_PATH)}>パスワードを忘れた場合</Link>
                    </p>
                    </div>

                    <div className="card-footer">
                    <p><b>お問い合わせ</b></p>
                    <p className="contact-info-login">
                        下記電話番号、またはメールアドレスにご連絡ください<br/>
                        <b>電話番号：</b>0123-456-789<br/>
                        <b>メールアドレス：</b>zunoumou@race.co.jp<br/>
                    </p>
                </div>
            </div>
        </div>
    );

}
