import { combineReducers } from 'redux';
import modal from './modal';
import userLogin from './user_login';
import userLogout from './user_logout';
import adminLogin from './admin_login';
import adminLogout from './admin_logout';
import search from './search';
import selectedSelectionAdivser from './selected_selection_adviser';
import toast from './toast';

export default combineReducers({
    modal,
    userLogin,
    userLogout,
    adminLogin,
    adminLogout,
    search,
    selectedSelectionAdivser,
    toast
});