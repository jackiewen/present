import React from 'react';
import TableContainer from '../../../containers/partials/TableContainer';
import CompanyAccTable from "../../../components/partials/tables/CompanyAccTable";
import { COMPANY_ACC_LIST } from "../../../constants/endpoint";
import { LIST_COMPANY } from "../../../constants/path";
import { Link, generatePath } from "react-router-dom";
import {connect} from "react-redux";
import {openModal} from "../../../actions/modal";
import { getPath, focusInput } from "../../../helpers";

class ListComAcc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            params: {
                forceReload: false,
            }
        };
    }

    componentDidMount() {
        focusInput(this.nameInput);
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if(!this.props.modal.isOpen && prevProps.modal.isOpen){
            this.setState({params: Object.assign({}, this.state.params,{forceReload: true})});
        }
    };

    handleSearchClick = () => {
        this.setState({
            params: Object.assign({}, this.state.params, this.props.searchParams)
        })
    };

    handleClearClick = () => {
        this.setState({ params: {} }, () => {
            this.props.handleClearData();
        })
    };

    render() {
        return (
            <React.Fragment>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12 pt-3">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="row mb-5">
                                            <div className="col-md-12">
                                                <div className="d-flex justify-content-end">
                                                    <button type="button" className="btn btn-success rounded-pill btn-lg float-right"
                                                            onClick={() => this.props.openModal({name: 'CompanyAccModal', data: {company_id: this.props.match.params.id, type: 'create',title:trans('commons.admins.modal_create_title')}})}>
                                                        <i className="fa fa-plus" />
                                                        <span> 新規アカウントを発行する</span>
                                                    </button>
                                                    <Link to={getPath(LIST_COMPANY)} className="btn btn-success rounded-pill btn-lg ml-2 backtocom">
                                                        <i className="fas fa-caret-left" />
                                                        <span> ユーザー企業一覧</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="filter">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="form-group"> {trans('main.INFO_NAME')} </label>
                                                        <input type="text" className="form-control form-control-lg"
                                                               name="name"
                                                               ref={ input => { this.nameInput = input }}
                                                               value={this.props.searchParams.name || ''}
                                                               onChange={this.props.handleSearchChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="form-group"> {trans('main.INFO_LBL_DIVISION')} </label>
                                                        <input type="text" className="form-control form-control-lg"
                                                               name="division"
                                                               value={this.props.searchParams.division || ''}
                                                               onChange={this.props.handleSearchChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="form-group"> {trans('main.INFO_LBL_EMAIL')} </label>
                                                        <input type="text" className="form-control form-control-lg"
                                                               name="email"
                                                               value={this.props.searchParams.email || ''}
                                                               onChange={this.props.handleSearchChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-2 offset-md-8">
                                                    <div className="form-group">
                                                        <label className="form-group" style={{height: '17px'}}/>
                                                        <button className="btn btn-primary btn-lg btn-block" onClick={this.handleSearchClick}>
                                                            <i className="fa fa-search" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="col-md-2">
                                                    <div className="form-group">
                                                        <label className="form-group" style={{height: '17px'}} />
                                                        <button className="btn btn-secondary btn-block btn-lg" onClick={this.handleClearClick}>
                                                            <i className="fas fa-eraser" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <TableContainer pushParamsToLink={true}
                                                        baseUrl={generatePath(COMPANY_ACC_LIST, this.props.match.params)}
                                                        params={this.state.params}>
                                            <CompanyAccTable />
                                        </TableContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    const { modal } = state;
    return {
        modal
    };
};

const mapDispatchToProps = dispatch => ({
    openModal: (data) => dispatch(openModal(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListComAcc);
