import React from 'react';
import AdviserItemWrapper from './../AdviserItemWrapper';
import Reason from './Reason';

export default function AdviserItem(props) {
    return (
        <AdviserItemWrapper {...props}>
            <div>
                {trans('main.INFO_PRPOINT')}：<br/>
                {props.adviser.pr_point}
            </div>
            {props.reason &&
                <Reason reason={props.reason} />
            }
        </AdviserItemWrapper>
    );

}
