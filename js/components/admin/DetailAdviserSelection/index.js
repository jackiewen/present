import React from 'react';
import {
    Alert,
    Contact,
    AdviserSelectionItem,
    NoResultList,
    BottomTable
} from '../../partials';
import AdviserSelectionBox from './AdviserSelectionBox';
import {ADMIN_FOR_SELECT} from "../../../constants/endpoint";
import AsyncSelectComponent from "../../partials/AsyncSelect";

export default function DetailAdviserSelection(props) {
    const race_user_name = props.getNameRaceUserById(props.adviserSelection.admin_id);
    return (
        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 pt-3">
                        <div className="card">
                            <div className="card-body">
                                {/* {props.alert.type &&
                                    <Alert type={props.alert.type || ''} message={props.alert.message || ''} id={(new Date().getTime())} />
                                } */}
                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <AdviserSelectionBox {...props.adviserSelection} race_user_name={race_user_name} />
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label>{trans('main.INFO_LBL_SELECTED_PIC')}</label>
                                            <AsyncSelectComponent
                                                url={ADMIN_FOR_SELECT}
                                                handleChangeSelect={props.handleChangeRaceUser}
                                                value={{label: race_user_name , value: props.adviserSelection.admin_id}}
                                                isClearable={false}
                                            />
                                            {/*<select className={"form-control" + (props.errors?.pic?" is-invalid":"")} value={props.adviserSelection.admin_id} onChange={props.handleChangeRaceUser}>*/}
                                            {/*    <option value="0"></option>*/}
                                            {/*    {!_.isEmpty(props.listRaceUsers) && props.listRaceUsers.map(item => (*/}
                                            {/*        <option key={"opt-ru-" + item.value} value={item.value}>{item.label}</option>*/}
                                            {/*    ))}*/}
                                            {/*</select>*/}
                                            {/*{props.errors?.pic &&*/}
                                            {/*    <span id="pic-error" className="error invalid-feedback">{props.errors?.pic}</span>*/}
                                            {/*}*/}
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-2">
                                    <div className="col-md-12">
                                        <div className="float-left">
                                            <button className="btn btn-primary btn-choose-adviser-selection" 
                                                onClick={props.handleClickSearch}
                                                disabled={props.adviserSelection?.publish_status_code == 1}>
                                                {trans('main.INFO_LBL_START_SEARCH_ADVISER')}
                                            </button>
                                        </div>
                                        <div className="float-right">
                                            <button className="btn btn-info" 
                                                onClick={props.handleClickTemporarySave}
                                                disabled={props.adviserSelection?.publish_status_code == 1}>
                                                {trans('main.INFO_LBL_TEMPORARY_SAVE')}
                                            </button>
                                            <button className="btn btn-success ml-1" 
                                                onClick={props.handleClickConfirmSend} 
                                                disabled={props.listSelected?.length == 0 || props.adviserSelection?.publish_status_code == 1}>
                                                    {trans('main.INFO_LBL_CONFIRM_SEND')}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* {props.listSelected?.meta?.pagination?.total > 0 &&
                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            <b>{trans('main.INFO_LBL_SELECT_REQUEST_TOTAL', {total: props.listSelected.meta.pagination.total})}</b>
                                        </div>
                                    </div>
                                } */}
                                <form className="selected-form">
                                {props.listSelected &&
                                <div className="row mt-3">
                                        <div className="col-md-12">
                                            <b>{trans('main.INFO_LBL_SELECT_REQUEST_TOTAL', {total: props.listSelected?.length})}</b>
                                        </div>
                                    </div>
                                }
                                <div className="row mt-2">
                                    <div className="col-md-12">
                                        {props.listSelected && props.listSelected.map((selected) => {
                                            const adviser = selected.adviser.data;
                                            return (
                                                <AdviserSelectionItem
                                                    id={selected.id}
                                                    memo={selected.memo}
                                                    choose_reason={selected.choose_reason}
                                                    key={'aviser-' + adviser.id}
                                                    adviser={adviser}
                                                    is_favorite={adviser.is_favorite}
                                                    hideInquireModal={true}
                                                    showDeleteButton={props.adviserSelection?.publish_status_code != 1}
                                                    handleDeleteSelection={props.handleDeleteSelection}
                                                    adviserSelectedErrors={props.adviserSelectedErrors}
                                                />
                                            )
                                        })}
                                        {(props.listSelected && props.listSelected.length == 0) &&
                                            <NoResultList/>
                                        }
                                        {/* {props.listSelected?.meta?.pagination?.total > 0 &&
                                            <BottomTable
                                                handlePaginationLength={props.handlePaginationLength}
                                                handlePageClick={props.handlePageClick}
                                                perPage={props.perPage}
                                                pageCount={props.listSelected.meta.pagination.total_pages}
                                                forcePage={props.listSelected.meta.pagination.current_page - 1}
                                            />
                                        } */}
                                    </div>
                                </div>
                                </form>
                            </div>
                        </div>

                        <Contact />
                    </div>
                </div>
            </div>
        </section>
    );

}
