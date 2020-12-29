import { transform } from 'lodash';
import React from 'react';

export default function PageLimitRequest(props) {
    return (
        <section className="content" style={{ margin: 'auto' }}>
            <div className="error-page">
                <h2 className="headline text-warning"> 429</h2>

                <div className="error-content">
                    <h3 style={{ paddingTop: '20px' }}><i className="fas fa-exclamation-triangle text-warning"></i> {trans('main.EVAL_LIMIT_REQUEST')}</h3>
                    <p>
                        
                    </p>
                </div>
            </div>
        </section>
    );

}