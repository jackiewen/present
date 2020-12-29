import React from 'react';

export default function Reason(props) {
    return (
        <div className="callout callout-warning mt-3 mb-0 shadow-none">
            <div className="row">
                <div className="col-md-12">
                    <div>
                        {trans('main.INFO_LBL_REASON')}：<br/>
                        {props.reason}
                    </div>
                </div>
            </div>
        </div>
    );

}
