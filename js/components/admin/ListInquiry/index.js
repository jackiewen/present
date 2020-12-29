import React from 'react';
import { ADMINS_INQUIRE, ROOT_URL } from "../../../constants/endpoint";
import TableContainer from '../../../containers/partials/TableContainer';
import ListInquiryTable from "../../partials/tables/ListInquiryTable";

class ListInquiry extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-3">
                            <div className="card">
                                <div className="card-header">
                                    <div className="filter">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label className="form-group">{trans('commons.inquiry.search_1')}</label>
                                                    <input type="text" className="form-control form-control-lg"
                                                           id="company_or_staff"
                                                           value={this.props.search.company_or_staff || ''}
                                                           onChange={this.props.handleSearchChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label htmlFor="status" className="form-group">{trans('commons.inquiry.search_2')}</label>
                                                    <select className="form-control form-control-lg" id='status'
                                                            value={this.props.search.status || 0}
                                                            onChange={this.props.handleSearchChange}
                                                    >
                                                        <option value="0">全て</option>
                                                        {Object.keys(this.props.inquiry_status).map( (element) => (
                                                            <option key={element} value={element}>{this.props.inquiry_status[element]}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="form-group">
                                                    <label className="form-group" style={{height: '17px'}}/>
                                                    <button className="btn btn-primary btn-lg btn-block" onClick={this.props.handleSearch}>
                                                        <i className="fa fa-search" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="form-group">
                                                    <label className="form-group" style={{height: '17px'}} />
                                                    <button className="btn btn-secondary btn-block btn-lg" onClick={this.props.handleClear}>
                                                        <i className="fas fa-eraser" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="icheck-primary d-inline">
                                                    <input type="checkbox" id="not_mine"
                                                           checked={String(this.props.search.not_mine) === 'true'}
                                                           onChange={this.props.handleSearchChange}
                                                    />
                                                    <label htmlFor="not_mine">
                                                        {trans('commons.inquiry.search_3')}
                                                    </label>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <TableContainer pushParamsToLink={true}
                                                    baseUrl={ROOT_URL + ADMINS_INQUIRE}
                                                    params={this.props.params}
                                                    showSpinner>
                                        <ListInquiryTable />
                                    </TableContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default ListInquiry;
