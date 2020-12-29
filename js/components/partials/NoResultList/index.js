import React from 'react';

export default function NoResultList(props) {
    return (
        <div className="card card-outline card-info card-data">
            <div className="card-body text-center">
                { props.message || trans('main.INFO_NO_RESULT')}
            </div>
        </div>
    );

}