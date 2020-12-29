import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as SSA from '../../../../actions/selected_selection_adviser';
import { handleChangeModal } from '../../../../actions/modal';

class EditReasonMemoAdviserModal extends Component {
    state = {
        errors: {}
    };

    setValidator = null;

    validateForm = () =>
    {
        let rules = {
            choose_reason: {
                required: true
            },
            memo: {
                required: true,
            },
        };

        this.setValidator = $('.msform').validate({
            rules: rules,
            messages: {
                choose_reason: {
                    required: trans('main.EVAL_REQUIRED', {'attribute': trans('main.INFO_LBL_REASON')})
                },
                memo: {
                    required: trans('main.EVAL_REQUIRED', {'attribute': trans('main.INFO_LBL_MEMO')})
                }
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

    handleClickSubmit = (adviserId) => {
        if(this.setValidator !== null){
            this.setValidator.destroy();
        }
        this.validateForm();
        let valid = $('.msform').valid();
        if(!valid) {
            return false;
        }
        const selection = this.props.selectedSelectionAdivser.data.find(item => item.adviser_id === adviserId);
        if (!selection) {
            this.props.addSSA({
                request_adviser_id: this.props.modal.data?.request_adviser_id || '',
                adviser_id: this.props.modal.data?.adviser?.data?.id || '',
                choose_reason: this.props.modal.data?.choose_reason || '',
                memo: this.props.modal.data?.memo || '',
                adviser: {data: this.props.modal.data?.adviser?.data || {} },
                id: (new Date().getTime())
            });
        } else {
            selection['choose_reason'] = this.props.modal.data?.choose_reason || '';
            selection['memo'] = this.props.modal.data?.memo || '';
        }
        this.setState({
            errors: {}
        });
        this.props.handleClickClose();
    }

    handleClickClose = () => {
        this.setState({
            errors: {}
        });
        this.props.handleClickClose();
    }

    render() {
        return (
            <div className="modal fade" id="EditReasonMemoAdviserModal" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="modelEditReasonMemoAdviserLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h5 className="modal-title w-100 text-left" id="modelEditReasonMemoAdviserLabel">
                                ID: {this.props.modal.data?.adviser?.data?.komon_id || ''}　{this.props.modal.data?.adviser?.data?.company_name || ''}　{this.props.modal.data?.adviser?.data?.position || ''}
                            </h5>
                            <button type="button" className="close" onClick={this.handleClickClose} aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                        <div className="modal-body pt-4">
                            <form className="msform">
                                <div className="form-group">
                                    <label>選定理由</label>
                                    <textarea 
                                        className={"form-control" + (this.state.errors?.choose_reason ? " is-invalid":"")} 
                                        name="choose_reason" 
                                        rows="3" 
                                        value={this.props.modal.data?.choose_reason} 
                                        onChange={this.props.handleChange} />
                                    {this.state.errors?.choose_reason && (
                                        <span id="choose_reason-error" className="error invalid-feedback">{this.state.errors?.choose_reason}</span>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>メモ</label>
                                    <textarea 
                                        className={"form-control" + (this.state.errors?.memo ? " is-invalid":"")} 
                                        name="memo" 
                                        rows="3" 
                                        value={this.props.modal.data?.memo} 
                                        onChange={this.props.handleChange} />
                                    {this.state.errors?.memo && (
                                        <span id="memo-error" className="error invalid-feedback">{this.state.errors?.memo}</span>
                                    )}
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={() => this.handleClickSubmit(this.props.modal.data?.adviser_id)} style={{minWidth: "74px"}}>保存</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { selectedSelectionAdivser } = state;
    return {
        selectedSelectionAdivser
    };
}

const mapDispatchToProps = dispatch => ({
    setSSA: (data) => dispatch(SSA.set(data)),
    addSSA: (data) => dispatch(SSA.add(data)),
    removeSSA: (data) => dispatch(SSA.remove(data)),
    clearSSA: (data) => dispatch(SSA.clear(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditReasonMemoAdviserModal);