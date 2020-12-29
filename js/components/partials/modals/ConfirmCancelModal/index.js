import React from 'react';


class ConfirmDeleteModal extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        $(document).ready(() => {
            $('#yes').on('click', () => {
                this.props.handleCancelAction();
            });
        })
    }
    render() {
        return (
            <div className="modal fade" id="ConfirmCancelModal" tabIndex="1" aria-labelledby="modelCompanyModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modelCompanyModalLabel">キャンセルリクエストの確認</h5>
                            <button type="button" className="close close-modal" onClick={this.props.handleClickClose} data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <div className="form-group">
                                <label htmlFor="content" className="form-group">
                                    {trans('commons.interview.cancel_reason')}
                                </label>
                                <textarea  className="reason form-control mb-2" rows="3"
                                          defaultValue={this.props.reason}
                                          onChange={this.props.handleChangeReason}
                                />
                                <span className="error-messages-modal text-danger hide"></span>
                            </div>

                            <div className="messages text-center">
                                { this.props.confirm_message }
                            </div>

                            <div className="form-group mt-4 text-center">
                                <button id="yes" className="btn btn-primary mx-2">
                                    はい
                                </button>
                                <button  className="close-modal btn btn-danger mx-2" data-dismiss="modal">
                                    キャンセル
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ConfirmDeleteModal;
