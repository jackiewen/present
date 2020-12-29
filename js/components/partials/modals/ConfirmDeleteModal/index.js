import React from 'react';


class ConfirmDeleteModal extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $(document).ready(() => {
            $('#yes').on('click', () => {
                this.props.handleDeleteAction();
                $('#ConfirmDeleteModal').modal('hide');
            })
        })
    }

    render() {
        return (
            <div className="modal fade" id="ConfirmDeleteModal" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="modelCompanyModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modelCompanyModalLabel"> { this.props.confirm_title }</h5>
                            <button type="button" className="close" onClick={this.props.handleClickClose} data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="messages text-center">
                                { this.props.confirm_message }
                            </div>

                            <div className="form-group mt-4 text-center">
                                <button id="yes" className="btn btn-primary mx-2">
                                    はい
                                </button>
                                <button className="btn btn-danger mx-2" data-dismiss="modal">
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
