import React from 'react';
import AsyncSelectComponent from "../../partials/AsyncSelect";
import { connect } from 'react-redux';
import { showToast } from "../../../actions/toast";
import {
    ADMIN_FOR_SELECT,
    ADMINS_INTERVIEW_UPDATE_ADMIN,
    ADMINS_INTERVIEW_UPDATE_DATE,
    ADMINS_INTERVIEW_CONFIRM_CANCEL,
    ADMINS_INTERVIEWS_COMMENTS_CREATE,
    USER_INTERVIEWS_COMMENTS_CREATE,
    ADMINS_INTERVIEWS_COMMENTS_LOAD_MORE, USER_INTERVIEWS_COMMENTS_LOAD_MORE
} from "../../../constants/endpoint";
import {ConfirmDeleteModal} from "../../partials/modals";
import { generatePath } from 'react-router-dom';
import {getCommonsConfig, getUserType} from "../../../helpers";
import ListComment from "../../partials/ListComment";
import {USER_TYPE_ADMIN} from "../../../constants/common";

class InterviewDetail extends React.Component {
    constructor (props) {
        super(props);
        this.state = {admin: {}};
        this.admin = {};
        this.confirm_message = trans('main.INFO_CHANGE_PIC_CONFIRM', {'attribute': trans('main.INFO_LBL_INTERVIEW')});
        this.confirm_title = trans('main.INFO_CHANGE_PIC', {'attribute': trans('main.INFO_LBL_INTERVIEW')})
        this.isFetching = false;
        this.isFetchingConfirmDate = false;
        this.isFetchingConfirmCancel = false;
        this.confirm_date = {date: '', time: ''};
        this.need_comment = [1, 2, 3];
        this.add_comment_url = getUserType() === USER_TYPE_ADMIN
            ? ADMINS_INTERVIEWS_COMMENTS_CREATE
            : USER_INTERVIEWS_COMMENTS_CREATE;
        this.load_more_url = getUserType() === USER_TYPE_ADMIN
            ? ADMINS_INTERVIEWS_COMMENTS_LOAD_MORE
            : USER_INTERVIEWS_COMMENTS_LOAD_MORE;
            
    }

    componentDidMount() {
        this.interview_status = this.getInterviewStatus() || [];
        $('#date-interview').datetimepicker({
            locale: "ja",
            format: 'L',
            dayViewHeaderFormat: 'YYYY 年 MM 月',
            icons: {
                time: "fa fa-clock",
            },
            minDate:  moment().millisecond(0).second(0).minute(0).hour(0),
        });
        $('#time-interview').datetimepicker({
            locale: "ja",
            format: 'LT',
            icons: {
                time: "fa fa-clock",
            },
            stepping: 5,
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        $('#date-interview').datetimepicker({
            locale: "ja",
            format: 'L',
            dayViewHeaderFormat: 'YYYY 年 MM 月',
            icons: {
                time: "fa fa-clock",
            },
            minDate: moment().millisecond(0).second(0).minute(0).hour(0),
            
        });
        
        $("#date-interview").on("change.datetimepicker", ({date}) => {
          
            if(new Date(date).setHours(0,0,0,0) == new Date().setHours(0,0,0,0)) {
                $('#time-interview').data("datetimepicker").minDate(new Date());
                $('#time-interview').data("datetimepicker").date(new Date());
            }else {
                $('#time-interview').data("datetimepicker").minDate(new Date('1999/10/25'));
            }
            $('#time-interview').change();
        })
        $('#time-interview').datetimepicker({
                locale: "ja",
                format: 'LT',
                icons: {
                    time: "fa fa-clock",
                },
                stepping: 5,
            });
        
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!_.isEqual(nextProps.admin, prevState.admin) && !prevState.admin?.isUpdate) {
            return {
                admin: nextProps.admin
            }
        }
        return null;
    }
    handleKeyPress = (e) => {
        var evt = e || window.event;
        evt.preventDefault();
        return false;
      }
    handleSelectChange = (e) => {
        $('#ConfirmDeleteModal').modal('show');
        this.admin = e;
    };

    handleAdminChange = () => {
        if (!this.isFetching ) {
            this.isFetching = true;
            axios.post(generatePath(ADMINS_INTERVIEW_UPDATE_ADMIN, {id: this.props.interview.id}), {race_admin: this.admin.value})
                .then( rs => {
                    this.props.dispatch(showToast({type: 'success', message: trans('main.MSG_CHANGE_PIC_COMPLETE')}));
                    this.setState({admin: Object.assign(this.admin, {isUpdate: true})}, () => {
                        this.isFetching = false;
                    });
                })
                .catch( err => {
                    // console.log(err.response);
                    this.props.dispatch(showToast({type: 'error', message: trans('main.ESYS_0002')}));
                    this.isFetching = false;
                });
        }
    };

    handleConfirmDateChange = (e) => {
        let target = e.target;
        if (target.id === 'date') {
            this.confirm_date.date = target.value;
        } else {
            this.confirm_date.time = target.value;
        }
    };

    handleConfirmDate = () => {
        console.log(this.confirm_date);
        if (!this.isFetchingConfirmDate) {
            if(this.confirm_date.date =='' ||  this.confirm_date.time ==""){
                $('.error-messages-datetime').text(trans('main.EVAL_REQUIRED', {'attribute': trans('main.INFO_LBL_DATE_COMFIRM')}));
                $('.error-messages-datetime').removeClass('hide');
                return false;
            }
            this.isFetchingConfirmDate = true;
            axios.post(generatePath(ADMINS_INTERVIEW_UPDATE_DATE, {id: this.props.interview.id}), this.confirm_date)
                .then( rs => {
                    this.props.featchingData();
                    this.isFetchingConfirmDate = false;
                    this.props.dispatch(showToast({type: 'success', message: trans('main.MSG_CONFIRM_DAYOFINTERVIEW')}));
                })
                .catch(err => {
                    // console.log(err.response);
                    this.props.dispatch(showToast({type: 'error', message: trans('main.ESYS_0002')}));
                    this.isFetchingConfirmDate = false;
                })
        }
    };

    handelConfirmCancel = () => {
        if (!this.isFetchingConfirmCancel) {
            this.isFetchingConfirmCancel = true;
            axios.post(generatePath(ADMINS_INTERVIEW_CONFIRM_CANCEL, {id: this.props.interview.id}))
                .then( rs => {
                    this.props.dispatch(showToast({type: 'success', message: trans('main.INFO_CONFIRM_REQUEST_CANCEL_INTERVIEW')}));
                    this.props.featchingData();
                    this.isFetchingConfirmCancel = false;
                })
                .catch(err => {
                    // console.log(err.response);
                    this.props.dispatch(showToast({type: 'error', message: trans('main.ESYS_0002')}));
                    this.isFetchingConfirmCancel = false;
                })
        }
    };

    getInterviewStatus = () => {
        let config = getCommonsConfig()?.interviewStatus || [];
        let data = {};
        config.forEach( element => {
            data[element.id] = element.status_name
        });
        return data;
    };

    render() {
        const status = !_.isUndefined(this.interview_status) ? this.interview_status[this.props.interview?.interview_status_code] : '';
        return (
            <React.Fragment>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12 pt-3">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6 mt-3">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <label className="mb-0 col-form-label">{trans('commons.interview_detail.race_users')}</label>
                                                    </div>
                                                    <div className="col-md-8 col-xl-7">
                                                        <AsyncSelectComponent
                                                            url={ADMIN_FOR_SELECT}
                                                            handleChangeSelect={this.handleSelectChange}
                                                            value={this.state.admin}
                                                            isClearable={false}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mt-5">
                                                    <div className="col-md-4">
                                                        <label className="col-form-label">{trans('commons.interview_detail.company_name')}</label>
                                                    </div>
                                                    <div className="col-md-8 col-xl-7 pt-2 pb-2">
                                                        {this.props.user?.company}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <label className="col-form-label">{trans('commons.interview_detail.user_name')}</label>
                                                    </div>
                                                    <div className="col-md-8 col-xl-7 pt-2 pb-2">
                                                        {this.props.user?.name}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <label className="col-form-label">{trans('commons.interview_detail.division')}</label>
                                                    </div>
                                                    <div className="col-md-8 col-xl-7 pt-2 pb-2">
                                                        {this.props.user?.division}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <label className="col-form-label">{trans('commons.interview_detail.komon_id')}</label>
                                                    </div>
                                                    <div className="col-md-8 col-xl-7 pt-2 pb-2">
                                                        {this.props.adviser?.komon_id}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <label className="col-form-label">{trans('commons.interview_detail.adviser_info')}</label>
                                                    </div>
                                                    <div className="col-md-8 col-xl-7 pt-2 pb-2">
                                                        {this.props.adviser?.adviser_company} <span>　</span>{this.props.adviser?.adviser_position}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <label className="col-form-label">{trans('commons.interview_detail.status')}</label>
                                                    </div>
                                                    <div
                                                        className={parseInt(this.props.interview?.interview_status_code) === 4
                                                                        ? "col-md-8 col-xl-7 pt-2 pb-2 text-danger" : "col-md-8 col-xl-7 pt-2 pb-2"}>
                                                        { status }
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <label className="col-form-label">{trans('commons.interview_detail.address')}</label>
                                                    </div>
                                                    <div className="col-md-8 col-xl-7 pt-2 pb-2">
                                                        {this.props.interview?.address}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <label className="col-form-label">
                                                        {!_.isEmpty(this.props.interview?.meeting_date_confirm) ?
                                                            trans('commons.interview_detail.lbl_date_confirm') :trans('commons.interview_detail.date') }
                                                        </label>
                                                    </div>
                                                    <div className="col-md-8 col-xl-7 pt-2 pb-2">
                                                        {!_.isEmpty(this.props.interview?.meeting_date_confirm)
                                                            ?  moment(this.props.interview?.meeting_date_confirm).format('YYYY/MM/DD HH:mm:ss')
                                                            : <React.Fragment>
                                                                <span >① {moment(this.props.interview?.meeting_date_one).format('YYYY/MM/DD HH:mm:ss')}</span> <br />
                                                                <span >② {moment(this.props.interview?.meeting_date_two).format('YYYY/MM/DD HH:mm:ss')}</span> <br />
                                                                <span >③ {moment(this.props.interview?.meeting_date_three).format('YYYY/MM/DD HH:mm:ss')}</span>
                                                            </React.Fragment>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <label className="col-form-label">{trans('commons.interview_detail.description')}</label>
                                                    </div>
                                                    <div className="col-md-8 col-xl-7 pt-2 pb-2 mt-1">
                                                        { this.props.interview?.description }
                                                    </div>
                                                </div>
                                                {this.props.interview && _.isEmpty(this.props.interview?.meeting_date_confirm) && parseInt(this.props.interview?.interview_status_code) <= 3 &&
                                                    <div className="row mt-3">
                                                        <div className="col-md-4">
                                                            <label className="col-form-label"> {trans('commons.interview_detail.date_confirm')} </label>
                                                        </div>
                                                        <div className="col-md-8 col-xl-7 mt-1">
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="input-group date" id="date-interview"
                                                                         data-target-input="nearest">
                                                                        <input type="text"  autoComplete="off"
                                                                               className="form-control datetimepicker-input"
                                                                               data-target="#date-interview"
                                                                               data-toggle="datetimepicker"
                                                                               id="date"
                                                                               defaultValue={this.confirm_date.date}
                                                                               onBlur={this.handleConfirmDateChange}
                                                                               onChange={this.handleConfirmDateChange}
                                                                               onKeyDown={this.handleKeyPress} 
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="input-group date" id="time-interview"
                                                                         data-target-input="nearest">
                                                                        <input type="text" autoComplete="off"
                                                                               className="form-control datetimepicker-input"
                                                                               data-target="#time-interview"
                                                                               data-toggle="datetimepicker"
                                                                               id="time"
                                                                               defaultValue={this.confirm_date.time}
                                                                               onBlur={this.handleConfirmDateChange}
                                                                               onChange={this.handleConfirmDateChange}
                                                                               onKeyDown={this.handleKeyPress} 
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <span className="error-messages-datetime text-danger hide"></span>
                                                            <div className="mt-3">
                                                                <button className="btn btn-primary float-right" onClick={this.handleConfirmDate}>
                                                                    { trans('commons.interview_detail.date_confirm_btn') }
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                { parseInt(this.props.interview?.interview_status_code) === 4 &&
                                                    <div className="row mt-3">
                                                        <div className="col-md-4" />
                                                        <div className="col-md-8 col-xl-7">
                                                            <button className="btn btn-danger float-right" onClick={this.handelConfirmCancel}>
                                                                {trans('commons.interview_detail.confirm_cancel')}
                                                            </button>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                            <div className="col-md-6">
                                                {this.need_comment.indexOf(parseInt(this.props.interview?.interview_status_code)) !== -1 &&
                                                    <ListComment
                                                        data={this.props.comments}
                                                        add_comment_url={this.add_comment_url}
                                                        load_more_url={this.load_more_url}
                                                        model_id={this.props.interview.id}
                                                    />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <ConfirmDeleteModal confirm_message={this.confirm_message} confirm_title={this.confirm_title} handleDeleteAction={this.handleAdminChange}/>
            </React.Fragment>
        );
    }
}

export default connect()(InterviewDetail);
