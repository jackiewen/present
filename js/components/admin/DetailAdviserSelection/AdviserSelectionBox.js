import React from 'react';
import { selectStatusCode } from '../../../config/status';

export default function AdviserSelection(props) {
    return (
        <div className="card card-primary card-outline">
            <div className="card-body">
                <div className="row">
                    <label className="col-form-label col-sm-2">{trans('main.INFO_LBL_REQUEST_ADVISER_ID')}</label>
                    <div className="col-sm-10 pt-2 pb-2">{props.id}</div>
                </div>
                <div className="row">
                    <label className="col-form-label col-sm-2">{trans('main.INFO_LBL_SUBJECT')}</label>
                    <div className="col-sm-10 pt-2 pb-2">{props.topic_name}</div>
                </div>
                <div className="row">
                    <label className="col-form-label col-sm-2">{trans('main.INFO_LBL_REQUEST_COMPANY')}</label>
                    <div className="col-sm-10 pt-2 pb-2">{props.company_name}</div>
                </div>
                <div className="row">
                    <label className="col-form-label col-sm-2">{trans('main.INFO_LBL_REQUEST_FULLNAME')}</label>
                    <div className="col-sm-10 pt-2 pb-2">{props.race_user_name}</div>
                </div>
                <div className="row">
                    <label className="col-form-label col-sm-2">{trans('main.INFO_LBL_REQUEST_DATE')}</label>
                    <div className="col-sm-10 pt-2 pb-2">{props.date_request}</div>
                </div>
                <div className="row">
                    <label className="col-form-label col-sm-2">{trans('main.INFO_LBL_REQUEST_DESCRIPTION')}</label>
                    <div className="col-sm-10 pt-2 pb-2">{props.description}</div>
                </div>
            </div>
        </div>
    );

}
