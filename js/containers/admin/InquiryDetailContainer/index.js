import React from 'react';
import InquiryDetail from "../../../components/admin/InquiryDetail";
import { withRouter, generatePath } from 'react-router-dom';
import { ADMINS_INQUIRE_DETAIL } from '../../../constants/endpoint';

class InquiryDetailContainer extends React.Component {
    constructor(props) {
        super(props);
        this.inquiry_id = this.props.match.params.id;
        this.isFetching = false;
        this.state = {
            inquiry_detail: {}
        }
    }

    componentDidMount() {
        this.fetchingInquiryDetail();
    }

    fetchingInquiryDetail = () => {
        if (!this.isFetching) {
            this.isFetching = true;
            axios.get(generatePath(ADMINS_INQUIRE_DETAIL, {id: this.inquiry_id}))
                .then( rs => {
                    this.setState({inquiry_detail: rs.data});
                    this.isFetching = false;
                })
                .catch( err => {
                    console.log(err.response);
                    this.isFetching = false;
                })
        }
    };

    render() {
        return (
            <InquiryDetail
                {...this.state.inquiry_detail}
            />
        )
    }
}

export default withRouter(InquiryDetailContainer);
