import React from 'react';
import classNames from 'classnames';

export default function ProgressBar(props) {
    return (
        <ul className="ms-progressbar">
            {props.items && props.items.map((item, index) => (
                <li key={'progressbar-item' + index} className={classNames(item, props.step >= (index + 1) ? "active" : "")}><strong></strong></li>
            ))}
        </ul> 
    );

}