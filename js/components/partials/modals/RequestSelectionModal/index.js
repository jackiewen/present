import React, { Component } from 'react';
import ProgressBar from './../partials/ProgressBar';
import FooterContactModal from './../partials/FooterContactModal';
import { ROOT_URL, CREATE_REQUEST_ADVISER_ENDPOINT } from './../../../../constants/endpoint';
import CompleteMessageUser from '../../CompleteMessageUser';

export default class RequestSelectionModal extends Component {

    state = {
        errors: {}
    };

    isFetching = false;
    setValidator = null;

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if(!_.isEmpty(prevState.errors) && prevProps.modal.isOpen && !this.props.modal.isOpen) {
            this.setState({errors: {}});
        }
    };

    validateForm = () =>
    {
        let rules = {
            topic_name: {
                required: true,
                maxlength: 200,
            },
            description: {
                required: true,
            },
        };

        this.setValidator = $('.msform').validate({
            rules: rules,
            messages: {
                topic_name: {
                    required: trans('main.EVAL_REQUIRED', {'attribute': trans('main.INFO_LBL_TOPIC')}),
                    maxlength: trans('main.EVAL_MAXLENGTH', {
                        'attribute': trans('main.INFO_LBL_TOPIC'),
                        'number': 200
                    })
                },
                description: {required: trans('main.EVAL_REQUIRED', {'attribute': trans('main.INFO_LBL_DESCRIPTION')})}
            },
            invalidHandler: (event, validator) => {
                this.setState({
                    errors: validator.errorMap
                });
            },
            errorPlacement: (error, element) => {

            },
        });
    };

    handleClickNext = () => {
        if(this.setValidator !== null){
            this.setValidator.destroy();
        }
        this.validateForm();
        let valid = $('.msform').valid();
        if(valid) {
            this.props.handleClickNext();
        }
    };

    handleSubmit = () => {
        if (!this.isFetching) {
            this.isFetching = true;
            let postData = this.props.modal.data;
            axios.post(ROOT_URL + CREATE_REQUEST_ADVISER_ENDPOINT, postData)
            .then(json => {
                this.isFetching = false;
                this.props.handleClickNext();
            })
            .catch(err => {
                this.isFetching = false;
                switch (err.response.status) {
                    case 422:
                        let data = err.response.data;
                        let mess = {};
                        Object.keys(data.errors).forEach((element) => {
                            mess[element] = data.errors[element].join(', ')
                        });
                        this.setState({
                            errors: mess,
                        });
                        break;
                }

                this.props.handleClickPrevious();
            });
        }
    }

    render() {
        return (
            <div className="modal fade modal-processbar" id="RequestSelectionModal" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="modelFindAdviserLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                    <div className="modal-header text-center">
                        <h5 className="modal-title w-100" id="modelFindAdviserLabel"><b>{ trans('main.SCN_REQUEST_SELECTION')}</b></h5>
                        <button type="button" className="close" onClick={this.props.handleClickClose} aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div className="modal-body pt-4">
                        <form className="msform">
                            <ProgressBar items={['first', 'check', 'done']} step={this.props.modal.step} />
                            <div className="row">
                                <div className="col-md-12 pt-5 mx-0 msform">
                                    <fieldset>
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label text-right">顧問のミッション</label>
                                            <div className="col-sm-9">
                                                <input
                                                    onChange={this.props.handleChange}
                                                    value={this.props.modal.data.topic_name || ''}
                                                    className={"form-control" + (this.state.errors?.topic_name ? " is-invalid":"")}
                                                    name="topic_name"
                                                    placeholder="顧問のミッション" />
                                                {this.state.errors?.topic_name && (
                                                    <span id="topic_name-error" className="error invalid-feedback">{this.state.errors?.topic_name}</span>
                                                )}
                                            </div>

                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label text-right">内容</label>
                                            <div className="col-sm-9">
                                                <textarea
                                                    className={"form-control" + (this.state.errors?.description ? " is-invalid":"") }
                                                    rows="15"
                                                    onChange={this.props.handleChange}
                                                    value={this.props.modal.data.description || ''}
                                                    name="description"
                                            placeholder="● 探している知見や人脈の具体的イメージ
● 案件の進め方イメージ
● 事前に確認しておきたいこと"></textarea>
                                            {this.state.errors?.description && (
                                                    <span id="description-error" className="error invalid-feedback">{this.state.errors?.description}</span>
                                            )}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-3">&nbsp;</div>
                                            <div className="col-sm-9 text-center">
                                                <button type="button" className="btn btn-primary btn-lg btn-block ms-next" onClick={this.handleClickNext}>送信内容を確認</button>
                                                <button type="button" className="btn btn-secondary btn-lg btn-block " onClick={this.props.handleClickClose}>戻る</button>
                                            </div>
                                        </div>

                                        <FooterContactModal />

                                    </fieldset>
                                    <fieldset>
                                        <h5 className="text-center mb-3">送信してよろしいですか？</h5>

                                        <div className="form-group row">
                                            <label htmlFor="input-confirm" className="col-sm-3 col-form-label text-right">顧問のミッション</label>
                                            <div className="col-sm-9">
                                                <input className="form-control input-confirm" value={this.props.modal.data.topic_name || ''} name="topic_name" disabled />
                                            </div>
                                        </div>


                                        <div className="form-group row">
                                            <label htmlFor="textarea-content-confirm" className="col-sm-3 col-form-label text-right">内容</label>
                                            <div className="col-sm-9">
                                                <textarea className="form-control textarea-content-confirm" value={this.props.modal.data.description || ''} name="description" rows="15" disabled></textarea>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3">&nbsp;</div>
                                            <div className="col-sm-9 text-center">
                                                <button type="button" className="btn btn-success btn-lg btn-block ms-next" onClick={this.handleSubmit}>送信</button>
                                                <button type="button" className="btn btn-secondary btn-lg btn-block ms-previous" onClick={this.props.handleClickPrevious}>戻る</button>
                                            </div>

                                        </div>

                                        <FooterContactModal />

                                    </fieldset>
                                    <fieldset>
                                        <CompleteMessageUser handleClickClose={this.props.handleClickClose} />

                                        <FooterContactModal isSubmited={true} />

                                    </fieldset>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        );
    }
}

