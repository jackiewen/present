import React, {useEffect} from 'react';
import THSort from '../partials/THSort';
import { useDispatch } from 'react-redux'
import {openModal} from "../../../../actions/modal";
import { Link, generatePath } from "react-router-dom";
import { LIST_ACCOUNT_COMPANY } from "../../../../constants/path";
import './company.css';
import {getPath, truncate} from "../../../../helpers";

export default function CompanyTable(props) {
    useEffect(() => {
        $(document).ready(function() {
            $('[data-toggle="popover"]').popover()
        })
    });

    const dispatch = useDispatch();
    return (
        <div className="table-responsive">
            <table className="table table-bordered table-striped datatable">
                <thead>
                <tr>
                    <THSort name="id" {...props.sort}>{ trans('main.INFO_ID') }</THSort>
                    <THSort name="company_name" {...props.sort}>{ trans('commons.company.name') }</THSort>
                    <th >{ trans('main.INFO_LBL_ADMIN_NAME') }</th>
                    <THSort style={{width: 10 + '%'}} class="text-center" name="total_member" {...props.sort}>{ trans('main.INFO_LBL_TOTAL_ACCOUNT') }</THSort>
                    <th className="text-center action" ><i className="fas fa-list" /></th>
                    <th className="text-center action"><i className="far fa-edit" /></th>
                </tr>
                </thead>
                <tbody>
                {props.dataSource && props.dataSource.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        {/*<td>{item.company_name || ''}</td>*/}
                        <td>
                            <a style={{cursor: 'pointer'}} data-container="body"
                                    data-toggle="popover" data-placement="top"
                                    data-trigger="hover"
                                    data-content={item.company_name || ''}>
                                {item.company_name ? truncate(item.company_name, 20, '...') : ''}
                            </a>
                        </td>
                        <td style={{width: 25 + '%'}}>
                            {item.admins.map( (element, index) => (
                                index === 0
                                    ? <span key={element.value}>{element.label}</span>
                                    : <span key={element.value}>, {element.label}</span>
                            ))}
                        </td>
                        <td className="text-center">{item.number_user || 0}</td>
                        <td className="text-center">
                            <Link to={generatePath(getPath(LIST_ACCOUNT_COMPANY), {id: item.id})} className="btn btn-info">アカウント一覧</Link>
                        </td>
                        <td className="text-center">
                            <button className="btn btn-info" onClick={() => dispatch(openModal({name: 'CompanyModal', data: item}))}>編集/担当社員登録</button>
                        </td>
                    </tr>
                ))}
                {_.isEmpty(props.dataSource) && <tr className="text-center"><td className="text-center" colSpan={6}>{ trans('main.INFO_NO_RESULT') }</td></tr>}
                </tbody>
            </table>
        </div>
    );

}
