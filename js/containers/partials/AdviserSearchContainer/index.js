import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdviserSearch from './../../../components/partials/AdviserSearch';
import { clearSearch, searchIfNeeded } from './../../../actions/search';
import * as endpointConstants from './../../../constants/endpoint';
import { getEndpointByUserType } from './../../../helpers';

const URL_SEARCH = getEndpointByUserType(endpointConstants.SEARCH_ADVISER_ENDPOINT);

class AdviserSearchContainer extends Component {

    state = {
        data: {},
        oldData: {}
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!_.isEqual(nextProps.data, prevState.oldData)) {
            return {
                data: nextProps.data,
                oldData: nextProps.data
            };
        }
        return null;
    }

    componentDidMount() {
        let dataHistory = [
            "NTT データ",
            "AI",
            "Google",
            "機械学習"
        ];
        
        $("input[name='keyword']").autocomplete({
            source: dataHistory,
            minLength: 0
        }).focus(function(){            
            $(this).data("uiAutocomplete").search($(this).val());
        });
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({data: Object.assign({}, this.state.data, {
            [name]: value
        })});
    }

    handleSearch = () => {
        let isRelated = null;
        if (this.state.data?.company_related || this.state.data?.title_related) {
            isRelated = true;
        }
        this.props.searchIfNeeded(URL_SEARCH, Object.assign({}, this.state.data, {
            is_related: isRelated
        }));
    }

    handleReset = () => {
        this.setState({ data: {} });
    }

    render() {
        return (<AdviserSearch
            handleChange={this.handleChange}
            handleSearch={this.handleSearch}
            handleReset={this.handleReset}
            {...this.state.data}
        />);
    }
}

const mapStateToProps = state => {
    return {
    };
}

const mapDispatchToProps = dispatch => ({
    clearSearch: () => dispatch(clearSearch()),
    searchIfNeeded: (url, params) => dispatch(searchIfNeeded(url, params))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdviserSearchContainer);