import React from 'react';
import TableContainer from '../../../containers/partials/TableContainer';
import UserTable from "../../../components/partials/tables/UserTable";
import { ADMIN_LIST_ACC } from "../../../constants/endpoint";
import {connect} from "react-redux";

class ListAcc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            params: Object.assign({}, this.props.search, {
                forceReload: false,
            })
        }
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if(this.props.modal.step === 0 && prevProps.modal.step === 3){
            this.setState({params: Object.assign({}, this.state.params,{forceReload: true})});
        }
    };

    handleSearchClick = () => {
        this.setState({
            params: Object.assign({}, this.state.params, this.props.search)
        })
    };

    handleClearClick = () => {
        this.setState({ params: { forceReload: false } }, () => {
            this.props.handleClearData()
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
                                                <button type="button" className="btn btn-success rounded-pill btn-lg float-right" onClick={this.props.showCreateUserModel}>
                                                    <i className="fa fa-plus" />
                                                    <span> 新規アカウントを発行する</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="filter">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="form-group">氏名・権限</label>
                                                        <input type="text" className="form-control form-control-lg"
                                                               name="strSearch"
                                                               value={this.props.search.strSearch || ''}
                                                               onChange={this.props.handleSearchChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-2">
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
                                                        baseUrl={ADMIN_LIST_ACC}
                                                        params={this.state.params}>
                                            <UserTable />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ListAcc);
