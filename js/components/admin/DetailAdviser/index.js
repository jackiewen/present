import React from 'react';
import {
    DetailAdviserItem,
    Contact
} from '../../partials';

export default function DetailAdviser(props) {
    return (
        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 pt-3">
                        <DetailAdviserItem adviser={props.adviser} />
                    </div>
                </div>
            </div>
        </section>
    );

}
