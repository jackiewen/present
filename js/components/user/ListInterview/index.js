import React from 'react';
import Interview from "./Interview";
import {ConfirmCancelModal} from "../../partials/modals";
import * as helpers from '../../../helpers';
import {
    NoResultList,
} from '../../partials';
class ListInterview extends React.Component {
    constructor (props) {
        super (props);
        this.cancel_id = 0;
        this.confirm_message = <React.Fragment> [はい]をクリックすると、元に戻すことができません。<br/>  解約してもよろしいでしょうか？</React.Fragment>;
        this.reason = '';
        console.log(props);
    }
    
    componentDidMount() {
        document.title = helpers.getTitlePage(trans('main.SCN_INTERVIEW_CLIENT'));
    }
    handleClearData = (e) => {
        $('#content').val('');
        $('#status').val(0);
        this.props.handleClear(e);
    };
    handleCancel = (id) => {
        $('#ConfirmCancelModal').modal('show');
        $('#ConfirmCancelModal').on('shown.bs.modal', function () {
            $('.reason').focus();
        });
        $('#ConfirmCancelModal').on('hide.bs.modal', function () {
            this.reason = '';
            $('.error-messages-modal').text('');
            $('.reason').val('');
        })
        this.cancel_id = id;
    };

    handleCancelAction = () => {
       if(this.reason.length == 0){
            $('.error-messages-modal').text(trans('main.EVAL_REQUIRED', {'attribute': trans('main.INFO_LBL_DESCRIPTION')}));
            $('.error-messages-modal').removeClass('hide');
            return false;
        }
        if(this.reason.length > 0 && this.reason.length >255 ){
            $('.error-messages-modal').text(trans('main.EVAL_MAXLENGTH', {'attribute': trans('main.INFO_LBL_DESCRIPTION'),'number': 255}));
            $('.error-messages-modal').removeClass('hide');
            return false;
        }
        this.props.handleSendCancelRequest(this.cancel_id, this.reason);
        $('#ConfirmCancelModal').modal('hide');
        
    };

    handleChangeReason = (e) => {
        this.reason = e.target.value;
    };
  
    render() {
        return (
            <React.Fragment>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12 pt-3">
                                <div className="card">
                                    <div className="card-header mt-3">
                                        <div className="filter">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label htmlFor="content" className="form-group">{trans('commons.interview.content_search')}</label>
                                                        <input type="text" className="form-control form-control-lg" id="content"
                                                               defaultValue={this.props.search.content}
                                                               onChange={this.props.handleSearchChange}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label htmlFor="status" className="form-group">{trans('commons.interview.status_search')}</label>
                                                        <select className="form-control form-control-lg" id='status'
                                                                defaultValue={this.props.search.status}
                                                                onChange={this.props.handleSearchChange}>
                                                            <option value="0">全て</option>
                                                            {this.props.interview_status.map( element => (
                                                                <option key={element.id} value={element.id}>{element.status_name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-2 align-self-end">
                                                    <div className="form-group">
                                                        <button className="btn btn-primary btn-lg btn-block mb-3" onClick={this.props.handleSearch}>
                                                            <i className="fa fa-search" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="col-md-2 align-self-end">
                                                    <div className="form-group">
                                                        <button className="btn btn-secondary btn-block btn-lg mb-3" onClick={this.handleClearData}>
                                                            <i className="fas fa-eraser" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body pt-0">
                                        {this.props.interviews.map( element => (
                                            <Interview key={element.id} data={element} handleCancel={this.handleCancel} />
                                        ))}
                                    </div>
                                    <div className="card-body pt-4">
                                         {(_.isEmpty(this.props.interviews) || this.props.interviews?.meta?.pagination?.total == 0) &&
                                            <NoResultList/>
                                        }
                                    </div>
                                    { !_.isEmpty(this.props.interviews) &&
                                        <div className="card-footer d-flex">
                                            <ul className="pagination pagination-md mb-0 ml-auto">
                                                {this.props.paginate.currentPage > 1
                                                    ? <li className="page-item"><button className="page-link" onClick={this.props.handlePrevPage}>«</button></li>
                                                    : <li className="page-item"><span className="page-link">«</span></li>
                                                }

                                                {this.props.paginate.totalPage && Array.from(Array(this.props.paginate.totalPage), (e, i) => {
                                                    return parseInt(i + 1) === parseInt(this.props.paginate.currentPage)
                                                        ? <li key={i+1} className="page-item active"><span className="page-link">{i + 1}</span></li>
                                                        : <li key={i+1} className="page-item"><button className="page-link" onClick={this.props.handleChangePage}>{i + 1}</button></li>
                                                })}

                                                {this.props.paginate.currentPage < this.props.paginate.totalPage
                                                    ? <li className="page-item"><button className="page-link" onClick={this.props.handleNextPage}>»</button></li>
                                                    : <li className="page-item"><span className="page-link">»</span></li>
                                                }
                                            </ul>
                                        </div>
                                      }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <ConfirmCancelModal
                    confirm_message={this.confirm_message}
                    handleCancelAction={this.handleCancelAction}
                    reason={this.reason}
                    handleChangeReason={this.handleChangeReason}
                />
            </React.Fragment>
        );
    }
}

export default ListInterview;
