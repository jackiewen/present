import React from 'react';
import {
    Contact,
    AdviserItem,
    NoResultList,
    BottomTable
} from './../../partials';

export default function ListFavorite(props) {
    let  countAdviser = 0 ;
    props.dataSource?.data && props.dataSource.data.map((adviser) => {
        if(  !_.isEmpty(adviser) ){
            countAdviser ++;
        };
    });
    return (
        <React.Fragment>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-3">
                            <div className="card">
                                <div className="card-body">
                                    {(countAdviser > 0 ) && props.dataSource?.meta?.pagination?.total > 0 &&
                                        <div className="row mt-3">
                                            <div className="col-md-12">
                                                <b>お気に入り：{countAdviser??props.dataSource.meta.pagination.total}名</b>
                                            </div>
                                        </div>
                                    }

                                    <div className="row mt-2">
                                        <div className="col-md-12">
                                            {props.dataSource?.data && props.dataSource.data.map((adviser) => {
                                                if (adviser.is_favorite == 1) {
                                                    return (
                                                        <AdviserItem
                                                            key={'aviser-' + adviser.id}
                                                            adviser={adviser}
                                                            is_favorite={adviser.is_favorite}
                                                            showAskAdviserModal={() => props.showAskAdviserModal({adviser: adviser})}
                                                            refrestAfterChange={props.refrestAfterChange}
                                                        />
                                                    )
                                                }
                                                
                                            })}
                                            { ( countAdviser == 0 ) &&
                                                <NoResultList/>
                                            }
                                            { ( countAdviser > 0 ) && props.dataSource?.meta?.pagination?.total > 0 &&
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
