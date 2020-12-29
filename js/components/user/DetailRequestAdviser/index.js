import { defaultsDeep } from 'lodash';
import React from 'react';
import {
    Contact,
    AdviserItem,
    NoResultList,
    BottomTable
} from '../../partials';
import RequestAdviserItem from './RequestAdviserItem';

export default function DetailRequestAdviser(props) {
    let  countAdviser = 0 ;
    props.listSelected?.data && props.listSelected.data.map((selected) => {
        if((selected.adviser.data != null)){
            countAdviser ++;
        };
    });
    
    return (
        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 pt-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <RequestAdviserItem {...props.requestAdviser} />
                                    </div>
                                </div>
                                {(countAdviser > 0) && props.listSelected?.meta?.pagination?.total > 0 &&
                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            <b>{trans('main.INFO_LBL_SELECT_REQUEST_TOTAL', {total: countAdviser})}</b>
                                        </div>
                                    </div>
                                }
                                
                                <div className="row mt-2">
                                    <div className="col-md-12">
                                        {props.listSelected?.data && props.listSelected.data.map((selected) => {
                                            const adviser = selected.adviser.data;
                                            if(adviser != null){
                                                return (
                                                    <AdviserItem
                                                        reason={selected.choose_reason}
                                                        key={'aviser-' + adviser.id}
                                                        adviser={adviser}
                                                        is_favorite={adviser.is_favorite}
                                                        showAskAdviserModal={() => props.showAskAdviserModal({adviser: adviser})}
                                                    />
                                                )
                                            }
                                        })}
                                        {(_.isEmpty(props.listSelected) || props.listSelected?.meta?.pagination?.total == 0 || (countAdviser === 0) ) &&
                                            
                                             <NoResultList/>
                                        }
                                        {(countAdviser > 0) && props.listSelected?.meta?.pagination?.total > 0 &&
                                            <BottomTable
                                                handlePaginationLength={props.handlePaginationLength}
                                                handlePageClick={props.handlePageClick}
                                                perPage={props.perPage}
                                                pageCount={props.listSelected.meta.pagination.total_pages}
                                                forcePage={props.listSelected.meta.pagination.current_page - 1}
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
    );

}
