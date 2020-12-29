import React from 'react';
import ReactPaginate from 'react-paginate';

export default function Pagination(props) {
    return (
        <ReactPaginate
            previousLabel={<i className="fa fa-chevron-left text-blue"></i>}
            nextLabel={<i className="fa fa-chevron-right text-blue"></i>}
            breakLabel={'...'}

            pageCount={props.pageCount || 0}
            marginPagesDisplayed={props.marginPagesDisplayed || 2}
            pageRangeDisplayed={props.pageRangeDisplayed || 5}

            initialPage={props.initialPage || 0}
            forcePage={props.forcePage || props.initialPage || 0}
            onPageChange={props.handlePageClick}
            disableInitialCallback={true}

            containerClassName={'pagination'}
            activeClassName={'active'}

            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}

            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}

            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
        />
    );

}