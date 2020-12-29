import React from 'react';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';

class AsyncSelectComponent extends React.Component {
    constructor (props) {
        super (props);
        this.isFetching = false;
        this.load = null;
    }

    fetchingData = (search, callback) => {
        if (!this.isFetching) {
            let paramSearch = {search: search};
            if (this.props.defaultParams) {
                paramSearch = {...paramSearch, ...this.props.defaultParams};
            }
            this.isFetching = true;
            axios.get(this.props.url, {params: paramSearch})
                .then( rs => {
                    callback(rs.data);
                    this.isFetching = false;
                })
                .catch( err => {
                    this.isFetching = false;
                })
        }
    };

    loadOptions = (inputValue, callback) => {
        clearTimeout(this.load);
        this.load = setTimeout(() => {
            this.fetchingData(inputValue, callback);
        }, 2000);
    };

    render() {
        return (
            <AsyncSelect
                className={this.props.className || ''}
                name={this.props.name || null}
                placeholder={this.props.placeholder || trans('main.INFO_LBL_CHOOSE')}
                loadOptions={this.loadOptions}
                defaultOptions={this.props.defaultOptions || true}
                value={this.props.value}
                onChange={this.props.handleChangeSelect}
                isDisabled={this.props.isDisabled || false}
                isClearable={this.props.isClearable === false ? false : true}
                isMulti={this.props.isMulti || false}
                defaultParams={this.props.defaultParams || null}
            />
        );
    }
}

const propTypes = {
    except: PropTypes.array,
};

AsyncSelectComponent.propTypes = propTypes;

export default AsyncSelectComponent;
