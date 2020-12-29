import React from 'react';
import THSort from '../partials/THSort';
import { useDispatch } from 'react-redux'
import {openModal} from "../../../../actions/modal";
import './admin.css';

export default function UserTable(props) {
    const dispatch = useDispatch();
    return (
        <div className="table-responsive">
            <table className="table table-bordered table-striped datatable">
                <thead>
                <tr>
                    <THSort name="name" {...props.sort}>{ trans('main.INFO_NAME') }</THSort>
                    <THSort name="roles" {...props.sort}>{ trans('main.INFO_LBL_ROLE') }</THSort>
                    <THSort  class="text-center" name="num_company" {...props.sort}>{ trans('main.INFO_LBL_COMPANY_IN_CHARGE') }</THSort>
                    <th className="text-center action-admin"><i className="far fa-edit" /></th>
                </tr>
                </thead>
                <tbody>
                {props.dataSource && props.dataSource.map((item) => (
                    <tr key={item.id}>
                        <td>{item.name || ''}</td>
                        <td>{String(item.roles) === "1" ? 'あり' : 'なし'}</td>
                        <td className="text-center">{item.num_company || 0}</td>
                        <td className="d-flex">
                            <button className="btn btn-info mx-auto" onClick={() => dispatch(openModal({name: 'AdminModal', data: Object.assign({}, item, {type: 'update'})}))}>編集</button>
                        </td>
                    </tr>
                ))}
                {_.isEmpty(props.dataSource) && <tr className="text-center"><td  className="text-center" colSpan={4}>{ trans('main.INFO_NO_RESULT') }</td></tr>}
                </tbody>
            </table>
        </div>
    );

}
