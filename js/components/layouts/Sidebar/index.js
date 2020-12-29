import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import logoImage from '../../../../img/gheader_logo_race_01.gif';
import { getUserType } from "../../../helpers";
import { USER_TYPE_ADMIN } from "../../../constants/common";
import { ADMIN_BASE_PATH, USER_BASE_PATH } from "../../../constants/path";

function Sidebar(props) {
    const { items } = props;
    let sidebar = [];
    if(!_.isEmpty(items)){
        items.map(item => {
            if(item.is_sidebar) {
                sidebar.push(item);
            }
        })
    }
    let basePath = getUserType() === USER_TYPE_ADMIN ? ADMIN_BASE_PATH : USER_BASE_PATH;

    const handleClick = (path, e) => {
        if (window.location.pathname === path) {
            e.preventDefault();
        }
    }

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Link to={basePath.path} className="brand-link" >
                <img src={logoImage} alt="Race Logo" className="brand-image img-circle elevation-3"
                    style={{opacity: .8}} />
                <span className="brand-text font-weight-light">頭脳網</span>
            </Link>

            <div className="sidebar">
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        {sidebar && sidebar.map(item => (
                            <li className="nav-item" key={item.route}>
                                <NavLink exact key={"navlink-" + item.route} to={ item.path } className="nav-link"
                                    onClick={(e) => handleClick(item.path, e)}
                                >
                                    <i className={ item.icon } />
                                    <p id={"p-" + item.route.replace('.', '_')}>{ item.title }
                                        {(props.notify && props.notify[item.route] > 0) &&
                                            <span id={"span-" + item.route.replace('.', '_')} className="badge badge-danger right">{props.notify[item.route]}</span>
                                        }
                                    </p>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );

}

const propTypes = {
    items: PropTypes.array.isRequired,
};

Sidebar.propTypes = propTypes;

export default Sidebar;
