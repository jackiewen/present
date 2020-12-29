import React from 'react';
import ListComment from "../../partials/ListComment";
import {ConfirmDeleteModal} from "../../partials/modals";
import {getUserType,generatePathByUserType,getPath} from "../../../helpers";
import {USER_TYPE_ADMIN} from "../../../constants/common";
import { USER_ADVISER_DETAIL_PATH, ADMIN_ADVISER_DETAIL_PATH } from './../../../constants/path';
import {
    ADMINS_INTERVIEWS_COMMENTS_CREATE,
    ADMINS_INTERVIEWS_COMMENTS_LOAD_MORE,
    USER_INTERVIEWS_COMMENTS_CREATE, USER_INTERVIEWS_COMMENTS_LOAD_MORE,
} from "../../../constants/endpoint";
import {generatePath} from 'react-router-dom';

class Interview extends React.Component {
    constructor (props) {
        super(props);
        this.config = JSON.parse(localStorage.getItem('config'));
        this.isFetching = false;
        this.add_comment_url = getUserType() === USER_TYPE_ADMIN
            ? ADMINS_INTERVIEWS_COMMENTS_CREATE
            : USER_INTERVIEWS_COMMENTS_CREATE;
        this.load_more_url = getUserType() === USER_TYPE_ADMIN
            ? ADMINS_INTERVIEWS_COMMENTS_LOAD_MORE
            : USER_INTERVIEWS_COMMENTS_LOAD_MORE;
    }

    getStatusName = (value) => {
        let status = this.config.interviewStatus.filter( obj => {
            return String(obj.id) === String(value);
        });
        return status[0];
    };

    handleCancel = () => {
        this.props.handleCancel(this.props.data.id);
    };

    render() {
        const status = this.getStatusName(this.props.data.interview_status_code);
        return (
            <React.Fragment>
                <div className="card card-primary card-outline mt-5">
                    <div className="card-header">
                        <div className="float-right">
                                <a target="_blank" className="btn btn-sm btn-info btn-detail-adviser mx-2"
                                        href={generatePathByUserType(getPath(ADMIN_ADVISER_DETAIL_PATH), getPath(USER_ADVISER_DETAIL_PATH),
                                            {
                                                id: this.props.data.adviser.id
                                            }
                                        )}
                                    >
                                        <i className="fas fa-info-circle" /> {trans('main.INFO_DETAIL')}
                            </a>
                            {parseInt(this.props.data.interview_status_code) !== 4 &&
                            <button className="btn btn-sm btn-danger mx-2" onClick={this.handleCancel}>
                                <i className="fas fa-trash" />
                                {trans('main.SCN_CANCEL_REQUEST')}
                            </button>
                            }
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <label className="col-form-label col-sm-2">{trans('commons.interview.komon_id')}</label>
                            <div className="col-sm-10 pt-2 pb-2 custom-label">{this.props.data.adviser.komon_id}</div>
                        </div>
                        <div className="row">
                            <label className="col-form-label col-sm-2">{trans('commons.interview.adviser_info')}</label>
                            <div className="col-sm-10 pt-2 pb-2 custom-label">{this.props.data.adviser_company || ''}　{this.props.data.adviser_position || ''}</div>
                        </div>
                        <div className="row">
                            <label className="col-form-label col-sm-2">{trans('commons.interview.status')}</label>
                            <div className="col-sm-10 pt-2 pb-2 custom-label"> {!_.isEmpty(status) ?  status.status_name :'N/A' }</div>
                        </div>
                        <div className="row">
                            <label className="col-form-label col-sm-2">{trans('commons.interview.address')}</label>
                            <div className="col-sm-10 pt-2 pb-2 custom-label">{this.props.data.address}</div>
                        </div>
                        <div className="row mb-2">
                            <label className="col-form-label col-sm-2">{trans('commons.interview.meting_date')}</label>
                            <div className="col-sm-10 pt-2 pb-2 custom-label">
                                {!_.isEmpty(this.props.data.meeting_date_confirm)
                                    ? <span>① {this.props.data.meeting_date_confirm} ~</span>
                                    : <React.Fragment>
                                        <span>① {this.props.data.meeting_date_one} ~</span><br />
                                        <span>② {this.props.data.meeting_date_two} ~</span><br />
                                        <span>③ {this.props.data.meeting_date_three} ~</span>
                                    </React.Fragment>
                                }
                            </div>
                        </div>
                        <div className="row">
                            <label className="col-form-label col-sm-2">{trans('commons.interview.description')}</label>
                            <div className="col-sm-10 pt-2 pb-2 custom-label">{this.props.data.description}</div>
                        </div>

                        <ListComment
                            data={this.props.data.comments}
                            add_comment_url={this.add_comment_url}
                            load_more_url={this.load_more_url}
                            model_id={this.props.data.id}
                        />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Interview;
