import React, { Component } from 'react';
import ProgressBar from './../partials/ProgressBar';
import { ROOT_URL, USER_INTERVIEWS_CREATE } from './../../../../constants/endpoint';
import CompleteMessageUser from "../../CompleteMessageUser";

export default class RequestInterviewModal extends Component {

    state = {
        errors: {}
    };

    isFetching = false;
    setValidator = null;
    componentDidMount() {
        this.mountDateTimePicker();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.mountDateTimePicker();
        if(!_.isEmpty(prevState.errors) && prevProps.modal.isOpen && !this.props.modal.isOpen) {
            this.setState({errors: {}});
        }
    }

    validateForm = () =>
    {
        let rules = {
            description: {
                required: true,
            },
            address: {
                required: true,
            },
            meeting_date_one: {
                required: true,
                date: true
            },
            meeting_time_one: {
                required: true,
                time: true
            },
            meeting_date_two: {
                required: function(element) {
                    return !_.isEmpty($("input[name='meeting_time_two']").val());
                },
                date: true
            },
            meeting_time_two: {
                required: function(element) {
                    return !_.isEmpty($("input[name='meeting_date_two']").val());
                },
                time: true
            },
            meeting_date_three: {
                required: function(element) {
                    return !_.isEmpty($("input[name='meeting_time_three']").val());
                },
                date: true
            },
            meeting_time_three: {
                required: function(element) {
                    return !_.isEmpty($("input[name='meeting_date_three']").val());
                },
                time: true
            },
        };

        this.setValidator = $('.msform').validate({
            rules: rules,
            messages: {
                description: {required: trans('main.EVAL_REQUIRED', {'attribute': trans('main.INFO_LBL_DESCRIPTION')})},
                address: {required: trans('main.EVAL_REQUIRED', {'attribute': trans('main.INFO_LBL_INTERVIEW_ADDRESS')})},
                meeting_date_one: {
                    required: trans('main.EVAL_REQUIRED', {'attribute': trans('main.INFO_LBL_INTERVIEW_DATE_ONE')}),
                    date: trans('main.EVAL_VALID_DATE', {'attribute': trans('main.INFO_LBL_INTERVIEW_DATE_ONE')}),
                },
                meeting_time_one: {
                    required: trans('main.EVAL_REQUIRED', {'attribute': trans('main.INFO_LBL_INTERVIEW_TIME_ONE')}),
                    time: trans('main.EVAL_VALID_TIME', {'attribute': trans('main.INFO_LBL_INTERVIEW_TIME_ONE')}),
                },

                meeting_date_two: {
                    required: trans('main.EVAL_REQUIRED', {'attribute': trans('main.INFO_LBL_INTERVIEW_DATE_TWO')}),
                    date: trans('main.EVAL_VALID_DATE', {'attribute': trans('main.INFO_LBL_INTERVIEW_DATE_TWO')}),
                },
                meeting_time_two: {
                    required: trans('main.EVAL_REQUIRED', {'attribute': trans('main.INFO_LBL_INTERVIEW_TIME_TWO')}),
                    time: trans('main.EVAL_VALID_TIME', {'attribute': trans('main.INFO_LBL_INTERVIEW_TIME_TWO')}),
                },

                meeting_date_three: {
                    required: trans('main.EVAL_REQUIRED', {'attribute': trans('main.INFO_LBL_INTERVIEW_DATE_THREE')}),
                    date: trans('main.EVAL_VALID_DATE', {'attribute': trans('main.INFO_LBL_INTERVIEW_DATE_THREE')}),
                },
                meeting_time_three: {
                    required: trans('main.EVAL_REQUIRED', {'attribute': trans('main.INFO_LBL_INTERVIEW_TIME_THREE')}),
                    time: trans('main.EVAL_VALID_TIME', {'attribute': trans('main.INFO_LBL_INTERVIEW_TIME_THREE')}),
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

    handleClickNext = () => {
        if(this.setValidator !== null){
            this.setValidator.destroy();
        }
        this.validateForm();
        let valid = $('.msform').valid();
        if(valid) {
            this.setState({errors: {}}, () => {
                this.props.handleClickNext();
            });
        }
    };

    handleSubmit = () => {
        if (!this.isFetching) {
            this.isFetching = true;
            let postData = this.props.modal.data;
            axios.post(ROOT_URL + USER_INTERVIEWS_CREATE, postData)
            .then(json => {
                this.isFetching = false;
                this.props.handleClickNext();
            })
            .catch(err => {
                this.isFetching = false;
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
                }

                this.props.handleClickPrevious();
            });
        }
    }

    mountDateTimePicker = () => {
        const arrDateSelector = [
            '#firstDateGroup',
            '#secondDateGroup',
            '#thirdDateGroup'
        ];

        const arrTimeSelector = [
            '#firstTimeGroup',
            '#secondTimeGroup',
            '#thirdTimeGroup'
        ];
        arrDateSelector.map(selector => {
            $(selector).datetimepicker({
                locale: "ja",
                format: 'L',
                dayViewHeaderFormat: 'YYYY 年 MM 月',
                icons: {
                    time: "fa fa-clock",
                },
                showOn: "focus",
                minDate: moment().millisecond(0).second(0).minute(0).hour(0),
            });
                $(selector).on("change.datetimepicker", ({date}) => {
                    var res = selector.split("DateGroup");
                    if(new Date(date).setHours(0,0,0,0) == new Date().setHours(0,0,0,0)) {
                        $(res[0]+'TimeGroup').data("datetimepicker").minDate(new Date());
                        $(res[0]+'TimeGroup').data("datetimepicker").date(new Date());
                    }else {
                        $(res[0]+'TimeGroup').data("datetimepicker").minDate(new Date('1999/10/25'));
                    }
                    $(res[0]+'TimeGroup').change();
                })
        });

        arrTimeSelector.map(selector => {
            $(selector).datetimepicker({
                locale: "ja",
                format: 'LT',
                icons: {
                    time: "fa fa-clock",
                },
                minDate: moment().millisecond(0).second(0).minute(0).hour(0),
            });
        });
    }

    render() {
    return (
        <div className="modal fade modal-processbar" id="RequestInterviewModal" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="modelRequestInterviewLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header text-center">
                        <h5 className="modal-title w-100" id="modelRequestInterviewLabel"><b>{trans('main.INFO_LBL_REQUEST_INTERVIEW')}</b></h5>
                        <button type="button" className="close" onClick={this.props.handleClickClose} aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div className="modal-body pt-4">
                        <form className="msform">
                            <ProgressBar items={['first', 'check', 'done']} step={this.props.modal.step} />
                            <div className="row">
                                <div className="col-md-12 pt-5 mx-0 msform">
                                    <fieldset>
                                        <p className="id-adviser"><b>{trans('main.INFO_LBL_ADVISER_INFO_ID')}: {this.props.modal.data.adviser?.komon_id || ''}　{this.props.modal.data.adviser?.company_name || ''}　{this.props.modal.data.adviser?.position || ''}</b></p>
                                        <div className="form-group">
                                            <label>{trans('main.INFO_LBL_INTERVIEW_DESCRIPTION')}</label>
                                            <div className="form-group">
                                                <textarea
                                                    className={"form-control" + (this.state.errors?.description ? " is-invalid":"")}
                                                    name="description"
                                                    rows="15"
                                                    placeholder="● 探している知見や人脈の具体的イメージ
● 案件の進め方イメージ
● 事前に確認しておきたいこと"
                                                    onChange={this.props.handleChange} value={this.props.modal.data.description || ''}
                                                ></textarea>
                                                {this.state.errors?.description && (
                                                    <span id="description-error" className="error invalid-feedback">{this.state.errors?.description}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>{trans('main.INFO_LBL_INTERVIEW_ADDRESS')}</label>
                                            <input
                                                className={"form-control" + (this.state.errors?.address ? " is-invalid":"")}
                                                name="address"
                                                onChange={this.props.handleChange}
                                                value={this.props.modal.data.address || ''}
                                            />
                                            {this.state.errors?.address && (
                                                <span id="address-error" className="error invalid-feedback">{this.state.errors?.address}</span>
                                            )}
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>{trans('main.INFO_LBL_INTERVIEW_DATE_ONE')}</label>
                                                    <div className="input-group date" id="firstDateGroup" data-target-input="nearest">
                                                        <input type="text" className={"form-control datetimepicker-input" + (this.state.errors?.meeting_date_one ? " is-invalid":"")}
                                                            id="firstDate" name="meeting_date_one" data-target="#firstDateGroup" data-toggle="datetimepicker"
                                                            onBlur={this.props.handleChange} defaultValue={this.props.modal.data.meeting_date_one || ''}
                                                        />
                                                        {this.state.errors?.meeting_date_one && (
                                                            <span id="meeting_date_one-error" className="error invalid-feedback">{this.state.errors?.meeting_date_one}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="d-none d-md-block">&nbsp;</label>
                                                    <div className="input-group date" id="firstTimeGroup" data-target-input="nearest">
                                                        <input type="text" className={"form-control datetimepicker-input" + (this.state.errors?.meeting_time_one ? " is-invalid":"")}
                                                            id="firstTime" name="meeting_time_one" data-target="#firstTimeGroup" data-toggle="datetimepicker"
                                                            onBlur={this.props.handleChange} defaultValue={this.props.modal.data.meeting_time_one || ''} />
                                                        {this.state.errors?.meeting_time_one && (
                                                            <span id="meeting_time_one-error" className="error invalid-feedback">{this.state.errors?.meeting_time_one}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>{trans('main.INFO_LBL_INTERVIEW_DATE_TWO')}</label>
                                                    <div className="input-group date" id="secondDateGroup" data-target-input="nearest">
                                                        <input type="text" className={"form-control datetimepicker-input" + (this.state.errors?.meeting_date_two ? " is-invalid":"")}
                                                            id="secondDate" name="meeting_date_two" data-target="#secondDateGroup" data-toggle="datetimepicker"
                                                            onBlur={this.props.handleChange}  defaultValue={this.props.modal.data.meeting_date_two || ''} />
                                                        {this.state.errors?.meeting_date_two && (
                                                            <span id="meeting_date_two-error" className="error invalid-feedback">{this.state.errors?.meeting_date_two}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="d-none d-md-block">&nbsp;</label>
                                                    <div className="input-group date" id="secondTimeGroup" data-target-input="nearest">
                                                        <input type="text" className={"form-control datetimepicker-input" + (this.state.errors?.meeting_time_two ? " is-invalid":"")}
                                                            id="secondTime" name="meeting_time_two" data-target="#secondTimeGroup" data-toggle="datetimepicker"
                                                            onBlur={this.props.handleChange}  defaultValue={this.props.modal.data.meeting_time_two || ''} />
                                                        {this.state.errors?.meeting_time_two && (
                                                            <span id="meeting_time_two-error" className="error invalid-feedback">{this.state.errors?.meeting_time_two}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>{trans('main.INFO_LBL_INTERVIEW_DATE_THREE')}</label>
                                                    <div className="input-group date" id="thirdDateGroup" data-target-input="nearest">
                                                        <input type="text" className={"form-control datetimepicker-input" + (this.state.errors?.meeting_date_three ? " is-invalid":"")}
                                                            id="thirdDate" name="meeting_date_three" data-target="#thirdDateGroup" data-toggle="datetimepicker"
                                                            onBlur={this.props.handleChange} defaultValue={this.props.modal.data.meeting_date_three || ''} />
                                                        {this.state.errors?.meeting_date_three && (
                                                            <span id="meeting_date_three-error" className="error invalid-feedback">{this.state.errors?.meeting_date_three}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="d-none d-md-block">&nbsp;</label>
                                                    <div className="input-group date" id="thirdTimeGroup" data-target-input="nearest">
                                                        <input type="text" className={"form-control datetimepicker-input" + (this.state.errors?.meeting_time_three ? " is-invalid":"")}
                                                            id="thirdTime" name="meeting_time_three" data-target="#thirdTimeGroup" data-toggle="datetimepicker"
                                                            onBlur={this.props.handleChange} defaultValue={this.props.modal.data.meeting_time_three || ''} />
                                                        {this.state.errors?.meeting_time_three && (
                                                            <span id="meeting_time_three-error" className="error invalid-feedback">{this.state.errors?.meeting_time_three}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-100 text-center">
                                            <button type="button" className="btn btn-primary ms-next" onClick={this.handleClickNext}>{trans('main.INFO_LBL_CHECK_CONTENT_SEND')}</button>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <h5 className="text-center mb-3">{trans('main.INFO_LBL_MSG_CONFIRM_CONTENT_SEND')}</h5>
                                        <p className="id-adviser"><b>{trans('main.INFO_LBL_ADVISER_INFO_ID')}: {this.props.modal.data.adviser?.komon_id || ''}　{this.props.modal.data.adviser?.company_name || ''}　{this.props.modal.data.adviser?.position || ''}</b></p>
                                        <div className="form-group">
                                            <label>{trans('main.INFO_LBL_INTERVIEW_DESCRIPTION')}</label>
                                            <textarea className="form-control" rows="15" value={this.props.modal.data.description || ''} name="description" disabled></textarea>
                                        </div>
                                        <div className="form-group">
                                            <label>{trans('main.INFO_LBL_INTERVIEW_ADDRESS')}</label>
                                            <input className="form-control" value={this.props.modal.data.address || ''} name="address" disabled />
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>{trans('main.INFO_LBL_INTERVIEW_DATE_ONE')}</label>
                                                    <div className="input-group date" id="firstDateGroup" data-target-input="nearest">
                                                        <input type="text" className="form-control datetimepicker-input" id="firstDateConfirm" value={this.props.modal.data.meeting_date_one || ''} disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="d-none d-md-block">&nbsp;</label>
                                                    <div className="input-group date" id="firstTimeGroup" data-target-input="nearest">
                                                        <input type="text" className="form-control datetimepicker-input" id="firstTimeConfirm" value={this.props.modal.data.meeting_time_one || ''} disabled />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>{trans('main.INFO_LBL_INTERVIEW_DATE_TWO')}</label>
                                                    <div className="input-group date" id="firstDateGroup" data-target-input="nearest">
                                                        <input type="text" className="form-control datetimepicker-input" id="secondDateConfirm" value={this.props.modal.data.meeting_date_two || ''} disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="d-none d-md-block">&nbsp;</label>
                                                    <div className="input-group date" id="firstTimeGroup" data-target-input="nearest">
                                                        <input type="text" className="form-control datetimepicker-input" id="secondTimeConfirm" value={this.props.modal.data.meeting_time_two || ''} disabled />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>{trans('main.INFO_LBL_INTERVIEW_DATE_THREE')}</label>
                                                    <div className="input-group date" id="firstDateGroup" data-target-input="nearest">
                                                        <input type="text" className="form-control datetimepicker-input" id="thirdDateConfirm" value={this.props.modal.data.meeting_date_three || ''} disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="d-none d-md-block">&nbsp;</label>
                                                    <div className="input-group date" id="firstTimeGroup" data-target-input="nearest">
                                                        <input type="text" className="form-control datetimepicker-input" id="thirdTimeConfirm" value={this.props.modal.data.meeting_time_three || ''} disabled />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-100 text-center">
                                            <button type="button" className="btn btn-secondary mr-1 ms-previous" onClick={this.props.handleClickPrevious}>{trans('main.INFO_LBL_PREV')}</button>
                                            <button type="button" className="btn btn-success ms-next" onClick={this.handleSubmit}>{trans('main.INFO_LBL_SEND')}</button>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <CompleteMessageUser handleClickClose={this.props.handleClickClose} />
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
