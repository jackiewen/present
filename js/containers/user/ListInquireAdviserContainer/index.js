import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

import * as User from '../../../components/user';

import { USER_LIST_INQUIRE_ADVISER_PATH } from './../../../constants/path';
import * as endpointConstants from './../../../constants/endpoint';
import * as helpers from './../../../helpers';
import { createBrowserHistory } from 'history';

const browserHistory = createBrowserHistory();

const queryString = require('query-string');

const URL_SEARCH = endpointConstants.ROOT_URL + endpointConstants.SEARCH_INQUIRE_ENDPOINT;

const inquireStatus = helpers.getCommonsConfig()?.inquireStatus || [];

class ListInquireAdviserContainer extends Component {

    state = {
        data_source: {}
    }
    params = queryString.parse(this.props.location.search);
    isFetching = false;

    componentDidMount() {
        document.title = helpers.getTitlePage(trans('main.SCN_INQUIRE_LIST'));
        this.reloadData(URL_SEARCH, this.params);
    }

    handlePageClick = (data) => {
        this.reloadData(URL_SEARCH, {
            ...this.params,
            page: data.selected + 1
        });
    }

    handlePaginationLength = (e) => {
        this.reloadData(URL_SEARCH, {
            ...this.params,
            page: 1,
            per_page: e.target.value
        });
    }

    handleClear = () => {
        $(".filter").find('input, select').val("");
    }

    handleSearch = () => {
        let params = {
            keyword: $('input[name="keyword"]').val(),
            status: $('select[name="status"]').val(),
        }
        this.reloadData(URL_SEARCH, params);
    }

    reloadData = (url, params = {}) => {
        if (!this.isFetching) {
            $('#loading').show();
            this.isFetching = true;
            axios.get(url, {params: params})
            .then(json => {
                $('#loading').hide();
                browserHistory.push({
                    pathname: helpers.getPath(USER_LIST_INQUIRE_ADVISER_PATH),
                    search: !_.isEmpty(params) ? ('?' + queryString.stringify(params)) : ''
                });
                this.params = params;
                this.isFetching = false;
                this.setState({data_source: json.data});
                
            })
            .catch(err => {
                $('#loading').hide();
                this.isFetching = false;
            });
        }
        
    }

    render() {
        return (
            <User.ListInquireAdviser
                params={this.params}
                dataSource={this.state.data_source || []}
                handlePaginationLength={this.handlePaginationLength}
                handlePageClick={this.handlePageClick}
                perPage={this.params.per_page}
                inquireStatus={inquireStatus}
                handleSearch={this.handleSearch}
                handleClear={this.handleClear}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
    };
}

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListInquireAdviserContainer));
