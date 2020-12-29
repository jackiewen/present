import React, { Component } from 'react';
import * as Admin from './../../../components/admin';
import { getTitlePage, getPath } from './../../../helpers';
import { ADMIN_FAVORITES_PATH } from './../../../constants/path';
import { ROOT_URL, ADMIN_FAVORITES_ENDPOINT } from './../../../constants/endpoint';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import { openModal } from '../../../actions/modal';
import { withRouter } from 'react-router-dom';

const browserHistory = createBrowserHistory();
const queryString = require('query-string');

const URL_SEARCH = ROOT_URL + ADMIN_FAVORITES_ENDPOINT;

class ListFavoriteContainer extends Component {

    state = {
        data_source: {}
    }
    params = queryString.parse(this.props.location.search);
    isFetching = false;

    componentDidMount() {
        document.title = getTitlePage(trans('main.SCN_FAVORITE'));
        this.reloadData(URL_SEARCH, this.params);
    }

    showAskAdviserModal = (data) => {
        this.props.openModal({ name: 'AskAdviserModal', data: data});
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

    refrestAfterChange = () => {
        this.reloadData(URL_SEARCH, {
            ...this.params,
            page: 1
        });
    }

    reloadData = (url, params = {}) => {
        if (!this.isFetching) {
            $('#loading').show();
            this.isFetching = true;
            axios.get(url, {params: params})
            .then(json => {
                $('#loading').hide();
                browserHistory.push({
                    pathname: getPath(ADMIN_FAVORITES_PATH),
                    search: !_.isEmpty(params) ? ('?' + queryString.stringify(params)) : ''
                });
                this.params = params;
                this.setState({data_source: json.data});
                this.isFetching = false;
            })
            .catch(err => {
                $('#loading').hide();
                this.isFetching = false;
            });
        }

    }

    render() {
        // console.log(this.props);
        return (
            <Admin.ListFavorite
                dataSource={this.state.data_source}
                showAskAdviserModal={this.showAskAdviserModal}
                handlePaginationLength={this.handlePaginationLength}
                handlePageClick={this.handlePageClick}
                perPage={this.params.per_page}
                refrestAfterChange={this.refrestAfterChange}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListFavoriteContainer));
