import React, { Component } from 'react';
import { connect } from 'react-redux';
import routers from './routers';
import { withRouter } from "react-router";
// import { clearSearch } from './actions/search';
import { clear as clearSSA } from './actions/selected_selection_adviser';
import { ADMIN_DETAIL_ADVISER_SELECTION_PATH } from './constants/path';
import { getPath } from './helpers';

let curPathname = '';

class RootContainer extends Component {
    constructor(props){
        super(props);
        // this.isClearSearch = true;
    }

    componentDidMount() {
        return this.props.history.listen((location) => {
            if (location.pathname !== curPathname) {
                const keepPath = getPath(ADMIN_DETAIL_ADVISER_SELECTION_PATH).replace(':id', '\\d').replace('/', '\\/');
                const keepPathRegex = new RegExp(keepPath);
                if (!location.pathname.match(keepPathRegex)) {
                    this.props.clearSSA();
                    toastr.clear();
                }
                // this.onRouteChanged();
            }
        });
    }

    componentDidUpdate(prevProps) {
        // this.isClearSearch = true;
        curPathname = this.props.location.pathname;
    }

    // onRouteChanged() {
    //     if (this.isClearSearch) {
    //         this.isClearSearch = false;
    //     }
    // }

    render() {
        return (
            <React.Fragment>
                {routers}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    const { search } = state;
    return {
        search
    };
};

const mapDispatchToProps = dispatch => ({
    // clearSearch: () => dispatch(clearSearch()), 
    clearSSA: () => dispatch(clearSSA())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RootContainer));
