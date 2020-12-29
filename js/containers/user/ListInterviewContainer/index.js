import React from 'react';
import { ListInterview } from '../../../components/user/';
import { getCommonsConfig } from "../../../helpers";
import { USER_INTERVIEWS, USER_INTERVIEWS_CANCEL } from "../../../constants/endpoint";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { showToast } from "../../../actions/toast";

const queryString = require('query-string');

class ListInterviewContainer extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            search: queryString.parse(this.props.location.search) || {},
            data: []
        };
        this.config = getCommonsConfig();
        this.isFetching = false;
        this.isFetchingCancel = false;
        this.totalPage = 0;
        this.search = {content: '', status: "0"};
    }

    componentDidMount() {
        this.fetchingData();
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (!_.isEqual(prevState.search, this.state.search) || !_.isEqual(prevState.search.page, this.state.search.page)) {
            this.fetchingData();
        }
    };

    handleSearchChange = (e) => {
        let target = e.target;
        let value = target.value;
        let name = target.id;
        this.search[name] = value;
    };

    handleSearch = () => {
        this.fetchingData();
    };

    handleClear = () => {
        this.search = {
            content: '',
            status: "0",
        };
        this.fetchingData();
    };

    handlePrevPage = () => {
        let currentPage = this.state.search.page || 1;
        if (parseInt(currentPage) > 1) {
            this.setState({search: Object.assign({}, this.state.search, {page: parseInt(currentPage) - 1})});
        }
    };

    handleNextPage = () => {
        let currentPage = this.state.search.page || 1;
        if (parseInt(currentPage) < parseInt(this.totalPage)) {
            this.setState({search: Object.assign({}, this.state.search, {page: parseInt(currentPage) + 1})});
        }
    };

    handleChangePage = (e) => {
        let page = $(e.target).text();
        this.setState({search: Object.assign({}, this.state.search, {page: page})});
    };

    fetchingData = () => {
        if (!this.isFetching) {
            $('#loading').show();
            this.isFetching = true;
            axios.get(USER_INTERVIEWS, { params: Object.assign({}, this.state.search, this.search) })
                .then( rs => {
                    $('#loading').hide();
                    let result = rs.data;
                    this.totalPage = result.meta.pagination.total_pages;
                    this.setState({
                        search: Object.assign({}, this.state.search, this.search),
                        data: result.data
                    }, () => {
                        let currentPage = this.state.search.page || 1;
                        let params = parseInt(currentPage) !== 1
                            ? Object.assign({}, this.state.search, {page: currentPage})
                            : this.state.search;
                        this.props.history.push({
                            pathname: this.props.location.pathname,
                            search: !_.isEmpty(params) ? queryString.stringify(params) : ''
                        });
                        this.isFetching = false;
                    });
                })
                .catch( err => {
                    $('#loading').hide();
                    this.isFetching = false;
                })
        }
    };

    handleSendCancelRequest = (interview_id, reason) => {
        if (!this.isFetchingCancel) {
            this.isFetchingCancel = true;
            axios.post(USER_INTERVIEWS_CANCEL, {interview_id: interview_id, reason: reason})
                .then(rs => {
                    this.props.dispatch(showToast({type: 'success', message: trans('main.INFO_REQUEST_CANCEL_INTERVIEW')}));
                    this.fetchingData();
                    this.isFetchingCancel = false;
                })
                .catch( err => {
                    // console.log(err.response);
                    this.props.dispatch(showToast({type: 'error', message: trans('main.ESYS_0002')}));
                    this.isFetchingCancel = false;
                })
        }
    };

    render() {
        return (
            <ListInterview
                interview_status={this.config.interviewStatus || [] }
                search={this.search}
                handleSearchChange={this.handleSearchChange}
                handleSearch={this.handleSearch}
                handleClear={this.handleClear}
                interviews={this.state.data}
                handlePrevPage={this.handlePrevPage}
                handleNextPage={this.handleNextPage}
                handleChangePage={this.handleChangePage}
                handleSendCancelRequest={this.handleSendCancelRequest}
                paginate={{
                    totalPage: this.totalPage,
                    currentPage: this.state.search.page || 1
                }}
            />
        )
    }
}

export default withRouter(connect()(ListInterviewContainer));
