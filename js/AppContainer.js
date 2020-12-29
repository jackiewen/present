import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Sidebar, Footer } from './components/layouts';

import { userLogoutIfNeeded } from './actions/user_logout';
import { adminLogoutIfNeeded } from "./actions/admin_logout";

import { USER_TYPE_ADMIN } from "./constants/common";
import { COMMONS_ADMIN_CONFIG, COMMONS_USER_CONFIG, LAST_LOGIN_ENDPOINT } from "./constants/endpoint";

import * as helpers from './helpers';
import Toast from './components/partials/Toast';

class AppContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            receiveDataLogout: {},
            sidebar: {},
            user_info: {},
            notify: {},
        };
        this.isFetching = false;
        this.isFetchingLL = false;
        // helpers.InterceptorsResponse(this.props.history);
    }

    componentDidMount() {
        this.getCommonsConfig();
        this.getLastLogin();
        this.setNotify();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        helpers.initLayout();
    }

    setNotify = () => {
        const notify = localStorage.getItem('notify');
        if (notify) {
            this.setState({
                notify: JSON.parse(notify)
            });
        }
    };

    getLastLogin = () => {
        const lastLogin = localStorage.getItem('last_login');
        if (!lastLogin) {
            if (!this.isFetchingLL) {
                this.isFetchingLL = true;
                const path = helpers.getEndpointByUserType(LAST_LOGIN_ENDPOINT);
                axios.get(path).then(json => {
                    this.isFetchingLL = false;
                    localStorage.setItem('last_login', json.data);
                    this.setState({
                        last_login: json.data
                    });
                }).catch( err => {
                    this.isFetchingLL = false;
                });
            }
        } else {
            this.setState({
                last_login: lastLogin
            });
        }
    }

    getCommonsConfig = () => {
        let config = JSON.parse(localStorage.getItem('config'));
        let user_info = JSON.parse(localStorage.getItem('info'));
        let user_type = localStorage.getItem('user_type');
        let path = user_type === USER_TYPE_ADMIN ? COMMONS_ADMIN_CONFIG : COMMONS_USER_CONFIG;
        if(!this.isFetching && config === null) {
            this.isFetching = true;
            axios.get(path).then(json => {
                localStorage.setItem('config', JSON.stringify(json.data));
                this.setState({
                    sidebar: json.data.sidebar,
                    user_info: user_info
                });
                this.isFetching = false;
            }).catch( err => {
                console.log(err.response);
                this.isFetching = false;
            });
        } else {
            this.setState({sidebar: config.sidebar, user_info: user_info})
        }
    };

    handleChangeUserInfo = (user_info) => {
        this.setState({user_info: user_info});
    };

    handleSubmitLogout = (e) => {
        e.preventDefault();
        let user_type = localStorage.getItem('user_type');
        if(user_type === USER_TYPE_ADMIN) {
            this.props.adminLogoutIfNeeded();
        } else {
            this.props.userLogoutIfNeeded();
        }
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        let user_type = localStorage.getItem('user_type');
        if(user_type === USER_TYPE_ADMIN) {
            if (! _.isEqual(nextProps?.adminLogout?.receiveData, prevState.receiveDataLogout)) {
                if (nextProps?.adminLogout?.receiveData?.status === true) {
                    helpers.setLogout();
                    window.location = helpers.getRedirectLogin(user_type);
                }
                return { receiveDataLogout: nextProps?.adminLogout?.receiveData };
            }
        } else {
            if (!_.isEqual(nextProps?.userLogout?.receiveData, prevState.receiveDataLogout)) {
                if (nextProps?.userLogout?.receiveData?.status === true) {
                    helpers.setLogout();
                    window.location = helpers.getRedirectLogin(user_type);
                }
                return { receiveDataLogout: nextProps?.userLogout?.receiveData };
            }
        }
        return null;
    }

    render() {
        const user_type = localStorage.getItem('user_type');
        const user_info = this.state.user_info;
        const sidebar = this.state.sidebar;
        const last_login = this.state.last_login;
        const notify = this.state.notify;
        const is_admin = (user_type === USER_TYPE_ADMIN);
        return (
            <React.Fragment>
                <Toast />
                <div className="wrapper">
                    <Header
                        is_admin={is_admin}
                        user_info={user_info}
                        handleChangeUserInfo={this.handleChangeUserInfo}
                        handleSubmitLogout={this.handleSubmitLogout}
                        sidebar={sidebar}
                        last_login={last_login}
                    />
                    <Sidebar items={ Object.values(sidebar)} notify={notify} />
                    <div className={this.props.children.props.component.name === 'PageDeveloping' ? "content-wrapper d-flex" : "content-wrapper"}>
                        {this.props.children}
                    </div>
                    <Footer />
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    const { userLogout } = state;
    const { adminLogout } = state;
    return {
        userLogout,
        adminLogout
    };
};

const mapDispatchToProps = dispatch => ({
    userLogoutIfNeeded: (postData) => dispatch(userLogoutIfNeeded(postData)),
    adminLogoutIfNeeded: (postData) => dispatch(adminLogoutIfNeeded(postData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AppContainer));
