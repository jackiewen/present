import React from 'react';
import {
    Contact
} from '../../partials';

import BottomTable from './../../../components/partials/tables/partials/BottomTable';
import SearchBox from './SearchBox';
import InquireAdviserItem from './InquireAdviserItem';

function ListInquireAdviser(props) {
    return (
        <React.Fragment>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-3">
                            <div className="card">
                                <div className="card-header">
                                    <SearchBox 
                                        params={props.params}
                                        inquireStatus={props.inquireStatus}
                                        handleSearch={props.handleSearch}
                                        handleClear={props.handleClear}
                                    />
                                </div>
                                <div className="card-body">
                                    {props.dataSource?.meta?.pagination?.total > 0 &&
                                        <div className="row mt-3">
                                            <div className="col-md-12">
                                                <b>{trans ('main.INFO_LBL_INQUIRE_TOTAL', {total: props.dataSource.meta.pagination.total})}</b>
                                            </div>
                                        </div>
                                    }

                                    <div className="row mt-2">
                                        <div className="col-md-12">
                                            {props.dataSource?.data && props.dataSource.data.map((item) => (
                                                <InquireAdviserItem
                                                    key={"inquire-adviser-item" + item.id}
                                                    item={item}
                                                />
                                            ))}
                                            {(props.dataSource?.meta?.pagination?.total == 0) &&
                                                <div className="card card-outline card-info card-data">
                                                    <div className="card-body text-center">
                                                    {trans('main.INFO_NO_RESULT')}
                                                    </div>
                                                </div>
                                                
                                            }
                                            {props.dataSource?.meta?.pagination && props.dataSource?.meta?.pagination?.total > 0 &&
                                                <BottomTable
                                                    handlePaginationLength={props.handlePaginationLength}
                                                    handlePageClick={props.handlePageClick}
                                                    perPage={props.perPage}
                                                    pageCount={props.dataSource.meta.pagination.total_pages}
                                                    forcePage={props.dataSource.meta.pagination.current_page - 1}
                                                />
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

ListInquireAdviser.propTypes = propTypes;

export default ListInquireAdviser;
