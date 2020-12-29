import React, { useEffect } from 'react';
import AdviserRelatedItem from '../AdviserRelatedItem';
import { SEARCH_RELATED_ADVISER_ENDPOINT, DOWNLOAD_ADVISER_ENDPOINT } from '../../../constants/endpoint';
import { getEndpointByUserType,getUserType } from '../../../helpers';
import NoResultList from './../NoResultList';
import { generatePath } from 'react-router-dom';
import './adviser.css';
import * as endpoint from '../../../constants/endpoint';

function handleClickDownload(id) {
    window.location = getEndpointByUserType(endpoint.DOWNLOAD_ADVISER_ENDPOINT, {id: id});
}
export default function DetailAdviserItem(props) {
    const adviser = props.adviser;
    useEffect(() => {
        $('.pg-viewer-wrapper').css({'max-height': '600px'});
    });
    return (
        <div className="card detail_adviser">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12">
                    {adviser &&
                        <AdviserRelatedItem
                            key={'aviser-' + adviser.id}
                            adviser={adviser}
                            is_favorite={adviser.is_favorite}
                            baseUrl={getEndpointByUserType(SEARCH_RELATED_ADVISER_ENDPOINT)}
                            params={{adviser_id: adviser.id}}
                            hideDetailButton={true}
                            hideInquireModal={true}
                            // relatedData={props.relatedDatas[adviser.id] || []}
                            // firstLoadByDefault={true}
                            // timeLoad={props.timeLoad}
                        />
                    }
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 pt-3">
                        <div className="float-right">
                            {adviser &&
                            <button className="btn btn-success btn-lg btn-request-interview" onClick={() => handleClickDownload(adviser.id)}>
                                <i className="fas fa-download" /> { trans('main.INFO_LBL_DOWNLOAD_DOCUMENT') }
                            </button>
                            }
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 pt-3">
                        <div className="card">
                            <div className="card-body box-detail">
                            { adviser?
                               <div className="page">
                                    <div className="page-header">
                                        <div className="page-header-1">
                                            {!_.isEmpty(adviser.rank) && (
                                                <div className="rank">
                                                    {adviser.rank }
                                                </div>
                                            )}
                                            <div className="code">
                                            </div>
                                        </div>
                                        <div className="page-header-2">
                                            顧問候補者情報 <span className="birth_age">( {adviser.birth_age} )</span>
                                        </div>
                                    </div>
                                    <div className="page-body">
                                        <div className="block">
                                            <div className="block-header">
                                                代表的なご経歴
                                            </div>
                                            <div className="block-content">
                                                <div className="catch_copy">
                                                    {adviser.catch_copy }
                                                </div>
                                                { !_.isEmpty(adviser.wellKnownCareersPrimary) && (
                                                <div className="info">
                                                        <div className="info-r1">
                                                            <span>■</span>
                                                            <span className="company_name"> { adviser.wellKnownCareersPrimary.name } </span>
                                                            <span>　</span>
                                                            <span className="position_name"> { adviser.position } </span>
                                                        </div>

                                                        <div className="info-r2">
                                                            (設{ adviser.wellKnownCareersPrimary.establishment.substr(0, 4) }年・売{ adviser.wellKnownCareersPrimary.current_term_sales.toLocaleString() }億円・経常{ adviser.wellKnownCareersPrimary.current_term_net_income.toLocaleString() }億円・従{ adviser.wellKnownCareersPrimary.employee_num.toLocaleString() }名・{ adviser.wellKnownCareersPrimary.industry_small_item }・東{ adviser.listed}) ※連結
                                                        </div>

                                                    <div className="info-r3">
                                                        {!_.isEmpty(adviser.careers) && (
                                                            <div className="table-responsive">
                                                                <table className='text-left table table-bordered table-striped datatable'>
                                                                    <thead>
                                                                        <tr>
                                                                            <th className="text-center">昇進スピード</th>
                                                                            <th>経験部署・役職</th>
                                                                            <th name="performance">主な実績</th>
                                                                            <th name="num_subordinate" className="text-center">部下人数</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {adviser.careers.map((p,index) => (
                                                                            <tr key ={'careers-' + index}>
                                                                                <td width="20%" className="text-center">{p.age || ''} 歳</td>
                                                                                <td width="20%">{p.department || ''} {p.position || ''}</td>
                                                                                <td width="20%">{p.performance  || ''}</td>
                                                                                <td width="20%" className="text-center">{p.num_subordinate || ''}名 </td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="block">
                                            <div className="block-header">
                                            その他のご経歴 :
                                            </div>
                                            <div className="block-content">
                                                <div id="wrapper">
                                                    <div id="leftdiv" className="divs font-lable">
                                                        赴任経験
                                                    </div>
                                                    <div id="rightdiv" className="divs">
                                                        {adviser.relocation.map((re,index) => (
                                                            <label key ={'relocation-' + index}>《{re.region}》 {re.area}  {re.period} </label>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div id="wrapper">
                                                    <div id="leftdiv" className="divs font-lable">
                                                    その他所属等
                                                    </div>
                                                    <div id="rightdiv" className="divs">
                                                        {adviser.group.map((gr,index) => (
                                                            <label key ={'group-' + index}>{ gr.name }  { gr.position } </label>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div id="wrapper">
                                                    <div id="leftdiv" className="divs font-lable">
                                                    出身校
                                                    </div>
                                                    <div id="rightdiv" className="divs">
                                                        {adviser.education.map((edu,index) => (
                                                            <label key ={'education-' + index}>{edu.education}</label>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div id="wrapper">
                                                    <div id="leftdiv" className="divs font-lable">
                                                    受賞経験
                                                    </div>
                                                    <div id="rightdiv" className="divs">
                                                        {adviser.award.length > 0 && (
                                                                <div className="table-responsive">
                                                                    <table className='award_table text-left table table-bordered table-striped datatable'>
                                                                        <thead>
                                                                            <tr>
                                                                                <th className="text-center">受賞年齢</th>
                                                                                <th>賞の概要</th>
                                                                                <th>受賞理由</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {adviser.award.map((p,index) => (
                                                                                <tr key ={'award-' + index}>
                                                                                    <td width="33.3%" className="text-center">{p.age || ''} 歳</td>
                                                                                    <td width="33.3%">{p.overview || ''}</td>
                                                                                    <td width="33.3%">{p.reason  || ''}</td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="block">
                                            <div className="block-header">支援可能なポイント</div>
                                            <div className="block-content">
                                                <div className="promotions">
                                                    {adviser.promotions.map((p,index) => (
                                                        <label  key ={'promotions-' + index}>【{p.order}】{p.promotion}</label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="block">
                                            <div className="block-header">人脈一覧</div>
                                            <div className="block-content">
                                                <div className="description">{adviser.relation_detail}</div>
                                                <div className="personal_connections info">
                                                    {adviser.award.length > 0 && (
                                                        <div className="table-responsive">
                                                            <table className='text-left table table-bordered table-striped datatable'>
                                                                <thead>
                                                                    <tr>
                                                                        <th>業界</th>
                                                                        <th>企業名</th>
                                                                        <th>所属部門</th>
                                                                        <th>関係</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {adviser.adviserNetworks.map((p,index) => (
                                                                        <tr key ={'adviserNetworks-' + index}>
                                                                            <td width="25%">{p.industry.industry || ''} 歳</td>
                                                                            <td width="25%">{p.company_name || ''}</td>
                                                                            <td width="25%">{p.department  || ''} {p.position}</td>
                                                                            <td width="25%">{p.relation.relation  || ''}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <NoResultList message="No such file" />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
