import React from 'react';
import InterviewDetail from "../../../components/admin/InterviewDetail";
import { withRouter, generatePath } from 'react-router-dom';
import { ADMINS_INTERVIEW_DETAIL } from "../../../constants/endpoint";

class InterviewDetailContainer extends React.Component {
    constructor (props) {
        super (props);
        this.interview_id = this.props.match.params.id;
        this.isFetching = false;
        this.state = { interview: {}, admins: {} };
    }

    componentDidMount() {
        this.featchingData();
    }

    featchingData = () => {
        if (!this.isFetching) {
            this.isFetching = true;
            axios.get(generatePath(ADMINS_INTERVIEW_DETAIL, {id: this.interview_id}))
                .then( rs => {
                    this.setState({interview: rs.data}, () => {
                        this.isFetching = false;
                    });
                })
                .catch( err => {
                    console.log(err.response);
                    this.isFetching = false;
                })
        }
    };

    render() {
        return (
            <InterviewDetail
                {...this.state.interview}
                featchingData={this.featchingData}
            />
        );
    }
}

export default withRouter(InterviewDetailContainer);
