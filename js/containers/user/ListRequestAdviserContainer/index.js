import React, { Component } from 'react';
import * as User from '../../../components/user';
import { getTitlePage, getPath, getParamsWithSortDefault } from '../../../helpers';
import { USER_LIST_REQUEST_ADVISER_PATH } from '../../../constants/path';
import { ROOT_URL, USER_REQUEST_ADVISER_ENDPOINT } from '../../../constants/endpoint';
import { connect } from 'react-redux';
import { openModal } from '../../../actions/modal';

const queryString = require('query-string');

const URL_SEARCH = ROOT_URL + USER_REQUEST_ADVISER_ENDPOINT;

class ListRequestAdviserContainer extends Component {

    state = {
        params: getParamsWithSortDefault(this.props.location.search, 'id', 'desc')
    }

    componentDidMount() {
        document.title = getTitlePage(trans('main.SCN_REQUEST_ADVISER_LIST'));
    }

    handleSearch = () => {
        this.setState({params: {
            topic_name: $('input[name="topic_name"]').val(),
            select_status_code: $('select[name="select_status_code"]').val()
        }});
    }

    handleClear = () => {
        $(".filter").find('input, select').val("");
    }

    render() {
        return (
            <React.Fragment>
                <User.ListRequestAdviser
                    basePath={getPath(USER_LIST_REQUEST_ADVISER_PATH)}
                    baseUrl={URL_SEARCH}
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear}
                    params={this.state.params || {}}
                />
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListRequestAdviserContainer);