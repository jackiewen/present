import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import BottomTable from './../../../components/partials/tables/partials/BottomTable';
import * as helpers from "../../../helpers";


const queryString = require('query-string');

class TableContainer extends Component {

    state = {
        isReloadDataTable: true,
        shouldReloadDataTable: true,
        params: {
            forceReload: false
        },
        propPrams: {},
        dataSource: [],
        pagination: {},
        timeLoad: 0,
    };

    static getDerivedStateFromProps(nextProps, prevState) { 
        if (!_.isEqual(nextProps.params, prevState.propPrams)) {
            let nextPropsParams = {...nextProps.params};
            if (!nextPropsParams.per_page && prevState.params.per_page) {
                nextPropsParams['per_page'] = prevState.params.per_page;
            }
            if (nextProps.firstLoadByDefault && prevState.timeLoad != nextProps.timeLoad && nextProps.defaultDataSource) {
                nextPropsParams['per_page'] = null;
                return {
                    timeLoad: nextProps.timeLoad,
                    shouldReloadDataTable: false,
                    isReloadDataTable: true,
                    params:  Object.assign(nextPropsParams, {forceReload: false}),
                    propPrams: Object.assign(nextProps.params, {forceReload: false}),
                    dataSource: nextProps.defaultDataSource?.data,
                    pagination: nextProps.defaultDataSource?.meta?.pagination
                }
            }
            return {
                shouldReloadDataTable: true,
                isReloadDataTable: true,
                params:  Object.assign(nextPropsParams, {forceReload: false}),
                propPrams: Object.assign(nextProps.params, {forceReload: false}),
            }
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.shouldReloadDataTable) {
            this.reloadDataTable(this.state.params);
        }
    }

    componentDidMount() {
        helpers.InterceptorsResponse(this.props.history);
        if (this.state.shouldReloadDataTable && !this.props.loadDefaultFirstTime) {
            this.reloadDataTable(this.state.params);
        }
    }

    reloadDataTable = (params) => {
        if (this.props.showSpinner) {
            $('#loading').show();
        }
        this.state.isReloadDataTable = false;
        this.state.shouldReloadDataTable = false;
        window.axios.get(this.props.baseUrl, { params: params }).then((res) => {
            if (this.props.showSpinner) {
                $('#loading').hide();
            }
            this.setState({
                params: params,
                dataSource: res.data.data,
                pagination: res.data.meta.pagination,
                isReloadDataTable: true
            }, () => {
                if (this.props.pushParamsToLink) {
                    let tmpParams = {};
                    Object.keys(params).map((item) => {
                        if ((item !== 'page' || params['page'] !== 1)  && item !== 'forceReload') {
                            tmpParams[item] = params[item];
                        }
                    });
                    this.props.history.push({
                        pathname: this.props.basePath,
                        search: !_.isEmpty(tmpParams) ? ('?' + queryString.stringify(tmpParams)) : ''
                    });
                }
            })
        })
    };

    handleSortClick = (column_sort, type_sort) => {
        let next_sort = '';
        if (column_sort == this.state.params.column_sort) {
            if (type_sort == '' || type_sort == 'desc') {
                next_sort = 'asc';
            } else {
                next_sort = 'desc';
            }
        } else {
            next_sort = 'asc';
        }

        this.setState({
            shouldReloadDataTable: true,
            isReloadDataTable: true,
            params: {
                ...this.state.params,
                page: 1,
                column_sort: column_sort,
                type_sort: next_sort
            }

        });
    }

    handlePageClick = (data) => {
        this.setState({
            shouldReloadDataTable: true,
            isReloadDataTable: true,
            params: {
                ...this.state.params,
                page: data.selected + 1
            }

        });
    }

    handlePaginationLength = (e) => {
        this.setState({
            shouldReloadDataTable: true,
            isReloadDataTable: true,
            params: {
                ...this.state.params,
                page: 1,
                per_page: e.target.value
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                {this.props.showHeader?.total_message && 
                    <p><b>{ trans((this.props.showHeader?.total_message || ""), {total: (this.state.pagination?.total || 0)}) }</b></p>
                }
                {React.cloneElement(this.props.children, {
                    dataSource: this.state.dataSource,
                    sort: {
                        handleSortClick: this.props.handleSortClick || this.handleSortClick,
                        column_sort: this.props.column_sort || this.state.params.column_sort,
                        type_sort: this.props.type_sort || this.state.params.type_sort,
                    }
                })}
                {!_.isEmpty(this.state.dataSource) &&
                    <BottomTable
                        perPage={this.state.params?.per_page}
                        handlePaginationLength={this.handlePaginationLength}
                        lengthOptions={this.props.lengthOptions}
                        pageCount={this.state.pagination.total_pages}
                        handlePageClick={this.handlePageClick}
                        forcePage={this.state.pagination.current_page - 1}
                    />
                }

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TableContainer));
