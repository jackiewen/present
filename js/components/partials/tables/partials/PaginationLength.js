import React from 'react';

export default function PaginationLength(props) {
    return (
        <div className="length">
            <label>
                表示
                <select value={props.selectedValue || 10} onChange={props.handlePaginationLength} className="custom-select custom-select-sm form-control form-control-sm">
                    {props.options && props.options.map((option) => (
                        <option key={"option_length_" + option} value={option}>{option}</option>
                    ))}
                </select>
                件
            </label>
        </div>
    );

}
