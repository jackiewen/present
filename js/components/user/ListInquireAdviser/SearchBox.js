import React from 'react';

export default function SearchBox(props) {
    return (
        <div className="filter">
            <div className="row">
                <div className="col-xl-4 col-md-5">
                    <div className="form-group">
                        <label className="form-group">{trans('main.INFO_LBL_INQUIRE_KEYWORD')}</label>
                        <input type="text" className="form-control form-control-lg" name="keyword" defaultValue={props.params?.keyword || ''} />
                    </div>
                </div>
                <div className="col-xl-4 col-md-5">
                    <div className="form-group">
                        <label className="form-group">{trans('main.INFO_LBL_STATUS')}</label>
                        <select className="form-control form-control-lg" name="status" defaultValue={props.params?.status || ''}>
                            <option value="">全て</option>
                            {props.inquireStatus && Object.keys(props.inquireStatus).map((key) => (
                                <option key={"inquire-status-" + key} value={key}>{props.inquireStatus[key]}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-12">
                    <div className="row justify-content-end">
                        <div className="col-xl-6 col-md-2">
                            <div className="form-group">
                                <label className="form-group d-none d-xl-block">&nbsp;</label>
                                <button className="btn btn-primary btn-lg btn-block mb-3" onClick={props.handleSearch}>
                                    <i className="fa fa-search"></i>
                                </button>
                            </div>
                        </div>
                        <div className="col-xl-6 col-md-2">
                            <div className="form-group">
                                <label className="form-group d-none d-xl-block">&nbsp;</label>
                                <button className="btn btn-secondary btn-block btn-lg mb-3" onClick={props.handleClear}>
                                    <i className="fas fa-eraser"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );

}