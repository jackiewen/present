import React, { Component } from 'react';
import * as Admin from '../../../components/admin';
import { getTitlePage, getPath } from '../../../helpers';
import { generatePath } from 'react-router-dom';
import {
    ADMIN_LIST_ADVISER_SELECTION_PATH,
    ADMIN_DETAIL_ADVISER_SELECTION_PATH,
    ADMIN_CHOOSE_ADVISER_SELECTION_PATH
} from '../../../constants/path';
import {
    ROOT_URL,
    ADMIN_DETAIL_ADVISER_SELECTION_ENDPOINT,
    ADMIN_SELECTED_ADVISER_SELECTION_ENDPOINT,
    ADMIN_ADVISER_SELECTION_CHANGE_PIC_ENDPOINT,
    ADMIN_ADVISER_SELECTION_CONFIRM_SEND_ENDPOINT,
    ADMIN_ADVISER_SELECTION_SAVE_ADVISER_ENDPOINT,
    ADMIN_FOR_SELECT
} from '../../../constants/endpoint';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import { openModal } from '../../../actions/modal';
import * as SSA from '../../../actions/selected_selection_adviser';
import { showToast } from "../../../actions/toast";
import { ConfirmDeleteModal } from '../../../components/partials/modals';

const browserHistory = createBrowserHistory();
const queryString = require('query-string');

const URL_SEARCH = ROOT_URL + ADMIN_SELECTED_ADVISER_SELECTION_ENDPOINT;

class DetailAdviserSelectionContainer extends Component {

    state = {
        list_race_users: [],
        adviserSelectedErrors: {}
    };

    confirm_message = trans('main.INFO_CHANGE_PIC_CONFIRM', {'attribute': trans('main.INFO_LBL_SELECTION_REQUEST')});
    confirm_title = trans('main.INFO_CHANGE_PIC', {'attribute': trans('main.INFO_LBL_SELECTION_REQUEST')});
    admin = {};

    base_path = generatePath(getPath(ADMIN_DETAIL_ADVISER_SELECTION_PATH), {id: this.props.match.params.id});
    detail_url = generatePath(ADMIN_DETAIL_ADVISER_SELECTION_ENDPOINT, {id: this.props.match.params.id});
    change_pic_url = generatePath(ADMIN_ADVISER_SELECTION_CHANGE_PIC_ENDPOINT, {id: this.props.match.params.id});
    confirm_send_url = generatePath(ADMIN_ADVISER_SELECTION_CONFIRM_SEND_ENDPOINT, {id: this.props.match.params.id});
    save_adivser_url = generatePath(ADMIN_ADVISER_SELECTION_SAVE_ADVISER_ENDPOINT, {id: this.props.match.params.id});
    selected_url = generatePath(URL_SEARCH, {id: this.props.match.params.id});

    params = queryString.parse(this.props.location.search);
    isFetching = false;
    isChanging = false;
    setValidator = null;

    componentDidMount() {
        document.title = getTitlePage(trans('main.SCN_ADVISER_SELECTION_DETAIL'));

        const requestDetail = axios.get(this.detail_url);
        const requestSelected = axios.get(this.selected_url, {params: this.params});
        const requestListRaceUsers = axios.get(ADMIN_FOR_SELECT);
        axios.all([requestDetail, requestSelected, requestListRaceUsers]).then(axios.spread((...responses) => {
            const responseDetail = responses[0];
            const responseSelected = responses[1];
            const responseListRaceUsers = responses[2];
            if (_.isEmpty(responseDetail.data.data)) {
                this.props.history.push(getPath(ADMIN_LIST_ADVISER_SELECTION_PATH));
            }
            this.setState({
                list_race_users: responseListRaceUsers.data,
            }, () => {
                if (this.props.selectedSelectionAdivser.first_load) {
                    this.props.initSSA(responseDetail.data.data, responseSelected.data.data);
                }
            })
        })).catch(errors => {
        });

    }

    showAskAdviserModal = (data) => {
        this.props.openModal({ name: 'AskAdviserModal', data: data});
    }

    handleClickSearch = () => {
        this.setStateTextChange();
        this.props.history.push(generatePath(getPath(ADMIN_CHOOSE_ADVISER_SELECTION_PATH), {id: this.props.match.params.id}));
    }

    validateForm = () =>
    {
        let rules = {};
        let messages = {};

        if (this.props.selectedSelectionAdivser?.data) {
            this.props.selectedSelectionAdivser?.data.map(item => {
                rules["choose_reason[" + item.id + "]"] = { required: true }
                rules["memo[" + item.id + "]"] = { required: true }
                messages["choose_reason[" + item.id + "]"] = {
                    required: trans('main.EVAL_REQUIRED', {'attribute': trans('main.INFO_LBL_REASON')})
                }
                messages["memo[" + item.id + "]"] = {
                    required: trans('main.EVAL_REQUIRED', {'attribute': trans('main.INFO_LBL_MEMO')})
                }
            });
        }

        this.setValidator = $('.selected-form').validate({
            rules: rules,
            messages: messages,
            invalidHandler: (event, validator) => {
                this.setState({
                    adviserSelectedErrors: validator.errorMap
                });
            },
            errorPlacement: (error, element) => {

            },
        });
    };

    handleClickTemporarySave = () => {
        if(this.setValidator !== null){
            this.setValidator.destroy();
        }
        this.validateForm();
        let valid = $('.selected-form').valid();
        if(!valid) {
            return false;
        }
        let list_selected = this.props.selectedSelectionAdivser.data || [];
        list_selected = this.getStateTextChange(list_selected);

        axios.post(this.save_adivser_url, {list_selected: list_selected})
        .then(json => {
            if (json.data?.flg == 1) {
                this.setState({
                    adviserSelectedErrors: {},
                }, () => {
                    this.props.showToast({type: 'success', message: trans('main.INFO_UPDATE_SUCCESS')});
                    this.props.setSSA(json.data?.data?.data || []);
                });
            } else {
                this.setState({
                    adviserSelectedErrors: {},
                }, () => {
                    this.props.showToast({type: 'error', message: trans('main.ESYS_0002')});
                });
            }

        })
        .catch(err => {
            this.setState({
                adviserSelectedErrors: {},
            }, () => {
                this.props.showToast({type: 'error', message: trans('main.ESYS_0002')});
            });
        })
    }

    handleClickConfirmSend = () => {
        if(this.setValidator !== null){
            this.setValidator.destroy();
        }
        this.validateForm();
        let valid = $('.selected-form').valid();
        if(!valid) {
            return false;
        }
        let list_selected = this.props.selectedSelectionAdivser.data || [];
        list_selected = this.getStateTextChange(list_selected);

        axios.post(this.confirm_send_url, {list_selected: list_selected})
        .then(json => {
            if (json.data?.flg == 1) {
                this.setState({
                    adviserSelectedErrors: {},
                }, () => {
                    this.props.showToast({type: 'success', message: trans('main.INFO_UPDATE_SUCCESS')});
                    this.props.changeInfoSSA({publish_status_code: 1});
                    this.props.setSSA(json.data?.data?.data || []);
                });
            } else {
                this.setState({
                    adviserSelectedErrors: {},
                }, () => {
                    this.props.showToast({type: 'error', message: trans('main.ESYS_0002')});
                });
            }
            
        })
        .catch(err => {
            this.setState({
                adviserSelectedErrors: {},
            }, () => {
                this.props.showToast({type: 'error', message: trans('main.ESYS_0002')});
            });
        })
    }

    handleDeleteSelection = (adviserId) => {
        this.props.removeSSA(adviserId);
    }

    getNameRaceUserById = (id) => {
        let rs = '';
        this.state.list_race_users.forEach(function (element) {
            if (parseInt(element.value) === parseInt(id)) {
                rs = element.label;
            }
        });
        return rs;
    }

    handleOpenChangeRaceUser = (selectedData) => {
        $('#ConfirmDeleteModal').modal('show');
        this.admin = selectedData;
    }

    handleChangeRaceUser = () => {
        let value = this.admin.value;
        if (!this.isChanging) {
            this.isChanging = true;
            axios.post(this.change_pic_url, {race_users_id: value})
            .then(json => {
                this.isChanging = false;
                if (json.data.flg == 1) {
                    this.props.showToast({type: 'success', message: trans('main.MSG_CHANGE_PIC_COMPLETE')});
                    this.props.changeInfoSSA({admin_id: value});
                } else {
                    this.props.showToast({type: 'error', message: trans('main.ESYS_0002')});
                }
            })
            .catch(err => {
                this.isChanging = false;
                let msg = err.response.data?.errors?.race_users_id ? err.response.data.errors.race_users_id : err.message;
                this.props.showToast({type: 'error', message: trans('main.ESYS_0002')});
            })
        }
    }

    setStateTextChange = () => {
        let list_selected = this.props.selectedSelectionAdivser.data || [];
        list_selected = this.getStateTextChange(list_selected);
        this.props.setSSA(list_selected);
    }

    getStateTextChange = (list_selected) => {
        list_selected.forEach((item) => {
            item.choose_reason = $('textarea[name="choose_reason[' + item.id + ']"]').val();
            item.memo = $('textarea[name="memo[' + item.id + ']"]').val();
        });
        return list_selected;
    }

    render() {
        return (
            <React.Fragment>
            <Admin.DetailAdviserSelection
                adviserSelection={this.props.selectedSelectionAdivser.info || {}}
                listSelected={this.props.selectedSelectionAdivser.data || []}
                listRaceUsers={this.state.list_race_users || []}
                showAskAdviserModal={this.showAskAdviserModal}
                getNameRaceUserById={this.getNameRaceUserById}
                handlePaginationLength={this.handlePaginationLength}
                handlePageClick={this.handlePageClick}
                race_admin={this.state.race_admin}
                handleChangeRaceUser={this.handleOpenChangeRaceUser}
                perPage={this.params.per_page}
                handleDeleteSelection={this.handleDeleteSelection}
                handleClickSearch={this.handleClickSearch}
                handleClickTemporarySave={this.handleClickTemporarySave}
                handleClickConfirmSend={this.handleClickConfirmSend}
                adviserSelectedErrors={this.state.adviserSelectedErrors || {}}
            />
            <ConfirmDeleteModal confirm_message={this.confirm_message} confirm_title={this.confirm_title} handleDeleteAction={this.handleChangeRaceUser}/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    const { selectedSelectionAdivser } = state;
    return {
        selectedSelectionAdivser
    };
}

const mapDispatchToProps = dispatch => ({
    openModal: (data) => dispatch(openModal(data)),
    initSSA: (info, data) => dispatch(SSA.init(info, data)),
    setSSA: (data) => dispatch(SSA.set(data)),
    changeInfoSSA: (item) => dispatch(SSA.changeInfo(item)),
    addSSA: (data) => dispatch(SSA.add(data)),
    removeSSA: (data) => dispatch(SSA.remove(data)),
    clearSSA: (data) => dispatch(SSA.clear(data)),
    showToast: (data) => dispatch(showToast(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailAdviserSelectionContainer);
