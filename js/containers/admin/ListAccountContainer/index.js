import React from 'react';
import { ListAcc } from '../../../components/admin';
import {connect} from "react-redux";
import {openModal} from "../../../actions/modal";
import * as helpers from "../../../helpers";
import { withRouter } from "react-router-dom";

const queryString = require('query-string');

class ListAccountContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: queryString.parse(this.props.location.search)
        };
    }

    componentDidMount = () => {
        document.title = helpers.getTitlePage(trans('main.SCN_ACT_INHOUSE'));
    };

    handleSearchChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({search: Object.assign({}, this.state.search, {[name]: value})});
    };

    handleClearData = () => {
        this.setState({search: {}});
    };

    showCreateUserModel = () => {
        this.props.openModal({name: 'AdminModal', data: {type: 'create'}});
    };

    render() {
        return (
            <ListAcc
                {...this.props}
                search={this.state.search}
                handleSearchChange={this.handleSearchChange}
                showCreateUserModel={this.showCreateUserModel}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListAccountContainer));
