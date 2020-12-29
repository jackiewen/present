import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../../actions/modal';

import { USER_BASE_PATH } from './../../../constants/path';
import * as endpointConstants from './../../../constants/endpoint';
import * as User from '../../../components/user';

import * as helpers from './../../../helpers';
import { withRouter } from "react-router";
import { createBrowserHistory } from 'history';

const browserHistory = createBrowserHistory();

const queryString = require('query-string');

class TopContainer extends Component {

    state = {
        timeLoad: 0,
        receive_data: {},
        related_datas: {},
        options_adviser_search: {}
    }

    URL_SEARCH = helpers.getEndpointByUserType(endpointConstants.SEARCH_ADVISER_ENDPOINT);
    URL_SEARCH_RELATED = helpers.getEndpointByUserType(endpointConstants.SEARCH_RELATED_ADVISER_ENDPOINT);
    URL_OPTION = helpers.getEndpointByUserType(endpointConstants.OPTION_ADVISER_SEARCH_ENDPOINT);

    params = queryString.parse(this.props.location.search, {arrayFormat: 'index'});
    is_related = false;
    related_params = {};
    isSearching = false;

    setHistorySearch = (item = '') => {
        let dataHistory = JSON.parse(localStorage.getItem('history_search') || "[]");
        if (item && !dataHistory.includes(item)) {
            dataHistory.unshift(item);
            localStorage.setItem('history_search', JSON.stringify(dataHistory));
        }

        $("input[name='keyword']").autocomplete({
            source: dataHistory,
            minLength: 0
        }).focus(function(){
            $(this).data("uiAutocomplete").search($(this).val());
        });
    }

    componentDidMount() {
        document.title = helpers.getTitlePage(trans('main.SCN_FIND_ADVISER'));

        this.setHistorySearch();

        if (this.params.connection_company_name || this.params.connection_position) {
            this.is_related = true;
        }
        this.related_params = {
            connection_company_name: this.params.connection_company_name,
            connection_position: this.params.connection_position
        }
        if (!_.isEmpty(this.params)) {
            this.reloadData(this.URL_SEARCH, this.params, this.is_related, this.related_params);
        }

        this.getOptions(this.URL_OPTION, this.params);
    }

    showRequestAdviserModal = () => {
        this.props.openModal({ name: 'RequestSelectionModal', data: {}});
    }

    showAskAdviserModal = (data) => {
        this.props.openModal({ name: 'AskAdviserModal', data: data});
    }

    handlePageClick = (data) => {
        this.reloadData(this.URL_SEARCH, {
            ...this.params,
            page: data.selected + 1
        }, this.is_related, this.related_params);
    }

    handlePaginationLength = (e) => {
        this.reloadData(this.URL_SEARCH, {
            ...this.params,
            page: 1,
            per_page: e.target.value
        }, this.is_related, this.related_params);
    }

    handleSearch = (params) => {
        Object.keys(params).map(pkey => {
            if (_.isObject(params[pkey]) && params[pkey].value) {
                params[pkey] = params[pkey].value;
            }
        });

        this.setHistorySearch(params.keyword || '');

        this.is_related = false;
        if (params.connection_company_name || params.connection_position) {
            this.is_related = true;
        }
        this.related_params = {
            connection_company_name: params.connection_company_name,
            connection_position: params.connection_position
        }
        this.reloadData(this.URL_SEARCH, params, this.is_related, this.related_params);
    }

    getOptions = (url, params = {}) => {
        axios.get(url, { params: params })
        .then(json => {
            this.setState({
                options_adviser_search: json.data
            });
        });
    }

    reloadData = (url, params, isRelated = false, relatedParams = {}) => {
        if (!this.isSearching) {
            $('#loading').show();
            this.params = params;
            axios.get(url, { params: params })
            .then(json => {
                this.isSearching = false;
                this.is_related = isRelated;
                this.related_params = relatedParams;

                browserHistory.push({
                    pathname: helpers.getPath(USER_BASE_PATH),
                    search: !_.isEmpty(params) ? ('?' + queryString.stringify(params, {arrayFormat: 'index'})) : ''
                });

                if (isRelated) {
                    let adviserId = json.data.data.map(a => a.id);
                    axios.get(this.URL_SEARCH_RELATED, { params: Object.assign({}, {adviser_id: adviserId}, relatedParams)}).then(jsonRelated => {
                        $('#loading').hide();
                        this.setState({
                            timeLoad: this.state.timeLoad + 1,
                            receive_data: json.data,
                            related_datas: jsonRelated.data
                        });
                    });
                } else {
                    $('#loading').hide();
                    this.setState({
                        timeLoad: this.state.timeLoad + 1,
                        receive_data: json.data
                    });
                }
            })
            .catch(err => {
                $('#loading').hide();
                this.isSearching = false;
            });
        }
    }

    render() {
        return (
            <User.Top
                {...this.props}
                showRequestAdviserModal={this.showRequestAdviserModal}
                showAskAdviserModal={this.showAskAdviserModal}
                params={this.params}
                relatedParams={this.related_params}
                adviserDataSource={this.state.receive_data || []}
                isRelated={this.is_related || false}
                relatedDatas={this.state.related_datas || []}
                handlePaginationLength={this.handlePaginationLength}
                handlePageClick={this.handlePageClick}
                handleSearch={this.handleSearch}
                timeLoad={this.state.timeLoad}
                perPage={this.params.per_page}
                optionsAdviserSearch={this.state.options_adviser_search || {}}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
    };
}

const mapDispatchToProps = dispatch => ({
    openModal: (data) => dispatch(openModal(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopContainer));
