import React from 'react';
import {
    Contact,
} from '../../partials';
import TableContainer from '../../../containers/partials/TableContainer';
import AdviserSelectionTable from '../../partials/tables/AdviserSelectionTable';
import SearchBox from './SearchBox';

export default function ListAdviserSelection(props) {
    return (
        <React.Fragment>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-3">
                            <div className="card">
                                <div className="card-header">
                                    <SearchBox params={props.params} handleSearch={props.handleSearch} handleClear={props.handleClear}/>
                                </div>
                                <div className="card-body">
                                    <div className="row mt-2">
                                        <div className="col-md-12">
                                            <TableContainer
                                                showHeader={{total_message: "main.INFO_LBL_REQUEST_SELECTION_TOTAL"}}
                                                pushParamsToLink={true}
                                                baseUrl={props.baseUrl}
                                                basePath={props.basePath}
                                                params={props.params || {}}
                                                showSpinner>
                                                <AdviserSelectionTable/>
                                            </TableContainer>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Contact />
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );

}
