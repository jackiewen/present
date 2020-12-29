import React from 'react';
import { selectStatusCode } from '../../../config/status';

export default function RequestAdviserItem(props) {
    return (
        <div className="card card-primary card-outline">
            <div className="card-body">
                <div className="row align-items-center">
                    <label className="col-form-label col-sm-4 col-lg-3">{trans('main.INFO_LBL_REQUEST_ADVISER_ID')}</label>
                    <div className="col-sm-8 col-lg-9 pt-2 pb-2">{props.id}</div>
                </div>
                <div className="row align-items-center">
                    <label className="col-form-label col-sm-4 col-lg-3">{trans('main.INFO_LBL_TOPIC')}</label>
                    <div className="col-sm-8 col-lg-9 pt-2 pb-2">{props.topic_name}</div>
                </div>
                <div className="row align-items-center">
                    <label className="col-form-label col-sm-4 col-lg-3">{trans('main.INFO_LBL_REQUEST_FULLNAME')}</label>
                    <div className="col-sm-8 col-lg-9 pt-2 pb-2">{props.fullname}</div>
                </div>
                <div className="row align-items-center">
                    <label className="col-form-label col-sm-4 col-lg-3">{trans('main.INFO_LBL_REQUEST_DATE')}</label>
                    <div className="col-sm-8 col-lg-9 pt-2 pb-2">{props.date_request}</div>
                </div>
                <div className="row align-items-center">
                    <label className="col-form-label col-sm-4 col-lg-3">{trans('main.INFO_LBL_REQUEST_DESCRIPTION')}</label>
                    <div className="col-sm-8 col-lg-9 pt-2 pb-2">{props.description}</div>
                </div>
            </div>
        </div>
    );

}
