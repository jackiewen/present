import React from 'react';
import { getCommonsConfig } from "../../../helpers";
import { ListInterview } from '../../../components/admin';

class ListInterviewContainer extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            data: []
        };
        this.config = getCommonsConfig();
        this.isFetching = false;
    }

    render() {
        return (
            <ListInterview
                interview_status={this.config?.interviewStatus || []}
            />
        )
    }
}

export default ListInterviewContainer;
