import React from 'react';
import THSort from '../partials/THSort';
import { Link, generatePath } from 'react-router-dom';
import { getPath, truncate } from '../../../../helpers';
import { ADMIN_DETAIL_ADVISER_SELECTION_PATH } from '../../../../constants/path';

export default function AdviserSelectionTable(props) {
    return (
        <div className="table-responsive">
            <table className="table table-bordered table-striped datatable">
                <thead>
                    <tr>
                        <THSort  class="text-center" name="id" {...props.sort}>{ trans('main.INFO_LBL_REQUEST_ADVISER_ID') }</THSort>
                        <THSort name="fullname" {...props.sort}>{ trans('main.INFO_LBL_REQUEST_FULLNAME') }</THSort>
                        <THSort name="topic_name" {...props.sort}>{ trans('main.INFO_LBL_SUBJECT') }</THSort>
                        <THSort name="date_request" {...props.sort}>{ trans('main.INFO_LBL_REQUEST_DATE') }</THSort>
                        <THSort name="select_status" {...props.sort}>{ trans('main.INFO_LBL_STATUS') }</THSort>
                        <THSort name="admin_fullname" {...props.sort}>{ trans('main.INFO_LBL_ADMIN_NAME') }</THSort>
                        <th className="text-center action">{ trans('main.INFO_LBL_ACTION') }</th>
                    </tr>
                </thead>
                <tbody>
                    {props.dataSource && props.dataSource.map((item) => (
                        <tr key={item.id}>
                            <td width="15%"  className="text-center">{item.id || ''}</td>
                            <td width="20%">{item.fullname || ''}</td>
                            <td width="25%" title={item.topic_name}>{item.topic_name ? truncate(item.topic_name, 50) : ''}</td>
                            <td width="15%">{item.date_request || ''}</td>
                            <td width="20%">{item.select_status || ''}</td>
                            <td width="20%">{item.admin_fullname || ''}</td>
                            <td className="text-center" width="5%">
                                <Link
                                    className="btn btn-sm btn-info white-color" 
                                    to={generatePath(getPath(ADMIN_DETAIL_ADVISER_SELECTION_PATH), {id: item.id})}>
                                    { trans('main.SCN_DETAIL') }
                                </Link>
                            </td>
                        </tr>
                    ))}
                    {_.isEmpty(props.dataSource) && <tr className="text-center"><td className="text-center" colSpan={7}>{ trans('main.INFO_NO_RESULT') }</td></tr>}
                </tbody>
            </table>
        </div>
    );

}
