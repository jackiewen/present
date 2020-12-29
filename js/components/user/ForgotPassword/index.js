import React from 'react';
import { USER_LOGIN_PATH } from '../../../constants/path';
import { Link } from 'react-router-dom';
import {getPath} from "../../../helpers";

export default function ForgotPassword(props) {
    return (
        <div className="login-box" style={{width: '450px'}}>
            <div className="login-logo login-logo-custom" />

            <div className="card">
                <div className="card-body login-card-body">
                    <form action="" method="post" id="form-login">
                        <p style={{fontSize: '12px', textAlign: 'center'}}>パスワードを忘れた場合、登録されているメールアドレスを入力してください。パスワードのリセットメールを送信します。</p>
                        {props.code == 'success' &&
                            <p className="text-center text-success">{props.message}</p>
                        }
                        {props.code != 'success' &&
                        <React.Fragment>
                        <div className="form-group mb-3">
                            <div className="input-group">
                                <input type="email" onChange={props.handleChange} value={props.email || ''} className="form-control" placeholder="メールアドレス" name="email" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                    <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            {props.code == 'error' &&
                                <React.Fragment><span className="text-danger">{props.message}</span><br/></React.Fragment>
                            }
                        </div>

                        <div className="row mb-2">
                            <div className="col-12">
                                <button onClick={props.handleSend} type="button" className="btn btn-primary btn-block" id="btn-login">送信</button>
                            </div>
                        </div>
                        </React.Fragment>
                        }
                        <div className="row">
                            <div className="col-12 text-center">
                                <Link to={getPath(USER_LOGIN_PATH)} >ログイン</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}
