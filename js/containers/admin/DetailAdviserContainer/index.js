import React, { Component } from 'react';
import * as Admin from './../../../components/admin';
import { connect } from 'react-redux';
import { openModal } from '../../../actions/modal';
import { DETAIL_ADVISER_ENDPOINT } from './../../../constants/endpoint';
import { getEndpointByUserType } from './../../../helpers';

class DetailAdviserContainer extends Component {
    
    state = {
        data_source: {}
    }
    isFetching = false;

    base_endpoint = getEndpointByUserType(DETAIL_ADVISER_ENDPOINT, this.props.match.params)

    componentDidMount() {
        $('.main-header').addClass('d-none');
        $('.main-sidebar').addClass('d-none');
        $('.content-wrapper').removeClass('content-wrapper');
        $('.main-footer').addClass('ml-0');

        this.reloadData(this.base_endpoint);
    }

    reloadData = (url) => {
        if (!this.isFetching) {
            this.isFetching = true;
            axios.get(url)
            .then(json => {
                this.setState({data_source: json.data});
                this.isFetching = false;
            })
            .catch(err => {
                this.isFetching = false;
            });
        }
    }

    render() {
        return (
            <Admin.DetailAdviser adviser={this.state.data_source.data} />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailAdviserContainer);