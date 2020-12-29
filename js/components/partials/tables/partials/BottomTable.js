import React from 'react';
import PaginationLength from './PaginationLength';
import Pagination from './Pagination';
import { lengthOptions } from './../../../../config/pagination';

export default function BottomTable(props) {
    return (
        <div className="datatable-bottom">
            <PaginationLength selectedValue={props.perPage} handlePaginationLength={props.handlePaginationLength} options={props.lengthOptions || lengthOptions} />
            <Pagination
                pageCount={props.pageCount}
                handlePageClick={props.handlePageClick}
                forcePage={props.forcePage}
            />
        </div>
    );

}