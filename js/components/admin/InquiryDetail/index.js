import React from 'react';
import { connect } from 'react-redux';
import { showToast } from "../../../actions/toast";
import {
    ADMIN_FOR_SELECT,
    ADMINS_INQUIRE_UPDATE_ADMIN,
    ADMINS_INQUIRE_COMMENTS_CREATE,
    ADMINS_INQUIRE_COMMENTS_LOAD_MORE,
    USER_INQUIRE_COMMENTS_CREATE,
    USER_INQUIRE_COMMENTS_LOAD_MORE
} from "../../../constants/endpoint";
import AsyncSelectComponent from "../../partials/AsyncSelect";
import {ConfirmDeleteModal} from "../../partials/modals";
import { generatePath } from 'react-router-dom';
import ListComment from "../../partials/ListComment";
import {getUserType} from "../../../helpers";
import {USER_TYPE_ADMIN} from "../../../constants/common";

class InquiryDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {admin: {}};
        this.confirm_message = trans('main.INFO_CHANGE_PIC_CONFIRM', {'attribute': trans('main.INFO_LBL_INQUIRE')});
        this.confirm_title = trans('main.INFO_CHANGE_PIC', {'attribute': trans('main.INFO_LBL_INQUIRE')});
        this.admin = {};
        this.add_comment_url = getUserType() === USER_TYPE_ADMIN
            ? ADMINS_INQUIRE_COMMENTS_CREATE
            : USER_INQUIRE_COMMENTS_CREATE;
        this.load_more_url = getUserType() === USER_TYPE_ADMIN
            ? ADMINS_INQUIRE_COMMENTS_LOAD_MORE
            : USER_INQUIRE_COMMENTS_LOAD_MORE;
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!_.isEqual(nextProps.admin, prevState.admin) && !prevState.admin?.isUpdate) {
            return {
                admin: nextProps.admin
            }
        }
        return null;
    }

    handleSelectChange = (e) => {
        $('#ConfirmDeleteModal').modal('show');
        this.admin = e;
    };

    handleAdminChange = () => {
        if (!this.isFetching ) {
            this.isFetching = true;
            axios.post(generatePath(ADMINS_INQUIRE_UPDATE_ADMIN, {id: this.props.inquire.id}), {race_admin: this.admin.value})
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

    render() {
        return (
            <React.Fragment>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12 pt-3">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row mt-2">
                                            <div className="col-md-12">
                                                <div className="card card-primary card-outline">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <label className="col-form-label col-sm-2">
                                                                {trans('commons.inquiry.company')}
                                                            </label>
                                                            <div className="col-sm-10 pt-2 pb-2">
                                                                {this.props.user?.company}
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <label className="col-form-label col-sm-2">
                                                                {trans('commons.inquiry.user_name')}
                                                            </label>
                                                            <div className="col-sm-10 pt-2 pb-2">
                                                                {this.props.user?.name}
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <label className="col-form-label col-sm-2">
                                                                {trans('commons.inquiry.division_name')}
                                                            </label>
                                                            <div className="col-sm-10 pt-2 pb-2">
                                                                {this.props.user?.division}
                                                            </div>
                                                        </div>

                                                        <hr />

                                                        <div className="row">
                                                            <label className="col-form-label col-sm-2">
                                                                {trans('commons.inquiry.komon_id')}
                                                            </label>
                                                            <div className="col-sm-10 pt-2 pb-2">
                                                                {this.props.adviser?.komon_id}
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <label className="col-form-label col-sm-2">
                                                                {trans('commons.inquiry.adviser_place')}
                                                            </label>
                                                            <div className="col-sm-10 pt-2 pb-2">
                                                                {this.props.adviser?.adviser_company}<span>　</span>{this.props.adviser?.adviser_position}
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <label className="col-form-label col-sm-2">
                                                                {trans('commons.inquiry.date')}
                                                            </label>
                                                            <div className="col-sm-10 pt-2 pb-2">
                                                                {this.props.inquire?.created_at?
                                                                    moment(this.props.inquire?.created_at).format('YYYY/MM/DD HH:mm:ss'):''
                                                                }
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <label className="col-form-label col-sm-2">
                                                                {trans('commons.inquiry.topic')}
                                                            </label>
                                                            <div className="col-sm-10 pt-2 pb-2">
                                                                {this.props.inquire?.topic_name}
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <label className="col-form-label col-sm-2">
                                                                {trans('commons.inquiry.description')}
                                                            </label>
                                                            <div className="col-sm-10 pt-2 pb-2">
                                                                {this.props.inquire?.description}
                                                            </div>
                                                        </div>

                                                        <hr/>

                                                        <div className="row mt-3">
                                                            <div className="col-md-2">
                                                                <div className="form-group">
                                                                    <label>{trans('commons.inquiry.race_admin')}</label>
                                                                    <AsyncSelectComponent
                                                                        url={ADMIN_FOR_SELECT}
                                                                        handleChangeSelect={this.handleSelectChange}
                                                                        value={this.state.admin}
                                                                        isClearable={false}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <ListComment
                                                            data={this.props.comments}
                                                            add_comment_url={this.add_comment_url}
                                                            load_more_url={this.load_more_url}
                                                            model_id={this.props.inquire?.id}
                                                        />
                                                    </div>
                                                </div>
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
        )
    }
}

export default connect()(InquiryDetail);
