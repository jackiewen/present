import React from 'react';

export default function CompleteMessage(props) {
    console.log(props);
    return (
        <React.Fragment>
            <h2 className="text-center my-4">
                <i className="fa fa-check-circle check-success-icon"/>
                {!_.isEmpty(props.message) ? props.message : trans('main.INFO_LBL_COMPLETE') }
            </h2>
            <div className = "w-100 text-center" >
                <button
                    onClick={props.handleClickClose}
                    type = "button"
                    className = "btn btn-secondary"
                    data-dismiss = "modal" >
                    閉じる
                </button>
            </div >
        </React.Fragment>
    );
}
