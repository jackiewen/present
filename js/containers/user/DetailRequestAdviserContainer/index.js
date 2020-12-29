import React, { Component } from 'react';
import * as User from '../../../components/user';
import { getTitlePage, getPath } from '../../../helpers';
import { generatePath } from 'react-router-dom';
import { USER_LIST_REQUEST_ADVISER_PATH, USER_DETAIL_REQUEST_ADVISER_PATH } from '../../../constants/path';
import { ROOT_URL, USER_DETAIL_REQUEST_ADVISER_ENDPOINT, USER_SELECTED_REQUEST_ADVISER_ENDPOINT } from '../../../constants/endpoint';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import { openModal } from '../../../actions/modal';

const browserHistory = createBrowserHistory();
const queryString = require('query-string');

const URL_SEARCH = ROOT_URL + USER_SELECTED_REQUEST_ADVISER_ENDPOINT;

class DetailRequestAdviserContainer extends Component {

    state = {
        request_adviser: {},
        list_selected: {}
    }

    base_path = generatePath(getPath(USER_DETAIL_REQUEST_ADVISER_PATH), {id: this.props.match.params.id});
    detail_url = generatePath(USER_DETAIL_REQUEST_ADVISER_ENDPOINT, {id: this.props.match.params.id});
    selected_url = generatePath(URL_SEARCH, {id: this.props.match.params.id});

    params = queryString.parse(this.props.location.search);
    isFetching = false;

    componentDidMount() {
        document.title = getTitlePage(trans('main.SCN_REQUEST_ADVISER_DETAIL'));

        const requestDetail = axios.get(this.detail_url);
        const requestSelected = axios.get(this.selected_url, {params: this.params});
        axios.all([requestDetail, requestSelected]).then(axios.spread((...responses) => {
            const responseDetail = responses[0];
            const responseSelected = responses[1];
            if (_.isEmpty(responseDetail.data.data)) {
                this.props.history.push(getPath(USER_LIST_REQUEST_ADVISER_PATH));
            }
            this.setState({
                request_adviser: responseDetail.data.data,
                list_selected: responseSelected.data
            })
        })).catch(errors => {
        });
    }

    showAskAdviserModal = (data) => {
        this.props.openModal({ name: 'AskAdviserModal', data: data});
    }

    handlePageClick = (data) => {
        this.reloadData(this.selected_url, {
            ...this.params,
            page: data.selected + 1
        });
    }

    handlePaginationLength = (e) => {
        this.reloadData(this.selected_url, {
            ...this.params,
            page: 1,
            per_page: e.target.value
        });
    }

    reloadData = (url, params = {}) => {
        if (!this.isFetching) {
            this.isFetching = true;
            axios.get(url, {params: params})
            .then(json => {
                browserHistory.push({
                    pathname: this.base_path,
                    search: !_.isEmpty(params) ? ('?' + queryString.stringify(params)) : ''
                });
                this.params = params;
                this.setState({list_selected: json.data});
                this.isFetching = false;
            })
            .catch(err => {
                this.isFetching = false;
            });
        }

    }

    render() {
        return (
            <User.DetailRequestAdviser
                requestAdviser={this.state.request_adviser || {}}
                listSelected={this.state.list_selected || []}
                showAskAdviserModal={this.showAskAdviserModal}
                handlePaginationLength={this.handlePaginationLength}
                handlePageClick={this.handlePageClick}
                perPage={this.params.per_page}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailRequestAdviserContainer);
