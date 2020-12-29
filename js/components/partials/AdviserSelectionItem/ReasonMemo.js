import { transform } from 'lodash';
import React from 'react';

export default function ReasonMemo(props) {
    return (
        <div className="row mt-2">
            <div className="col-md-12">
                <div className="form-group">
                    <label>{trans('main.INFO_LBL_REASON')}</label>
                    <textarea className={"form-control" + (props.adviserSelectedErrors && props.adviserSelectedErrors["choose_reason[" + props.id + "]"] ? " is-invalid":"")} 
                        name={"choose_reason[" + props.id + "]"} 
                        defaultValue={props.choose_reason} />
                    {props.adviserSelectedErrors && props.adviserSelectedErrors["choose_reason[" + props.id + "]"] && (
                        <span id={"choose_reason-" + props.id + "-error"} className="error invalid-feedback">{props.adviserSelectedErrors["choose_reason[" + props.id + "]"]}</span>
                    )}
                </div>
                <div className="form-group">
                    <label>{trans('main.INFO_LBL_MEMO')}</label>
                    <textarea 
                        className={"form-control" + (props.adviserSelectedErrors && props.adviserSelectedErrors["memo[" + props.id + "]"] ? " is-invalid":"")} 
                        name={"memo[" + props.id + "]"} 
                        defaultValue={props.memo} />
                    {props.adviserSelectedErrors && props.adviserSelectedErrors["memo[" + props.id + "]"] && (
                        <span id={"memo-" + props.id + "-error"} className="error invalid-feedback">{props.adviserSelectedErrors["memo[" + props.id + "]"]}</span>
                    )}
                </div>
            </div>
        </div>
    );

}
