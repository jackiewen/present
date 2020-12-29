import React from 'react';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import { ADMIN_CREATE_ACC, ADMIN_UPDATE_ACC } from "../../../../constants/endpoint";
import ProgressBar from './../partials/ProgressBar';
import { generatePath } from "react-router";
import CompleteMessage from "../../CompleteMessage";

class AdminModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            param: {
                roles: "2",
            },
        };
        this.isFetching = false;
        this.setValidator = null;
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if(!_.isEmpty(prevState.errors) && prevProps.modal.isOpen && !this.props.modal.isOpen) {
            this.setState({errors: {}});
        }
    };

    handleSwith = (checked) =>
    {
        let value = checked ? "1" : "2";
        this.props.handleChange({target: {
                type: 'text',
                name: 'roles',
                value: value
            }});
    };

    validateForm = () =>
    {
        let rules = {
            first_name: { required: true },
            last_name: { required: true },
            account: { required: true },
            email: { email: true },
        };

        this.setValidator = $('.msform').validate({
            rules: rules,
            messages: {
                first_name: {required: trans('main.EVAL_REQUIRED', {'attribute': trans('main.INFO_NAME')})},
                last_name: {required: trans('main.EVAL_REQUIRED', {'attribute': trans('main.INFO_NAME')})},
                account: {required: trans('main.EVAL_REQUIRED', {'attribute': trans('main.INFO_LBL_ACCOUNT')})},
                email: {required: trans('main.EVAL_REQUIRED', {'attribute': trans('main.INFO_LBL_EMAIL')})},
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

    handleClickNext = () => {
        if(this.setValidator !== null) {
            this.setValidator.destroy();
        }
        this.validateForm();
        let valid = $('.msform').valid();
        if(valid) {
            this.props.handleClickNext();
        }
    };

    handleBack = () => {
        this.props.handleClickPrevious();
    };

    handleSubmit = () => {
        if(!this.isFetching) {
            this.isFetching = true;
            let path = this.props.modal.data.hasOwnProperty('id') ? generatePath(ADMIN_UPDATE_ACC, {id: this.props.modal.data.id}) : ADMIN_CREATE_ACC;
            axios.post(path, Object.assign({}, this.state.param, this.props.modal.data))
                .then((rs) => {
                    this.isFetching = false;
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
                    this.handleBack();
                })
        }
    };

    render() {
        return (
            <div className="modal fade" id="AdminModal" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="modelAdminModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modelAdminModalLabel">
                                {this.props.modal.data.type === 'create' ? trans('commons.admins.modal_create_title') : trans('commons.admins.modal_update_title')}
                            </h5>
                            <button type="button" className="close" onClick={this.props.handleClickClose} data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="register-form my-3">
                                <form className="msform">
                                    <ProgressBar items={['first', 'check', 'done']} step={this.props.modal.step} />
                                    <div className="row">
                                        <div className="col-md-12 mx-0 my-3">
                                            <fieldset className="first-block">
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
                                                        <div className="form-group">
                                                            <label>{ trans('main.INFO_NAME') }</label>
                                                            <div className="row">
                                                                <div className="col-6">
                                                                    <input type="text" name="first_name"
                                                                           className={this.state.errors.first_name ? "form-control is-invalid" : "form-control"}
                                                                           value={this.props.modal.data.first_name || ''}
                                                                           onChange={this.props.handleChange}
                                                                    />
                                                                    {this.state.errors.first_name && (
                                                                        <span id="first_name-error" className="error invalid-feedback">{this.state.errors.first_name}</span>
                                                                    )}
                                                                </div>
                                                                <div className="col-6">
                                                                    <input type="text" name="last_name"
                                                                           className={this.state.errors.last_name ? "form-control is-invalid" : "form-control"}
                                                                           value={this.props.modal.data.last_name || ''}
                                                                           onChange={this.props.handleChange}
                                                                    />
                                                                    {this.state.errors.last_name && (
                                                                        <span id="last_name-error" className="error invalid-feedback">{this.state.errors.last_name}</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>{ trans('main.INFO_NAME_KANA') }</label>
                                                            <div className="row">
                                                                <div className="col-6">
                                                                    <input type="text" className="form-control" name="first_name_trans"
                                                                           value={this.props.modal.data.first_name_trans || ''}
                                                                           onChange={this.props.handleChange}
                                                                    />
                                                                </div>
                                                                <div className="col-6">
                                                                    <input type="text" className="form-control" name="last_name_trans"
                                                                           value={this.props.modal.data.last_name_trans || ''}
                                                                           onChange={this.props.handleChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>{ trans('main.INFO_LBL_ACCOUNT') }</label>
                                                            <input type="text" name="account"
                                                                   className={this.state.errors.account ? "form-control is-invalid" : "form-control"}
                                                                   value={this.props.modal.data.account || ''}
                                                                   onChange={this.props.handleChange}
                                                            />
                                                            {this.state.errors.account && (
                                                                <span id="account-error" className="error invalid-feedback">{this.state.errors.account}</span>
                                                            )}
                                                        </div>
                                                        <div className="form-group">
                                                            <label>{ trans('main.INFO_LBL_EMAIL') }</label>
                                                            <input type="email" name="email"
                                                                   className={this.state.errors.email ? "form-control is-invalid" : "form-control"}
                                                                   value={this.props.modal.data.email || ''}
                                                                   onChange={this.props.handleChange}
                                                            />
                                                            {this.state.errors.email && (
                                                                <span id="email-error" className="error invalid-feedback">{this.state.errors.email}</span>
                                                            )}
                                                        </div>
                                                        <div className="form-group">
                                                            <label>{ trans('main.INFO_LBL_ROLE') }</label>
                                                            <div>
                                                                <BootstrapSwitchButton
                                                                    checked={this.props.modal.data.roles === "1"}
                                                                    onlabel={trans('main.INFO_LBL_YES')}
                                                                    onstyle="danger"
                                                                    offlabel={trans('main.INFO_LBL_NO')}
                                                                    offstyle="primary"
                                                                    onChange={this.handleSwith}
                                                                    width={100}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card-footer text-center">
                                                        <button type="button" className="btn btn-primary ms-next" onClick={this.handleClickNext}>
                                                            {trans('main.INFO_LBL_NEXT')}
                                                        </button>
                                                    </div>
                                                </div>
                                            </fieldset>
                                            <fieldset className="check-block">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <table className="check-block">
                                                            <tbody>
                                                                <tr>
                                                                    <th>{trans('main.INFO_NAME')}</th>
                                                                    <td>{(this.props.modal.data.first_name + ' ' || '') + (this.props.modal.data.last_name || '') }</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>{trans('main.INFO_NAME_KANA')}</th>
                                                                    <td>
                                                                        {(this.props.modal.data.first_name_trans || '') + (this.props.modal.data.last_name_trans || '') }
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>{trans('main.INFO_LBL_ACCOUNT')}</th>
                                                                    <td>{ this.props.modal.data.account || '' }</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>{trans('main.INFO_LBL_EMAIL')}</th>
                                                                    <td>{ this.props.modal.data.email || '' }</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>{ trans('main.INFO_LBL_ROLE') }</th>
                                                                    <td>{this.props.modal.data.roles === "1" ? trans('main.INFO_LBL_YES') : trans('main.INFO_LBL_NO')}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="card-footer text-center">
                                                        <button type="button" className="btn btn-primary ms-next" onClick={this.handleSubmit}>
                                                            {trans('main.INFO_LBL_NEXT_CONFIRM')}
                                                        </button>
                                                        <button type="button" className="btn btn-secondary ms-previous mx-2" onClick={this.props.handleClickPrevious}>
                                                            {trans('main.INFO_LBL_PREV')}
                                                        </button>
                                                    </div>
                                                </div>
                                            </fieldset>
                                            <fieldset className="done-block">
                                                <CompleteMessage
                                                    message={
                                                        this.props.modal.data.type === 'create'
                                                            ? trans('main.INFO_LBL_ADD_COMPANY_COMPLETE') : trans('main.INFO_LBL_COMPLETE')
                                                    }
                                                    handleClickClose={this.props.handleClickClose} />
                                            </fieldset>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminModal;
