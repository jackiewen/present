import React from 'react';

export default function BoxSelectAdviser(props) {
    return (
        <div className="card card-info h-100">
            <div className="card-header">
                <h3 className="card-title">
                    { trans('main.INFO_LBL_SELECTED_ADVISER') }
                </h3>
            </div>
            <div className="card-body">
                <div className="mentors">
                    {props.listSelected && props.listSelected.map(item => {
                        const adviser = item.adviser.data;
                        return (<span key={'mentor' + item.adviser_id} className="badge badge-custom badge-info-custom p-3 d-flex justify-content-between w-100">
                            <div className="text-left w-100">
                                <p>ID: {adviser.komon_id} <a onClick={() => props.handleEditSelected(adviser.id)}><i className="fas fa-pencil-alt"></i></a></p>
                                <p className="text-wrap">{adviser.company_name}　{adviser.position}</p>
                            </div>
                            <a onClick={() => props.handleDeleteSelected(adviser.id)}><i className="fas fa-times"></i></a>
                        </span>)
                    })}
                </div>
            </div>
        </div>
    );

}