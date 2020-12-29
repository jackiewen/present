import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../../actions/modal';
import { generatePath } from 'react-router-dom';

import { ADMIN_CHOOSE_ADVISER_SELECTION_PATH } from '../../../constants/path';
import * as endpointConstants from '../../../constants/endpoint';
import * as Admin from '../../../components/admin';

import * as helpers from '../../../helpers';
import { withRouter } from "react-router";
import { createBrowserHistory } from 'history';
import * as SSA from '../../../actions/selected_selection_adviser';

const browserHistory = createBrowserHistory();

const queryString = require('query-string');

class ChooseAdviserContainer extends Component {

    state = {
        timeLoad: 0,
        receive_data: {},
        related_datas: {},
        options_adviser_search: {}
    }

    base_path = generatePath(helpers.getPath(ADMIN_CHOOSE_ADVISER_SELECTION_PATH), {id: this.props.match.params.id});
    detail_url = generatePath(endpointConstants.ADMIN_DETAIL_ADVISER_SELECTION_ENDPOINT, {id: this.props.match.params.id});
    selected_url = generatePath(endpointConstants.ADMIN_SELECTED_ADVISER_SELECTION_ENDPOINT, {id: this.props.match.params.id});

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

        if (this.props.selectedSelectionAdivser.first_load) {
            const requestDetail = axios.get(this.detail_url);
            const requestSelected = axios.get(this.selected_url, {params: this.params});
            axios.all([requestDetail, requestSelected]).then(axios.spread((...responses) => {
                const responseDetail = responses[0];
                const responseSelected = responses[1];
                this.props.initSSA(responseDetail.data.data, responseSelected.data.data);
            })).catch(errors => {
            });
        }

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
        if (params.company_related || params.title_related) {
            this.is_related = true;
        }
        this.related_params = {
            company_related: params.company_related,
            title_related: params.title_related
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

    handleAddSelection = (adviserId) => {
        const adviser = this.state.receive_data?.data.find(item => item.id === adviserId);
        this.props.openModal({ name: 'EditReasonMemoAdviserModal', data: {
            adviser: {data: adviser},
            request_adviser_id: this.props.match.params.id,
            choose_reason: '',
            memo: ''
        }});
    }

    handleDeleteSelected = (adviserId) => {
        this.props.removeSSA(adviserId);
    }

    handleEditSelected = (adviserId) => {
        const adviserSelected = this.props.selectedSelectionAdivser.data.find(item => item.adviser_id === adviserId);
        this.props.openModal({ name: 'EditReasonMemoAdviserModal', data: adviserSelected});
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
                    pathname: this.base_path,
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
            <Admin.ChooseAdviser
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
                infoSelection={this.props.selectedSelectionAdivser.info || {}}
                listSelected={this.props.selectedSelectionAdivser.data || []}
                handleAddSelection={this.handleAddSelection}
                handleDeleteSelected={this.handleDeleteSelected}
                handleEditSelected={this.handleEditSelected}
            />
        );
    }
}

const mapStateToProps = state => {
    const { selectedSelectionAdivser } = state;
    return {
        selectedSelectionAdivser
    };
}

const mapDispatchToProps = dispatch => ({
    openModal: (data) => dispatch(openModal(data)),
    initSSA: (info, data) => dispatch(SSA.init(info, data)),
    setSSA: (data) => dispatch(SSA.set(data)),
    addSSA: (item) => dispatch(SSA.add(item)),
    removeSSA: (adviserId) => dispatch(SSA.remove(adviserId)),
    clearSSA: () => dispatch(SSA.clear()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChooseAdviserContainer));
