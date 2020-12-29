import React from 'react';
import { ROOT_URL } from './../../../constants/endpoint';
import './comments.css';
import { getUserType } from "../../../helpers";

export default function Comment(props) {
    let user_type = getUserType();
    return (
        <div className={(user_type === props.info.type ? "current " : "parent_comment ") + "post clearfix"}>
            <div className="user-block">
                <img className="img-circle img-bordered-sm" src={ ROOT_URL + "/img/user-avatar.jpg"} alt="user image" />
                <span className="username">
                    <a href="#">{props.info.owner}</a>
                </span>
                <span className="description">{ moment(props.info.created_at).format('YYYY/MM/DD  HH:mm:ss')}</span>
            </div>
            <p>
                {props.info.description}
            </p>
        </div>
    );

}
