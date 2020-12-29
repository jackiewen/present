import React from 'react';
import { ROOT_URL, SEARCH_RELATED_ADVISER_ENDPOINT } from './../../../constants/endpoint';
import { getEndpointByUserType } from './../../../helpers';
import {
    Contact, Introduce
} from '../../partials';

import ModelContainer from '../../../containers/partials/ModelContainer';
// import AdviserSearchContainer from './../../../containers/partials/AdviserSearchContainer';
import AdviserRelatedItem from '../../partials/AdviserRelatedItem';
import AdviserSearch from '../../partials/AdviserSearch';
import AdviserItem from '../../partials/AdviserItem';
import BottomTable from './../../../components/partials/tables/partials/BottomTable';
// import PopularKeywordBox from './../../partials/PopularKeywordBox';


function Top(props) {
    return (
        <React.Fragment>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row mb-5">
                                        <div className="col-md-7">
                                            <Introduce />
                                        </div>
                                        <div className="col-md-5">
                                            <button type="button" className="btn btn-success btn-lg rounded-pill float-right btn-find-adviser" onClick={props.showRequestAdviserModal}>
                                                <i className="fa fa-plus" /><span> {trans('main.INFO_REQUEST_SELECTION_ADVISOR')}</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xl-12">
                                            <AdviserSearch 
                                                handleSearch={props.handleSearch}
                                                params={props.params}
                                                optionsAdviserSearch={props.optionsAdviserSearch}
                                            />
                                        </div>
                                        {/* <div className="col-xl-3">
                                            <PopularKeywordBox />
                                        </div> */}
                                    </div>

                                    {props.adviserDataSource?.meta?.pagination?.total > 0 &&
                                        <div className="row mt-3">
                                            <div className="col-md-12">
                                                <b>検索結果：{props.adviserDataSource.meta.pagination.total}名</b>
                                            </div>
                                        </div>
                                    }
                                    <div className="row mt-2">
                                        <div className="col-md-12">
                                            {props.adviserDataSource?.data && props.adviserDataSource.data.map((adviser) => (
                                                props.isRelated?
                                                <AdviserRelatedItem
                                                    key={'aviser-' + adviser.id}
                                                    adviser={adviser}
                                                    is_favorite={adviser.is_favorite}
                                                    baseUrl={getEndpointByUserType(SEARCH_RELATED_ADVISER_ENDPOINT)}
                                                    showAskAdviserModal={() => props.showAskAdviserModal({adviser: adviser})}
                                                    params={{...props.relatedParams, ...{adviser_id: adviser.id}}}
                                                    relatedData={props.relatedDatas[adviser.id] || []}
                                                    firstLoadByDefault={true}
                                                    timeLoad={props.timeLoad}
                                                />:
                                                <AdviserItem
                                                    key={'aviser-' + adviser.id}
                                                    adviser={adviser}
                                                    is_favorite={adviser.is_favorite}
                                                    showAskAdviserModal={() => props.showAskAdviserModal({adviser: adviser})}
                                                />
                                            ))}

                                            {(props.adviserDataSource?.meta?.pagination?.total == 0) &&
                                                <div className="card card-outline card-info card-data">
                                                    <div className="card-body text-center">
                                                    {trans('main.INFO_NO_RESULT')}
                                                    </div>
                                                </div>
                                                
                                            }

                                            {props.adviserDataSource?.meta?.pagination?.total > 0
                                                && props.adviserDataSource?.meta?.pagination &&
                                                <div className="pt-1">
                                                    <BottomTable
                                                        handlePaginationLength={props.handlePaginationLength}
                                                        handlePageClick={props.handlePageClick}
                                                        perPage={props.perPage}
                                                        pageCount={props.adviserDataSource.meta.pagination.total_pages}
                                                        forcePage={props.adviserDataSource.meta.pagination.current_page - 1}
                                                    />
                                                </div>
                                            }
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <Contact />
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );

}

const propTypes = {
}

Top.propTypes = propTypes;

export default Top;
