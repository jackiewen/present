import React from 'react';
import classNames from 'classnames';

export default function THSort(props) {
    return (
        <th
            className={classNames("sorting", props.name == props.column_sort ? props.type_sort : '', props.class)}
            onClick={() => props.handleSortClick(props.name, props.type_sort)}
            style={Object.assign({}, props.style, {minWidth: 60 + 'px'}) }
        ><span>{props.children}</span></th>
    );

}
