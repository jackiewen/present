import React from 'react';
import { Link, generatePath } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { openModal } from './../../../actions/modal';
import ListComment from './../../partials/ListComment';
import { USER_ADVISER_DETAIL_PATH } from './../../../constants/path';
import {getPath} from "../../../helpers";

import {
    USER_INQUIRE_COMMENTS_CREATE,
    USER_INQUIRE_COMMENTS_LOAD_MORE
} from "../../../constants/endpoint";

export default function InquireAdviserItem(props) {
    const dispatch = useDispatch();
    return (
        <div className="card card-primary card-outline">
            <div className="card-header">
                <div className="float-right">
                    <button className="btn btn-sm btn-warning mr-1"
                        onClick={() => dispatch(openModal({ name: 'RequestInterviewModal', data: {
                            inquire_id: props.item.id,
                            adviser: {
                                id: props.item.adviser_id,
                                komon_id: props.item.komon_id,
                                company_name: props.item.company_name,
                                position: props.item.position
                            }
                        }}))}>
                        <i className="fa fa-calendar-plus"></i> 面談設定依頼</button>
                    {/* <button className="btn btn-sm btn-info btn-detail-adviser"><i className="fas fa-info-circle"></i> 顧問詳細</button> */}
                    <Link target="_blank" className="btn btn-sm btn-info btn-detail"
                        to={generatePath(getPath(USER_ADVISER_DETAIL_PATH),
                            {
                                id: props.item.adviser_id
                            }
                        )}
                    >
                        <i className="fas fa-info-circle" /> {trans('main.SCN_DETAIL')}
                    </Link>
                </div>
            </div>
            <div className="card-body">
                <div className="row">
                    <label className="col-sm-6 float-left">No.{props.item.id}</label>
                    <div className="col-sm-6 text-right custom-label">{trans('main.INFO_LBL_INQUIRE_DATE')}{props.item.inquire_date}</div>
                </div>
                <div className="row">
                    <label className="col-form-label  col-sm-4 col-lg-3">{trans('main.INFO_LBL_ADVISER_ID')}</label>

                    <div className="col-sm-8 col-lg-9 pt-2 pb-2">{props.item.komon_id}</div>
                </div>
                <div className="row">
                    <label className="col-form-label  col-sm-4 col-lg-3">{trans('main.INFO_LBL_ADVISER_POSITION')}</label>
                    <div className="col-sm-8 col-lg-9 pt-2 pb-2">{props.item.company_name}　{props.item.position}</div>
                </div>
                <div className="row">
                    <label className="col-form-label  col-sm-4 col-lg-3">{trans('main.INFO_LBL_INQUIRE_DATE')}</label>
                    <div className="col-sm-8 col-lg-9 pt-2 pb-2">{ moment(props.item.inquire_date).format('YYYY/MM/DD')}</div>
                </div>
                <div className="row">
                    <label className="col-form-label  col-sm-4 col-lg-3">{trans('main.INFO_LBL_SUBJECT')}</label>
                    <div className="col-sm-8 col-lg-9 pt-2 pb-2">{props.item.topic_name}</div>
                </div>
                <div className="row">
                    <label className="col-form-label  col-sm-4 col-lg-3">{trans('main.INFO_LBL_INQUIRE_DESCRIPTION')}</label>
                    <div className="col-sm-8 col-lg-9 pt-2 pb-2">{props.item.description}</div>

                </div>

                <ListComment
                    data={props.item?.comments || []}
                    add_comment_url={USER_INQUIRE_COMMENTS_CREATE}
                    load_more_url={USER_INQUIRE_COMMENTS_LOAD_MORE}
                    model_id={props.item.id || 0}
                />
            </div>
        </div>
    );

}
