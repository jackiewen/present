import React from 'react';
import THSort from '../partials/THSort';
import classNames from 'classnames';

export default function RelatedTable(props) {
    return (
        <div className="table-responsive">
            <table className="table table-bordered table-striped datatable">
                <thead>
                    <tr>
                        <THSort name="company_name" {...props.sort}>{ trans('main.INFO_LBL_COMPANY_NAME') }</THSort>
                        <THSort name="industry" {...props.sort}>{ trans('main.INFO_LBL_INDUSTRY') }</THSort>
                        <THSort name="position" {...props.sort}>{ trans('main.INFO_LBL_POSITION') }</THSort>
                        <THSort name="relationship" {...props.sort}>{ trans('main.INFO_LBL_RELATIONSHIP') }</THSort>
                        <THSort name="relation" {...props.sort}>{ trans('main.INFO_LBL_RELATION') }</THSort>
                    </tr>
                </thead>
                <tbody>
                    {props.dataSource && props.dataSource.map((item) => (
                        <tr key={item.id}>
                            <td width="20%">{item.company_name || ''}</td>
                            <td width="20%">{item.industry || ''}</td>
                            <td width="20%">{item.position || ''}</td>
                            <td width="20%">{item.relationship || ''}</td>
                            <td width="20%">{item.relation || ''}</td>
                        </tr>
                    ))}
                    {_.isEmpty(props.dataSource) && <tr className="text-center"><td  className="text-center" colSpan={5}>人脈情報なし</td></tr>}
                </tbody>
            </table>
        </div>
    );

}
