import React from 'react';
import ProgressBar from './../partials/ProgressBar';
import './profile.css';
import { USER_PROFILE_ENDPOINT, USER_PROFILE_UPDATE_ENDPOINT, USER_PASSWORD_UPDATE_ENDPOINT } from "../../../../constants/endpoint";
import { generatePath } from "react-router";
import {connect} from "react-redux";
import CompleteMessage from "../../CompleteMessage";


class ProfileModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            password_current: '',
            password: '',
            password_confirmation: '',
        };
        this.isFetching = false;
        this.isFetchingSubmit = false;
    }

    componentDidMount() {
        this.userInfo();
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if(_.isEmpty(this.props.modal.data) && this.props.modal.isOpen) {
            this.userInfo();
        }
        if (prevProps.modal.isOpen && !this.props.modal.isOpen) {
            if(!_.isEmpty(this.state.errors)) {
                this.setState({errors: {}});
            }
            this.setState({password_current: '', password: '', password_confirmation:''})
        }
    };

    handleNextStep = (e) => {
        let step = $(e.target).data('step');
        $('.block').hide();
        $('.' + step + '-block').show();
        this.props.handleClickNext();
    };

    handleChangeCurrentPassword = (e) => {
        this.setState({
            password_current: e.target.value
        })
    };

    handleChangePassword = (e) => {
          this.setState({
              password: e.target.value
          })
    };

    handleChangeConfirmPassword = (e) => {
        this.setState({
            password_confirmation: e.target.value
        })
    };

    userInfo = () => {
        if(!this.isFetching && _.isEmpty(this.props.modal.data)) {
            this.isFetching= true;
            axios.get(USER_PROFILE_ENDPOINT)
                .then( rs => {
                    let data = {
                        division: rs.data.data.division,
                        email: rs.data.data.email,
                        first_name: rs.data.data.first_name,
                        first_name_trans: rs.data.data.first_name_trans,
                        last_name: rs.data.data.last_name,
                        last_name_trans: rs.data.data.last_name_trans,
                        name: rs.data.data.name,
                        id: rs.data.data.id,
                    };
                    this.props.handleUpdateData(data);
                    this.isFetching = false;
                })
                .catch( err => {
                    switch (err.response.status) {
                        case 422:
                            let data = err.response.data;
                            let mess = {};
                            Object.keys(data.errors).forEach((element) => {
                                mess[element] = data.errors[element].join(', ')
                            });
                            this.setState({
                                errors: mess,
                            });
                            break;
                        case 500:
                            this.setState({
                                errors: {commons: [err.response.data]},
                            });
                            break;
                    }
                    this.isFetching = false;
                })
        }
    };

    handleUpdateInfo = () => {
        if(!this.isFetchingSubmit) {
            this.isFetchingSubmit = true;
            axios.post(generatePath(USER_PROFILE_UPDATE_ENDPOINT, {id: this.props.modal.data.id}), this.props.modal.data)
                .then( rs => {
                    this.isFetchingSubmit = false;
                    let info = JSON.parse(localStorage.getItem('info'));
                    info.name = rs.data.name;
                    localStorage.setItem('info', JSON.stringify(info));
                    this.props.handleChangeUserInfo(info);
                    this.props.handleClickNext();
                })
                .catch( err => {
                    switch (err.response.status) {
                        case 422:
                            let data = err.response.data;
                            let mess = {};
                            Object.keys(data.errors).forEach((element) => {
                                mess[element] = data.errors[element].join(', ')
                            });
                            this.setState({errors: mess});
                            break;
                        case 500:
                            this.setState({errors: {commons: [err.response.data]}});
                            break;
                    }
                    this.isFetchingSubmit = false
                })
        }
    };

    handleUpdatePass = () => {
        if(!this.isFetchingSubmit) {
            this.isFetchingSubmit = true;
            axios.post(generatePath(USER_PASSWORD_UPDATE_ENDPOINT, {id: this.props.modal.data.id}), {
                password_current: this.state.password_current,
                password: this.state.password,
                password_confirmation: this.state.password_confirmation,
            })
                .then( rs => {
                    this.isFetchingSubmit = false;
                    this.props.handleClickNext();
                })
                .catch( err => {
                    switch (err.response.status) {
                        case 422:
                            let data = err.response.data;
                            let mess = {};
                            Object.keys(data.errors).forEach((element) => {
                                mess[element] = data.errors[element].join(', ')
                            });
                            this.setState({errors: mess});
                            break;
                        case 500:
                            this.setState({errors: {commons: [err.response.data]}});
                            break;
                    }
                    this.isFetchingSubmit = false
                })
        }
    };

    render() {
        return (
            <div className="modal fade modal-processbar" id="ProfileModal" data-backdrop="static" data-keyboard="false"
                 tabIndex="-1" aria-labelledby="modelAskAdviserLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h5 className="modal-title w-100" id="modelAskAdviserLabel"><b>{ trans('main.INFO_LBL_PROFILE') }</b></h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.handleClickClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body pt-4">
                            <form>
                                <ProgressBar items={['first', 'check', 'done']} step={this.props.modal.step} />
                                <div className="row">
                                    <div className="col-md-12 pt-5 mx-0 msform">
                                        <fieldset className="first-block">
                                            <div className="card">
                                                <div className="card-body check-block" style={{padding: '25px'}}>
                                                    <div className="row">
                                                        <div className="col-md-3 pb-2">
                                                            <b>{ trans('main.INFO_NAME') }: </b>
                                                        </div>
                                                        <div className="col-md-9 pb-2">
                                                            {this.props.modal.data.name || ''}
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-3 pt-2 pb-2">
                                                            <b>{ trans('main.INFO_NAME_KANA')}: </b>
                                                        </div>
                                                        <div className="col-md-9 pt-2 pb-2">
                                                        { this.props.modal.data.last_name_trans || ''} { this.props.modal.data.first_name_trans || '' }
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-3 pt-2 pb-2">
                                                            <b>{trans('main.INFO_LBL_DIVISION_FORM')}: </b>
                                                        </div>
                                                        <div className="col-md-9 pt-2 pb-2">
                                                        { this.props.modal.data.division }
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-3 pt-2">
                                                            <b>{trans('main.INFO_LBL_EMAIL')}: </b>
                                                        </div>
                                                        <div className="col-md-9 pt-2">
                                                        { this.props.modal.data.email }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-100 text-center">
                                                <button type="button" className="btn btn-primary ms-next mx-2"
                                                        data-step="info" onClick={this.handleNextStep}> {trans('main.INFO_BTN_UPDATE_INFO')}
                                                </button>
                                                <button type="button" className="btn btn-info ms-next mx-2"
                                                        data-step="password" onClick={this.handleNextStep}> {trans('main.INFO_BTN_UPDATE_PASSWORD')}
                                                </button>
                                                <button type="button" className="btn btn-secondary mx-2"
                                                        data-dismiss="modal" onClick={this.props.handleClickClose}> {trans('main.INFO_LBL_CLOSE')}
                                                </button>
                                            </div>
                                        </fieldset>
                                        <fieldset>
                                            <div className="card">
                                                <div className="card-body">
                                                    { this.state.errors.commons && (
                                                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                                            <div className="messages">
                                                                {this.state.errors.commons.map( (element, index) => (
                                                                    <span key={index}>{element}</span>
                                                                ))}
                                                            </div>
                                                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                    )}

                                                    <div className="info-block block">
                                                        <div className="form-group row">
                                                            <label className="form-group mb-0 align-self-center col-md-3">{ trans('main.INFO_NAME') }</label>
                                                            <div className="col-md-9">
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <input type="text"
                                                                               className={this.state.errors.first_name ? "form-control is-invalid" : "form-control"}
                                                                               name="first_name"
                                                                               value={this.props.modal.data.first_name || ''}
                                                                               onChange={this.props.handleChange}
                                                                        />
                                                                        {this.state.errors.first_name && (
                                                                            <span id="first_name-error" className="error invalid-feedback">{this.state.errors.first_name}</span>
                                                                        )}
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <input type="text"
                                                                               className={this.state.errors.last_name ? "form-control is-invalid" : "form-control"}
                                                                               name="last_name"
                                                                               value={this.props.modal.data.last_name || ''}
                                                                               onChange={this.props.handleChange}
                                                                        />
                                                                        {this.state.errors.last_name && (
                                                                            <span id="last_name-error" className="error invalid-feedback">{this.state.errors.last_name}</span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="form-group row">
                                                            <label
                                                                className="form-group mb-0 align-self-center col-md-3">{ trans('main.INFO_NAME_KANA') }</label>
                                                            <div className="col-md-9">
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <input type="text" className={"form-control" + (this.state.errors.first_name_trans?' is-invalid':'') }
                                                                               name="first_name_trans"
                                                                               value={this.props.modal.data.first_name_trans || ''}
                                                                               onChange={this.props.handleChange}
                                                                        />
                                                                        {this.state.errors.first_name_trans && (
                                                                            <span id="first_name_trans-error" className="error invalid-feedback">{this.state.errors.first_name_trans}</span>
                                                                        )}
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <input type="text" className={"form-control" + (this.state.errors.last_name_trans?' is-invalid':'') }
                                                                               name="last_name_trans"
                                                                               value={this.props.modal.data.last_name_trans || ''}
                                                                               onChange={this.props.handleChange}
                                                                        />
                                                                        {this.state.errors.last_name_trans && (
                                                                            <span id="last_name_trans-error" className="error invalid-feedback">{this.state.errors.last_name_trans}</span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="form-group row">
                                                            <label
                                                                className="form-group mb-0 align-self-center col-md-3">{trans('main.INFO_LBL_DIVISION_FORM')}</label>
                                                            <div className="col-md-9">
                                                                <input type="text"
                                                                       className={this.state.errors.division ? "form-control is-invalid" : "form-control"}
                                                                       name="division"
                                                                       value={this.props.modal.data.division || ''}
                                                                       onChange={this.props.handleChange}
                                                                />
                                                                {this.state.errors.division && (
                                                                    <span id="division-error" className="error invalid-feedback">{this.state.errors.division}</span>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="form-group row">
                                                            <label
                                                                className="form-group mb-0 align-self-center col-md-3"> {trans('main.INFO_LBL_EMAIL')} </label>
                                                            <div className="col-md-9">
                                                                <input type="email"
                                                                       className={this.state.errors.email ? "form-control is-invalid" : "form-control"}
                                                                       name="email"
                                                                       value={this.props.modal.data.email || ''}
                                                                       onChange={this.props.handleChange}
                                                                />
                                                                {this.state.errors.email && (
                                                                    <span id="email-error" className="error invalid-feedback">{this.state.errors.email}</span>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="w-100 text-center">
                                                            <button type="button" className="btn btn-secondary ms-previous mx-2"
                                                                    onClick={this.props.handleClickPrevious}>
                                                                前の画面に戻る
                                                            </button>
                                                            <button type="button" className="btn btn-success ms-next mx-2"
                                                                    onClick={this.handleUpdateInfo}>
                                                                確定
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="password-block block">
                                                        <div className="form-group row mb-5">
                                                            <label
                                                                className="form-group mb-0 align-self-center col-md-3">{ trans('main.INFO_LBL_CURENT_PASSWORD') }</label>
                                                            <div className="col-md-9">
                                                                <input type="password"
                                                                       className={this.state.errors.password_current ? "form-control is-invalid" : "form-control"}
                                                                       value={this.state.password_current}
                                                                       onChange={this.handleChangeCurrentPassword}
                                                                />
                                                                {this.state.errors.password_current && (
                                                                    <span id="password_current-error" className="error invalid-feedback">{this.state.errors.password_current}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label
                                                                className="form-group mb-0 align-self-center col-md-3">{ trans('main.INFO_LBL_NEW_PASSWORD') }</label>
                                                            <div className="col-md-9">
                                                                <input type="password"
                                                                       className={this.state.errors.password ? "form-control is-invalid" : "form-control"}
                                                                       value={this.state.password}
                                                                       onChange={this.handleChangePassword}
                                                                />
                                                                {this.state.errors.password && (
                                                                    <span id="password-error" className="error invalid-feedback">{this.state.errors.password}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label
                                                                className="form-group mb-0 align-self-center col-md-3">{ trans('main.EVAL_CONFIRM_PASS') }</label>
                                                            <div className="col-md-9">
                                                                <input type="password" className={"form-control" + (this.state.errors.password_confirmation?'  is-invalid':'')}
                                                                       value={this.state.password_confirmation}
                                                                       onChange={this.handleChangeConfirmPassword}
                                                                />
                                                                {this.state.errors.password_confirmation && (
                                                                    <span id="password_confirmation-error" className="error invalid-feedback">{this.state.errors.password_confirmation}</span>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="w-100 text-center">
                                                            <button type="button" className="btn btn-secondary ms-previous mx-2"
                                                                    onClick={this.props.handleClickPrevious}>
                                                                前の画面に戻る
                                                            </button>
                                                            <button type="button" className="btn btn-success ms-next mx-2"
                                                                    onClick={this.handleUpdatePass}>
                                                                確定
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                        <fieldset className="done-block">
                                            <CompleteMessage handleClickClose={this.props.handleClickClose} />
                                        </fieldset>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileModal);
