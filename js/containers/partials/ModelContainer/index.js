import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal, nextModal, previousModal, handleChangeModal } from '../../../actions/modal';


import * as Modal from '../../../components/partials/modals';

class ModalContainer extends Component {

    componentDidUpdate(prevProps) {

        if (this.props.modal.isOpen) {
            $(this.props.modal.selector || '#' + this.props.modal.name).modal('show');
        } else {
            $(this.props.modal.selector || '#' + this.props.modal.name).modal('hide');
        }

        if (this.props.modal.isOpen && this.props.modal.isChangeStep) {
            let els = $(this.props.modal.selector || '#' + this.props.modal.name).find('fieldset');
            if (els.length > 0) {
                els.each((index, el) => {
                    if (this.props.modal.step - 1 == index) {
                        $(el).show();
                        $(el).css('opacity', 1);
                    } else {
                        $(el).hide();
                        $(el).css('opacity', 0);
                    }
                });
            }
        }
    }

    handleClickClose = () => {
        this.props.closeModal({ name: this.props.modal.name, selector : this.props.modal.selector, data: {}});
    };

    handleClickNext = () => {
        this.props.nextModal(this.props.modal);
    };

    handleClickPrevious = () => {
        this.props.previousModal(this.props.modal);
    };

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.props.handleChangeModal({data: Object.assign({}, this.props.modal.data, {
                [name]: value
            })});
    };

    handleUpdateData = (data) => {
        this.props.handleChangeModal({data: data})
    };

    render() {
        const ModalName = Modal[this.props.modal.name];
        return (
            <React.Fragment>
            {ModalName &&
                <ModalName
                    {...this.props}
                    handleClickClose={this.props.handleClickClose || this.handleClickClose }
                    handleClickNext={this.props.handleClickNext || this.handleClickNext }
                    handleClickPrevious={this.props.handleClickPrevious || this.handleClickPrevious }
                    handleChange={this.handleChange}
                    handleUpdateData={this.handleUpdateData}
                />
            }
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    const { modal } = state;
    return {
        modal
    };
}

const mapDispatchToProps = dispatch => ({
    closeModal: (data) => dispatch(closeModal(data)),
    nextModal: (data) => dispatch(nextModal(data)),
    previousModal: (data) => dispatch(previousModal(data)),
    handleChangeModal: (data) => dispatch(handleChangeModal(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
