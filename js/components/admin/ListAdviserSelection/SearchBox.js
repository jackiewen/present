import React from 'react';
import { selectStatusCode } from './../../../config/status';

export default function SearchBox(props) {
    return (
        <div className="filter">
            <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                        <label className="form-group">{ trans('main.INFO_LBL_COMPANY_REQUESTER') }</label>
                        <input type="text" className="form-control form-control-lg" name="company_requester" 
                        defaultValue={props.params?.company_requester || ''} />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label className="form-group">{ trans('main.INFO_LBL_STATUS') }</label>
                        <select 
                            className="form-control form-control-lg" 
                            name="select_status_code"
                            defaultValue={props.params?.select_status_code || ''}
                        >
                            <option value="">全て</option>
                            {selectStatusCode.map(item => (
                                <option key={'selectStatusCode' + item.key} value={item.key}>{item.value}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-md-2 align-self-end">
                    <div className="form-group">
                        <button className="btn btn-primary btn-lg btn-block mb-3" onClick={props.handleSearch}>
                            <i className="fa fa-search"></i>
                        </button>
                    </div>
                </div>
                <div className="col-md-2 align-self-end">
                    <div className="form-group">
                        <button className="btn btn-secondary btn-block btn-lg mb-3" onClick={props.handleClear}>
                            <i className="fas fa-eraser"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="icheck-primary d-inline">
                        <input name="other_pic" type="checkbox" id="chkOtherPIC" defaultChecked={props.params?.other_pic?true:false}/>
                        <label htmlFor="chkOtherPIC">
                            { trans('main.INFO_LBL_DISPLAY_REQUEST_ORDER_PIC') }
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

}