import React from 'react';
import TableContainer from '../../../containers/partials/TableContainer';
import RelatedTable from '../tables/RelatedTable';
import AdviserItemWrapper from './../AdviserItemWrapper';

export default function AdviserRelatedItem(props) {
    return (
        <AdviserItemWrapper {...props}>
            <div className="box-pr mb-3">
                <div className="row">
                    <div className="col-md-12">
                        <div>
                            {trans('main.INFO_PRPOINT')}：<br/>
                            {props.adviser.pr_point}
                        </div>
                    </div>
                </div>
            </div>

            <TableContainer pushParamsToLink={false} baseUrl={props.baseUrl} params={props.params} firstLoadByDefault={props.firstLoadByDefault} timeLoad={props.timeLoad} defaultDataSource={props.relatedData}>
                <RelatedTable />
            </TableContainer>
        </AdviserItemWrapper>

    );

}
