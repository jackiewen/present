import React from 'react';
import TableContainer from '../../../containers/partials/TableContainer';
import CompanyTable from "../../../components/partials/tables/CompanyTable";
import {COMPANY_LIST, ROOT_URL} from "../../../constants/endpoint";
import { LIST_COMPANY } from "../../../constants/path";
import {connect} from "react-redux";
import { getPath } from "../../../helpers";
import { focusInput } from "../../../helpers";

class ListCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            params: Object.assign({}, this.props.searchParams, {
                forceReload: false,
            })
        }
    }

    componentDidMount() {
        focusInput(this.searchInput);
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

    handleClear = () => {
        this.setState({params: {forceReload: false}}, () => {
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
                                                <button type="button" className="btn btn-success rounded-pill btn-lg float-right" onClick={this.props.showModal}>
                                                    <i className="fa fa-plus" />
                                                    <span>ユーザー企業新規登録</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="filter">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="form-group">{trans('commons.company.search_1')}</label>
                                                        <input type="text" className="form-control form-control-lg"
                                                               name="strSearch"
                                                               value={this.props.searchParams?.strSearch || ''}
                                                               onChange={this.props.handleSearchChange}
                                                               ref={(input) => {this.searchInput = input;}}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-2 offset-md-4">
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
                                                        <button className="btn btn-secondary btn-block btn-lg" onClick={this.handleClear}>
                                                            <i className="fas fa-eraser" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="icheck-primary d-inline">
                                                        <input type="checkbox" id="empty_admin" name="empty_admin"
                                                               checked={String(this.props.searchParams.empty_admin).toLowerCase() === 'true'}
                                                               onChange={this.props.handleSearchChange} />
                                                        <label htmlFor="empty_admin">
                                                            担当社員がいないユーザー企業のみ表示
                                                        </label>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <TableContainer pushParamsToLink={true}
                                                        baseUrl={ROOT_URL + COMPANY_LIST}
                                                        basePath={getPath(LIST_COMPANY)}
                                                        params={this.state.params}>
                                            <CompanyTable />
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

export default connect(mapStateToProps, mapDispatchToProps)(ListCom);
