import React from 'react';
import THSort from '../partials/THSort';
import {openModal} from "../../../../actions/modal";
import { useDispatch } from 'react-redux'
import './list_acc_com.css'

export default function CompanyAccTable(props) {
    const dispatch = useDispatch();
    return (
        <div className="table-responsive">
            <table className="table table-bordered table-striped datatable" id="list-acc-com">
                <thead>
                <tr>
                    <THSort name="name" {...props.sort}>{ trans('main.INFO_NAME') }</THSort>
                    <THSort name="company" {...props.sort}>{ trans('main.INFO_LBL_COMPANY') }</THSort>
                    <THSort name="division" {...props.sort}>{ trans('main.INFO_LBL_DIVISION') }</THSort>
                    <THSort name="email" {...props.sort}>{ trans('main.INFO_LBL_EMAIL') }</THSort>
                    <THSort name="registered_date" {...props.sort}>{ trans('main.INFO_LBL_DATE_REG') }</THSort>
                    <th style={{width: 18 + '%'}} className="text-center"><i className="far fa-edit" /></th>
                </tr>
                </thead>
                <tbody>
                {props.dataSource && props.dataSource.map((item) => (
                    <tr key={item.id}>
                        <td>{item.name || ''}</td>
                        <td>{item.company_name}</td>
                        <td>{item.division}</td>
                        <td>{item.email}</td>
                        <td>{item.registered_date}</td>
                        <td className="text-center">
                            <button className="btn btn-info" onClick={() => dispatch(openModal({name: 'CompanyAccModal', data: Object.assign({}, item, {type: 'update'} , {title:trans('commons.admins.modal_update_title')})}))}>編集</button>
                        </td>
                    </tr>
                ))}
                {_.isEmpty(props.dataSource) && <tr className="text-center"><td className="text-center" colSpan={6}>{ trans('main.INFO_NO_RESULT') }</td></tr>}
                </tbody>
            </table>
        </div>
    );

}
