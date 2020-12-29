import React, { Component } from 'react';
import { getEndpointByUserType } from './../../../helpers';

import { ROOT_URL, POPULAR_KEYWORD_ENDPOINT } from './../../../constants/endpoint';

const URL_POPULAR_KEYWORD = getEndpointByUserType(POPULAR_KEYWORD_ENDPOINT);

const colors = [
    'badge-info',
    'badge-success',
    'badge-primary',
    'badge-warning',
    'badge-secondary',
    'badge-danger',
    'badge-purple',
    'badge-yellow-green'
];

export default class PopularKeywordBox extends Component {
    state = {popular_keywords: []};

    componentDidMount() {
        axios.get(URL_POPULAR_KEYWORD).then(json => { this.setState({popular_keywords: json.data}) }).catch(err => {});
    }

    handlePopularKeywordClick = (data) => {
        $('#adviserSearchForm').find('input[name="keyword"]').val(data);
    }
    render() {
        return (
            <div className="card card-warning card-outline">
                <div className="card-header">
                    <h3 className="card-title">人気ワードで検索する</h3>
                </div>
                <div className="card-body badge-suggest pb-3">
                    {this.state.popular_keywords && this.state.popular_keywords.map((item, i) => (
                        <span key={"kw-" + i} onClick={() => this.handlePopularKeywordClick(item)} className={"badge badge-custom " + colors[i % colors.length] }>{item}</span>
                    ))}
                </div>
            </div>
        );
    }
}
