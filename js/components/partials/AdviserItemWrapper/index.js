import React, { Component } from 'react';
import { Link, generatePath } from 'react-router-dom';
import classNames from 'classnames';
import { generatePathByUserType, getPath, getEndpointByUserType } from './../../../helpers';
import { USER_ADVISER_DETAIL_PATH, ADMIN_ADVISER_DETAIL_PATH } from './../../../constants/path';
import { ROOT_URL, TOGGLE_FAVORITE_ENDPOINT } from './../../../constants/endpoint';

export default class AdviserItemWrapper extends Component {
    state = {is_favorite: this.props.is_favorite}
    isFetching = false;
    handleToggleFavorite = (id) => {
        if (!this.isFetching) {
            this.isFetching = true;
            let postData = { adviser_id: id }
            axios.post(getEndpointByUserType(TOGGLE_FAVORITE_ENDPOINT), postData)
            .then(json => {
                if (this.props.refrestAfterChange) {
                    this.props.refrestAfterChange();
                }
                this.isFetching = false;
                this.setState({is_favorite: !this.state.is_favorite});
            })
            .catch(err => {
                this.isFetching = false;
            });
        }
    }

    render() {
        return (
            <div className="card card-outline card-info card-data">
                <div className="card-header">
                    <h5 className="card-title">
                        <i className={classNames(this.state.is_favorite ? "fa" : "far", "fa-star star-custom")}
                        onClick={
                            this.props.handleToggleFavorite ?
                                (() => this.props.handleToggleFavorite(this.props.adviser.id)) :
                                (() => this.handleToggleFavorite(this.props.adviser.id))
                        }
                        /> ID: <b>{this.props.adviser.komon_id}</b>　{this.props.adviser.company_name}<span>　</span>{this.props.adviser.position}
                    </h5>
                    <div className="float-right">
                        {!this.props.hideDetailButton &&
                            <a target="_blank" className="btn btn-sm btn-info btn-detail"
                                href={generatePathByUserType(getPath(ADMIN_ADVISER_DETAIL_PATH), getPath(USER_ADVISER_DETAIL_PATH),
                                    {
                                        id: this.props.adviser.id
                                    }
                                )}
                            >
                                <i className="fas fa-info-circle" /> {trans('main.SCN_DETAIL')}
                            </a>
                        }
                        {!this.props.hideInquireModal &&
                            <button onClick={this.props.showAskAdviserModal} className="btn btn-sm btn-success ml-1" data-toggle="tooltip"  data-html="true">
                                <i className="fas fa-question-circle" /> {trans('main.SCN_INQUIRE')}
                            </button>
                        }
                        {this.props.showDeleteButton &&
                            <button onClick={() => this.props.handleDeleteSelection(this.props.adviser.id)} className="btn btn-sm btn-danger ml-1">
                                <i className="fas fa-times" />
                            </button>
                        }
                        {this.props.showAddButton &&
                            <button onClick={() => this.props.handleAddSelection(this.props.adviser.id)} className="btn btn-sm btn-success ml-1">
                                <i className="fas fa-plus-circle" /> { trans('main.INFO_LBL_ADD_ADVISER') }
                            </button>
                        }
                    </div>
                </div>
                <div className="card-body">
                    {this.props.children}
                </div>
            </div>
        );
    }
}