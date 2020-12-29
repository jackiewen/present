import React from 'react';
import THSort from '../partials/THSort';
import { Link, generatePath } from "react-router-dom";
import {getPath, getCommonsConfig} from "../../../../helpers";
import * as pathConstants from "../../../../constants/path";

export default function ListInterviewTable(props) {
    const config = getCommonsConfig();
    const status = {};
    config?.interviewStatus.forEach( element => {
        if (parseInt(element.id) === 4 || parseInt(element.id) === 5) {
            status[element.id] = {name: element.status_name, class_name: 'bg-danger'};
        } else if (parseInt(element.id) === 1) {
            status[element.id] = {name: element.status_name, class_name: 'bg-primary'};
        } else {
            status[element.id] = {name: element.status_name, class_name: 'default'};
        }
    });
    return (
        <div className="table-responsive">
            <table className="table table-bordered table-striped datatable">
                <thead>
                <tr>
                    <th >{ trans('main.INFO_ID') }</th>
                    <THSort name="user_name" {...props.sort}>{ trans('main.INFO_NAME') }</THSort>
                    <THSort name="company_name" {...props.sort}>{ trans('commons.interview_admin.company_department') }</THSort>
                    <THSort name="race_user" {...props.sort}>{ trans('commons.interview_admin.race_user') }</THSort>
                    <THSort name="status" {...props.sort}>{ trans('commons.interview_admin.status') }</THSort>
                    <th className="text-center action" >{ trans('commons.interview_admin.action') }</th>
                </tr>
                </thead>
                <tbody>
                {props.dataSource && props.dataSource.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.user_name || ''}</td>
                        <td>{item.user_company.company_name || ''} {item.user.division || ''}</td>
                        <td >{item.race_user || ''}</td>
                        <td className={status[item.interview_status_code].class_name !== 'default' ? status[item.interview_status_code].class_name : ''}>
                            {status[item.interview_status_code].name}
                        </td>
                        <td className="text-center">
                            <Link className="btn btn-info" to={generatePath(getPath(pathConstants.ADMIN_INTERVIEWS_DETAIL_PATH), {id: item.id})}>
                                {trans('commons.interview_admin.detail')}
                            </Link>
                        </td>
                    </tr>
                ))}
                {_.isEmpty(props.dataSource) && <tr className="text-center"><td className="text-center" colSpan={6}>{ trans('main.INFO_NO_RESULT') }</td></tr>}
                </tbody>
            </table>
        </div>
    );

}
