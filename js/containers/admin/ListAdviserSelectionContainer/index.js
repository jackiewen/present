import React, { Component } from 'react';
import * as Admin from '../../../components/admin';
import { getTitlePage, getPath, getParamsWithSortDefault } from '../../../helpers';
import { ADMIN_LIST_ADVISER_SELECTION_PATH } from '../../../constants/path';
import { ROOT_URL, ADMIN_ADVISER_SELECTION_ENDPOINT } from '../../../constants/endpoint';
import { connect } from 'react-redux';
import { openModal } from '../../../actions/modal';

const URL_SEARCH = ROOT_URL + ADMIN_ADVISER_SELECTION_ENDPOINT;

class ListAdviserSelectionContainer extends Component {

    state = {
        params: getParamsWithSortDefault(this.props.location.search, 'id', 'desc')
    }

    componentDidMount() {
        document.title = getTitlePage(trans('main.SCN_ADVISER_SELECTION_LIST'));
    }

    handleSearch = () => {
        this.setState({params: {
            company_requester: $('input[name="company_requester"]').val(),
            select_status_code: $('select[name="select_status_code"]').val(),
            other_pic: $('input[name="other_pic"]').prop('checked') ? 1 : null
        }});
    }

    handleClear = () => {
        $(".filter").find('input[type="text"], select').val("");
        $(".filter").find('input[type="checkbox"]').prop('checked', false);
    }

    render() {
        return (
            <React.Fragment>
                <Admin.ListAdviserSelection
                    basePath={getPath(ADMIN_LIST_ADVISER_SELECTION_PATH)}
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

export default connect(mapStateToProps, mapDispatchToProps)(ListAdviserSelectionContainer);