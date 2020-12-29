import React from 'react';
import { withRouter } from 'react-router-dom';
import * as pathContract from '../../../constants/path';
import { matchPath, generatePath } from 'react-router';
import './breadcrumb.css';

class Breadcrumbs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            receiveScreen: [],
            breadcrumb : [],
            current: ''
        };
        this.pathName = null;
    }

    componentDidMount() {
        this.getPathName();
        let screen = this.state.receiveScreen;
        this.buildStruct(screen);
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (!_.isEqual(prevState.receiveScreen, this.state.receiveScreen)) {
            let screen = this.state.receiveScreen;
            this.buildStruct(screen);
        }
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!_.isEqual(nextProps.sidebar, prevState.receiveScreen)){
            let screen = nextProps.sidebar;
            return {
                receiveScreen: screen
            }
        }
        return null;
    }

    getPathName = () => {
        Object.keys(pathContract).forEach( element => {
            let match = matchPath(this.props.history.location.pathname, {path: pathContract[element].path, exact: true});
            if (match) {
                this.pathName = pathContract[element].route;
                return false;
            }
        });
    };

    getPathByRoute = (route) => {
        let path = null;
        Object.keys(pathContract).forEach( element => {
            if (pathContract[element].route === route) {
                path = pathContract[element].path;
                return false;
            }
        });
        return path;
    };

    buildStruct = (screen) => {
        let breadcrumb = [];
        if(!_.isEmpty(screen) && !_.isUndefined(screen[this.pathName])) {
            let current_path = screen[this.pathName].title;
            let parent = _.isEmpty(screen[this.pathName].parent) ? null : screen[this.pathName].parent;
            while (parent !== null) {
                if (!_.isEmpty(screen[parent])) {
                    breadcrumb.push({
                        title: screen[parent].title,
                        path: this.getPathByRoute(screen[parent].route),
                    });
                    parent = _.isEmpty(screen[parent].parent) ? null : screen[parent].parent;
                }
            }
            this.setState({breadcrumb: breadcrumb.reverse(), current: current_path});
        }
    };

    render() {
        return (
            <ol className="breadcrumb float-sm-right">
                {this.state.breadcrumb.map( (element, index) => (
                    <li className="breadcrumb-item" key={index}><a href={generatePath(element.path, element.params)}>{element.title}</a></li>
                ))}
                <li className="breadcrumb-item active">{this.state.current}</li>
            </ol>
        );
    }
}

export default withRouter(Breadcrumbs);
