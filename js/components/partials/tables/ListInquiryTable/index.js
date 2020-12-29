import React from 'react';
import THSort from '../partials/THSort';
import { Link, generatePath } from "react-router-dom";
import {getPath} from "../../../../helpers";
import { getCommonsConfig } from "../../../../helpers";
import { ADMIN_INQUIRE_DETAIL } from '../../../../constants/path';

export default function ListInquiryTable(props) {
    const status = getCommonsConfig().inquireStatus;
    return (
        <div className="table-responsive">
            <table className="table table-bordered table-striped datatable">
                <thead>
                <tr>
                    <THSort class="text-center" name="id" {...props.sort}>{ trans('commons.inquiry.id') }</THSort>
                    <THSort name="company" {...props.sort}>{ trans('commons.inquiry.company') }</THSort>
                    <THSort name="division" {...props.sort}>{ trans('commons.inquiry.division_name') }</THSort>
                    <THSort name="user" {...props.sort}>{ trans('commons.inquiry.user_name') }</THSort>
                    <THSort name="race_user" {...props.sort}>{ trans('commons.inquiry.race_user') }</THSort>
                    <THSort name="reply_status_code" {...props.sort}>{ trans('commons.inquiry.status') }</THSort>
                    <th className="text-center action" >{ trans('commons.inquiry.action') }</th>
                </tr>
                </thead>
                <tbody>
                {props.dataSource && props.dataSource.map((item) => (
                    <tr key={item.id}>
                        <td className="text-center">{item.id}</td>
                        <td>{item.company || ''}</td>
                        <td>{item.division || ''}</td>
                        <td>{item.user || ''}</td>
                        <td>{item.race_user || ''}</td>
                        <td>{status[item.status] || ''}</td>
                        <td className="text-center">
                            <Link to={generatePath(getPath(ADMIN_INQUIRE_DETAIL), {id: item.id})} className="btn btn-info">{ trans('commons.inquiry.detail') }</Link>
                        </td>
                    </tr>
                ))}
                {_.isEmpty(props.dataSource) && <tr className="text-center"><td className="text-center" colSpan={7}>{ trans('main.INFO_NO_RESULT') }</td></tr>}
                </tbody>
            </table>
        </div>
    );

}
