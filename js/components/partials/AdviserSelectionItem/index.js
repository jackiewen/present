import React from 'react';
import AdviserItemWrapper from '../AdviserItemWrapper';
import ReasonMemo from './ReasonMemo';

export default function AdviserSelectionItem(props) {
    return (
        <AdviserItemWrapper {...props}>
            <div>
                {trans('main.INFO_PRPOINT')}：<br/>
                {props.adviser.pr_point}
            </div>
            <ReasonMemo 
                id={props.id} 
                choose_reason={props.choose_reason} 
                memo={props.memo} 
                adviserSelectedErrors={props.adviserSelectedErrors} 
            />
        </AdviserItemWrapper>
    );

}
