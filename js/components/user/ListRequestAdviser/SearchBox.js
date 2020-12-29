import React from 'react';
import { selectStatusCode } from './../../../config/status';

export default function SearchBox(props) {
    return (
        <div className="filter">
            <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                        <label className="form-group">{ trans('main.INFO_LBL_SUBJECT') }</label>
                        <input type="text" className="form-control form-control-lg" name="topic_name" 
                        defaultValue={props.params?.topic_name || ''} />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label className="form-group">ステータス</label>
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
        </div>
    );

}