import React from 'react';
import { ListComAcc } from '../../../components/admin';
import {connect} from "react-redux";
import * as helpers from "../../../helpers";
import { withRouter } from "react-router-dom";

const queryString = require('query-string');

class ListCompanyAccountsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchParams: queryString.parse(this.props.location.search),
        };
    }

    componentDidMount() {
        document.title = helpers.getTitlePage(trans('main.SCN_ACT_COMPANY'));
    }

    handleSearchChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({searchParams: Object.assign({}, this.state.searchParams, {[name]: value})});
    };

    handleClearData = () => {
        this.setState({searchParams: {}});
    };

    render() {
        return (
            <ListComAcc
                {...this.props}
                searchParams={this.state.searchParams}
                handleSearchChange={this.handleSearchChange}
                handleClearData={this.handleClearData}
            />
        );
    }
}

export default withRouter(ListCompanyAccountsContainer);
