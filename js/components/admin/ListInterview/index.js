import React from 'react';
import TableContainer from '../../../containers/partials/TableContainer';
import {ADMINS_INTERVIEWS, ROOT_URL} from "../../../constants/endpoint";
import ListInterviewTable from "../../partials/tables/ListInterview";
import { withRouter } from 'react-router-dom';
import * as helpers from "../../../helpers";

const queryString = require('query-string');

class ListInterview extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            search: queryString.parse(this.props.location.search) || {},
            params: queryString.parse(this.props.location.search) || {},
        };
    }
    
    componentDidMount() {
        document.title = helpers.getTitlePage(trans('main.SCN_INTERVIEW'));
    }
    handleSearchChange = (e) => {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.id;
        this.setState({params: Object.assign({}, this.state.params, {[name] : value})});
    };

    handleSearch = () => {
        this.setState({search: this.state.params});
    };

    handleClear = () => {
        this.setState({params: {}, search: {}});
    };

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
                                                    <label className="form-group">{trans('commons.interview_admin.search_1')}</label>
                                                    <input type="text" className="form-control form-control-lg"
                                                           id="company_or_id"
                                                           value={this.state.params.company_or_id || ''}
                                                           onChange={this.handleSearchChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label htmlFor="status" className="form-group">{trans('commons.interview.status_search')}</label>
                                                    <select className="form-control form-control-lg" id='status'
                                                            value={this.state.params.status || 0}
                                                            onChange={this.handleSearchChange}>
                                                        <option value="0">全て</option>
                                                        {this.props.interview_status.map( element => (
                                                            <option key={element.id} value={element.id}>{element.status_name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="form-group">
                                                    <label className="form-group" style={{height: '17px'}}/>
                                                    <button className="btn btn-primary btn-lg btn-block" onClick={this.handleSearch}>
                                                        <i className="fa fa-search" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="form-group">
                                                    <label className="form-group" style={{height: '17px'}} />
                                                    <button className="btn btn-secondary btn-block btn-lg" onClick={this.handleClear}>
                                                        <i className="fas fa-eraser" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="icheck-primary d-inline">
                                                    <input type="checkbox" id="not_mine"
                                                           checked={String(this.state.params.not_mine) === 'true'}
                                                           onChange={this.handleSearchChange}
                                                    />
                                                    <label htmlFor="not_mine">
                                                        {trans('commons.interview_admin.search_3')}
                                                    </label>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <TableContainer pushParamsToLink={true}
                                                    baseUrl={ROOT_URL + ADMINS_INTERVIEWS}
                                                    params={this.state.search}
                                                    showSpinner>
                                        <ListInterviewTable />
                                    </TableContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default withRouter(ListInterview);
