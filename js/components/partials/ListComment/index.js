import React from 'react';
import Comment from './Comment';
import {USER_TYPE_ADMIN, USER_TYPE_USER} from "../../../constants/common";
import PropTypes from 'prop-types';
import {generatePath} from 'react-router-dom';
import { connect } from 'react-redux';
import { showToast } from "../../../actions/toast";

class ListComment extends React.Component {
    
    constructor (props) {
        super(props);
        this.state = {
            data: [],
            new_comment: '',
            load_more: false
        };
        this.isFetching = false;
        this.isFetchingLoadMore = false;
        this.first_comment_id = 0;
        this.comments_id_list = [];
        this.isLoadMore = true;
        console.log(this.props.data);
    }

    componentDidMount() {
        if (!_.isEmpty(this.props.data)) {
            this.setState({data: this.coverData(this.props.data)});
        }
        this.handleLoadMoreScroll();
    }

    coverData = (data) => {
        let comments = [];
        if (!_.isEmpty(data)) {
            this.first_comment_id = data.reverse()[0].id;
            data.reverse().forEach( element => {
                this.comments_id_list.push(element.id);
                if (element.user_id) {
                    comments.push({
                        type: USER_TYPE_USER,
                        id: element.id,
                        description: element.description,
                        created_at: element.created_at,
                        owner:element.user?.last_name +' '+ element.user?.first_name ,
                    })
                } else {
                    comments.push({
                        type: USER_TYPE_ADMIN,
                        id: element.id,
                        description: element.description,
                        created_at: element.created_at,
                        owner: element.race_user?.last_name +' '+ element.race_user?.first_name,
                    })
                }
            });
        }
        return comments;
    };

    handleContentChange = (e) => {
        this.setState({ new_comment: e.target.value});
    };

    handleAddComment = () => {
        if(this.state.new_comment.length == 0){
            $('.error-messages').text(trans('main.EVAL_REQUIRED', {'attribute': trans('main.INFO_LBL_COMMENT')}));
            $('.error-messages').removeClass('hide');
            return false;
        }
        if(this.state.new_comment.length >0 && this.state.new_comment.length < 20){
            $('.error-messages').text(trans('main.EVAL_MINLENGTH', {'attribute': trans('main.INFO_LBL_COMMENT'),'number': 20}));
            $('.error-messages').removeClass('hide');
            return false;
        }
        if (!this.isFetching) {
            this.isFetching = true;
            axios.post(generatePath(this.props.add_comment_url, {id: this.props.model_id}), {
                description: this.state.new_comment,
                comments: this.comments_id_list
            }).then( rs => {
                this.setState({
                    data: this.coverData(rs.data),
                    new_comment: ''
                }, () => {
                    let list_comments = $('.comments-' + this.props.model_id);
                    list_comments.scrollTop(0);
                    this.isFetching = false;
                    this.props.dispatch(showToast({type: 'success', message: trans('main.MSG_COMMENT_IS_SENT')}));
                });
                $('.error-messages').text('');
            })
            .catch( err => {
                // console.log(err.response);
                this.props.dispatch(showToast({type: 'error', message: trans('main.ESYS_0002')}));
                this.isFetching = false;
            });
        }
    };

    handleLoadMore = () => {
        if (!this.isFetchingLoadMore) {
            this.isFetchingLoadMore = true;
            axios.get(generatePath(this.props.load_more_url, {id: this.props.model_id}), {
                params: {max_id: this.first_comment_id}
            }).then( rs => {
                if (rs.data.length < 5) this.isLoadMore = false;
                this.setState( {
                    data: [...this.state.data, ...this.coverData(rs.data)],
                    load_more: false
                }, () => {
                    let tmp =  [...this.state.data];
                    this.first_comment_id = tmp.reverse()[0].id;
                    this.isFetchingLoadMore = false;
                });
            })
            .catch( err => {
                console.log(err.response);
                this.isFetchingLoadMore = false;
            })
        }
    };

    handleLoadMoreScroll = (e) => {
        let list_comments = $('.comments-' + this.props.model_id);
        let scroll_height = list_comments[0].scrollHeight;
        if (parseInt(list_comments[0].scrollTop) === (scroll_height - list_comments.outerHeight()) && this.isLoadMore) {
            this.setState({
                load_more: true,
            });
        }
    };

    render() {
        return (
            <React.Fragment>
                <div className="card mt-3 shadow-none post-box show">
                    <div className="card-header pl-0">
                        <h3 className="card-title" ref={ title => {this.title = title}}>{trans('main.INFO_LBL_HEADER_COMMENT')}</h3>
                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                <i className="fas fa-minus" />
                            </button>
                        </div>
                    </div>
                    <div className={"card-body comments comments-"+this.props.model_id} onScroll={this.handleLoadMoreScroll} style={{overflowY: scroll}}>
                        {this.state.data.map( element => (
                            <Comment key={'element-' + element.id} info={element} />
                        ))}
                        {this.state.load_more && !_.isEmpty(this.props.data) &&
                            <div className="load-more text-center">
                                <button key={"load-more-" + this.props.model_id}
                                        type="button" className="btn btn-secondary" onClick={this.handleLoadMore}>{trans('main.INFO_LOAD_MORE')}</button>
                            </div>
                        }
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <textarea required className="form-control mb-2" rows="3"
                                  value={this.state.new_comment}
                                  onChange={this.handleContentChange}
                        />
                        <span className="error-messages text-danger hide"></span>
                        <button className="btn btn-success pr-5 pl-5 float-right" onClick={this.handleAddComment}>
                            {trans('commons.send')}
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

ListComment.prototypes = {
    data: PropTypes.array
};

export default connect()(ListComment);
