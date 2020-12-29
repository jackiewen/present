import React from 'react';
import { ListCom } from '../../../components/admin';
import {connect} from "react-redux";
import {openModal} from "../../../actions/modal";
import * as helpers from "../../../helpers";
import { withRouter } from "react-router-dom";

const queryString = require('query-string');

class ListCompanyContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchParams: queryString.parse(this.props.location.search),
        };
    }

    componentDidMount() {
        document.title = helpers.getTitlePage(trans('main.SCN_COMPANY'));
    }

    handleSearchChange = (e) => {
        const target =  e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({searchParams: Object.assign({}, this.state.searchParams, {[name]: value})});
    };

    handleClearData = () => {
        this.setState({searchParams: {}});
    };

    showCompanyModal = () => {
        this.props.openModal({name: 'CompanyModal', data: {}});
    };

    render() {
        return (
            <ListCom
                {...this.props}
                searchParams={this.state.searchParams}
                handleSearchChange={this.handleSearchChange}
                showModal={this.showCompanyModal}
                handleClearData={this.handleClearData}
            />
        );
    }
}


const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => ({
    openModal: (data) => dispatch(openModal(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListCompanyContainer));
