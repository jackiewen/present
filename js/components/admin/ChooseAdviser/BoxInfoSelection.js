import { transform } from 'lodash';
import React from 'react';

export default function BoxInfoSelection(props) {
    return (
        <div className="card card-info">
            <div className="card-body">
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">{trans('main.INFO_LBL_TOPIC_SELECT')}</label>
                    <div className="col-sm-10 pt-2 pb-2">
                        {props.topic_name}
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">{trans('main.INFO_LBL_COMPANY_NAME')}</label>
                    <div className="col-sm-10 pt-2 pb-2">
                        {props.company_name}
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">{trans('main.INFO_LBL_REQUEST_DESCRIPTION')}</label>
                    <div className="col-sm-10 pt-2 pb-2">
                        {props.description}
                    </div>
                </div>
            </div>
        </div>
    );

}