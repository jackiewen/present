import React from 'react';
import ProgressBar from './../partials/ProgressBar';
import { ADMIN_FOR_SELECT, COMPANY_CREATE, COMPANY_UPDATE, COMPANY_DELETE } from "../../../../constants/endpoint";
import { generatePath } from "react-router-dom";
import { connect } from 'react-redux';
import { ConfirmDeleteModal } from '../index';
import { checkInputSize, focusInput,validateInputLength } from "../../../../helpers";
import AsyncSelectComponent from "../../AsyncSelect"
import CompleteMessage from '../../CompleteMessage';
import { showToast } from '../../../../actions/toast';

class CompanyModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            param: { roles: false },
            admins: [],
            // secondary_disable: true,
        };
        this.adminsFetching = false;
        this.isFetching = false;
        this.confirm_message = <React.Fragment><div dangerouslySetInnerHTML={{__html: trans('main.INFO_POPUP_CONFIRM_DELETE',{'attribute':'ユーザー企'})}} /></React.Fragment>;
        this.is_create = _.isEmpty(this.props.modal.data) ? true:false;
    }

    componentDidMount() {
        this.getAdmins();
        $('.modal').on('shown.bs.modal', () => {
            focusInput(this.companyName);
        });
    }

    getAdmins = () => {
        if (!this.adminsFetching) {
            this.adminsFetching = true;
            axios.get(ADMIN_FOR_SELECT)
                .then(rs => {
                    this.adminsFetching = false;
                    this.setState({admins: rs.data});
                })
                .catch(err => {
                    this.admins.isFetching = false;
                })
        }
    };

    validateForm = () => {
        let rules = {
            company_name: {
                required: true,
            },
        };

        $('.msform').validate({
            rules: rules,
            messages: {
                company_name: {required: trans('main.EVAL_REQUIRED', {'attribute': trans('main.INFO_LBL_COMPANY_NAME')})},
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
        this.validateForm();
        this.setState({errors: {}});
        let valid = $('.msform').valid();
        if(valid)
        {
            this.props.handleClickNext();
        }
    };

    handleSubmit = () => {
        if(!this.isFetching)
        {
            this.isFetching = true;
            let path = COMPANY_CREATE;
            if(this.props.modal.data.hasOwnProperty('id')) {
                path = generatePath(COMPANY_UPDATE, {id: this.props.modal.data.id});
            }

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
                    this.props.handleClickPrevious();
                })
        }
    };

    handleSelect = (selected, attr) => {
        const name = attr.name;
        if (name === 'admin_primary') {
            if (selected === null) {
                const newValue = Object.assign({}, this.props.modal.data, {admin_primary: null, admin_secondary: null});
                this.props.handleUpdateData(newValue);
            } else {
                const rebuildSecondary = [];
                if (this.props.modal.data.admin_secondary) {
                    this.props.modal.data.admin_secondary.forEach( element => {
                        if (String(element.value) !== String(selected.value)) {
                            rebuildSecondary.push(element);
                        }
                    })
                }
                const newValue = Object.assign({}, this.props.modal.data, {admin_primary: selected, admin_secondary: rebuildSecondary});
                this.props.handleUpdateData(newValue);
            }
        } else {
            this.props.handleChange({
                target: {
                    type: 'select',
                    value: selected,
                    name: name
                },
            });
        }
    };

    handleClickClose = () => {
        this.setState({errors: {}});
        this.props.handleClickClose();
    };

    deleteCompany = () => {
        if(this.props.modal.data.hasOwnProperty('id') && !this.isFetching) {
            this.isFetching = true;
            axios.post(generatePath(COMPANY_DELETE, {id: this.props.modal.data.id}))
                .then( rs => {
                    this.props.showToast({type: 'success', message: trans('main.INFO_DELETE_COMPLETE',{'attribute': '企業'})});
                    this.isFetching = false;
                    this.props.handleClickClose();
                })
                .catch( err => {
                    this.isFetching = false;
                    this.setState({errors: {commons: [err.response.data]}});
                });
        }
    };

    deleteCompanyClick = () => {
        if(this.props.modal.data.hasOwnProperty('id') && !this.isFetching) {
            $('#ConfirmDeleteModal').modal('show');
        }
    };

    getSecondaryOption = () => {
        let secondary = [];
        if(this.props.modal.data.admin_primary){
            this.state.admins.forEach(element => {
                if (String(element.value) !== String(this.props.modal.data.admin_primary.value)){
                    secondary.push(element);
                }
            })
        }

        return secondary;
    };

    render() {
        const secondary_admin = this.getSecondaryOption();
        console.log(secondary_admin);
        return (
            <React.Fragment>
                <div className="modal fade" id="CompanyModal" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="modelCompanyModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="modelCompanyModalLabel">ユーザー企業登録</h5>
                                <button type="button" className="close" onClick={this.handleClickClose} data-dismiss="modal" aria-label="Close">
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
                                                            <div className="form-group row">
                                                                <label className="col-3 mb-0 align-self-center">{trans('main.INFO_LBL_COMPANY_NAME')}</label>
                                                                <div className="col-9">
                                                                    <input type="text" name="company_name"
                                                                           className={this.state.errors.company_name ? "form-control is-invalid" : "form-control"}
                                                                           value={this.props.modal.data.company_name || ''}
                                                                           onChange={(e) => { validateInputLength(50, e,this.props.handleChange)}}
                                                                           ref={(input) => { this.companyName = input; }}
                                                                    />
                                                                    {this.state.errors.company_name && (
                                                                        <span id="company_name-error" className="error invalid-feedback">{this.state.errors.company_name}</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label className="col-3 mb-0 align-self-center">{trans('main.INFO_NAME_KANA')}</label>
                                                                <div className="col-9">
                                                                    <input type="text" name="company_name_kana"
                                                                           className="form-control"
                                                                           value={this.props.modal.data.company_name_kana || ''}
                                                                           onChange={(e) => { validateInputLength(50, e,this.props.handleChange)}}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label className="col-3 mb-0 align-self-center">{ trans('main.INFO_LBL_ADMIN_NAME_PRIMARY') }</label>
                                                                <div className="col-9">
                                                                    <AsyncSelectComponent
                                                                        url={ADMIN_FOR_SELECT}
                                                                        handleChangeSelect={this.handleSelect}
                                                                        name="admin_primary"
                                                                        defaultOptions={this.state.admins}
                                                                        value={this.props.modal.data.admin_primary || ''}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label className="col-3 mb-0 align-self-center">{ trans('main.INFO_LBL_ADMIN_NAME') }</label>
                                                                <div className="col-9">
                                                                    <AsyncSelectComponent
                                                                        url={ADMIN_FOR_SELECT}
                                                                        handleChangeSelect={this.handleSelect}
                                                                        name="admin_secondary"
                                                                        isMulti={true}
                                                                        value={this.props.modal.data.admin_secondary || ''}
                                                                        isDisabled={
                                                                            _.isUndefined(this.props.modal.data.admin_primary) ||
                                                                            _.isNull(this.props.modal.data.admin_primary)
                                                                        }
                                                                        except={
                                                                            !_.isUndefined(this.props.modal.data.admin_primary) &&
                                                                            !_.isNull(this.props.modal.data.admin_primary) ? [this.props.modal.data.admin_primary.value]
                                                                                : []
                                                                        }
                                                                        defaultOptions={secondary_admin}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="card-footer text-center">
                                                            <button type="button" className="btn btn-primary ms-next mx-2" onClick={this.handleClickNext}>
                                                                {trans('main.INFO_LBL_NEXT')}
                                                            </button>
                                                            <button type="button" className="btn btn-secondary mx-2" onClick={this.handleClickClose}
                                                                    data-dismiss="modal"> {trans('main.INFO_LBL_CLOSE')}
                                                            </button>
                                                            {this.props.modal.data.hasOwnProperty('id') &&
                                                            <button type="button" className="btn btn-danger mx-2"
                                                                    onClick={this.deleteCompanyClick}>解約
                                                            </button>
                                                            }
                                                        </div>
                                                    </div>
                                                </fieldset>
                                                <fieldset className="check-block">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <div className="table-responsive">
                                                                <table className="check-block">
                                                                    <tbody>
                                                                    <tr>
                                                                        <th>{trans('main.INFO_LBL_COMPANY_NAME')}</th>
                                                                        <td>{ this.props.modal.data.company_name }</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>{trans('main.INFO_NAME_KANA')}</th>
                                                                        <td>
                                                                            { this.props.modal.data.company_name_kana }
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>{trans('main.INFO_LBL_ADMIN_NAME_PRIMARY')}</th>
                                                                        <td style={{width: 70 + '%'}}>
                                                                            { this.props.modal.data.admin_primary && this.props.modal.data.admin_primary.label }
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>{trans('main.INFO_LBL_ADMIN_NAME_SECONDARY')}</th>
                                                                        <td style={{width: 70 + '%'}}>
                                                                            {this.props.modal.data.admin_secondary && this.props.modal.data.admin_secondary.map( (element, index) => (
                                                                                index === 0
                                                                                    ? element.label
                                                                                    : ', ' + element.label
                                                                            ))}
                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
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
                                                    <CompleteMessage message={
                                                        this.is_create ? trans('main.INFO_LBL_ADD_COMPANY_COMPLETE') : trans('main.INFO_LBL_COMPLETE')
                                                    } handleClickClose={this.handleClickClose} />
                                                </fieldset>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ConfirmDeleteModal confirm_message={this.confirm_message} confirm_title="ユーザー企業解約" handleDeleteAction={this.deleteCompany}/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {

    };
}

const mapDispatchToProps = dispatch => ({
    showToast: (data) => dispatch(showToast(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyModal);
