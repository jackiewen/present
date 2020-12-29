import React from 'react';
import ListInquiry from "../../../components/admin/ListInquiry";
import { getCommonsConfig, getTitlePage } from "../../../helpers";
import { withRouter } from 'react-router-dom';

const queryString = require('query-string');

class ListInquiryContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            params: queryString.parse(this.props.location.search),
            search: {},
        };
        this.inquiry_status = getCommonsConfig().inquireStatus;
    }

    componentDidMount() {
        document.title = getTitlePage(trans('main.SCN_INQUIRE_LIST'));
    }

    handleSearchChange = (e) => {
        const target = e.target;
        const name = target.id;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({search: Object.assign({}, this.state.search, {[name] : value})});
    };

    handleSearch = () => {
        this.setState({params: this.state.search});
    };

    handleClear = () => {
        this.setState({params: {}, search: {}});
    };

    render() {
        return (
            <ListInquiry
                search={this.state.search}
                params={this.state.params}
                handleSearchChange={this.handleSearchChange}
                handleSearch={this.handleSearch}
                handleClear={this.handleClear}
                inquiry_status={this.inquiry_status}
            />
        )
    }
}

export default withRouter(ListInquiryContainer);
