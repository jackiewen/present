import React, { useState } from 'react';

export default function Alert(props) {
    const titles = {
        success: trans('main.INFO_LBL_SUCCESS'),
        danger: trans('main.INFO_LBL_ERROR'),
        info: trans('main.INFO_LBL_INFO'),
        warning: trans('main.INFO_LBL_WARNING'),
    }
    const icons = {
        success: 'fas fa-check',
        danger: 'fas fa-ban',
        info: 'fas fa-info',
        warning: 'fas fa-exclamation-triangle',
    }

    const [display, setDisplay] = useState({show: 'd-block', id: (new Date().getTime())});

    return (
        <div className={"alert alert-" + props.type + " alert-dismissible " + (display.id != props.id ? 'd-block' : display.show)} >
            <button type="button" className="close" onClick={() => setDisplay({show: 'd-none', id: props.id})} aria-hidden="true">×</button>
            <h5>{props.icon || (icons[props.type] && <i className={"icon " + icons[props.type]}></i>)} {props.title || titles[props.type] || ''}</h5>
            {props.message || ''}
        </div>
    );

}