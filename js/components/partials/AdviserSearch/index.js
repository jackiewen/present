import React, { useState, useEffect, useRef, useCallback } from 'react';
import AsyncSelectComponent from '../AsyncSelect';
import { getEndpointByUserType } from '../../../helpers';
import { SEARCH_OPTIONS_ENDPOINT } from '../../../constants/endpoint';
import Select from 'react-select';
import './adviserSearch.css';
import { getConfig } from '../../../helpers';

// let optionLoaded = false;
export default function AdviserSearch(props) {
    // const optHPEndpoint = getEndpointByUserType(SEARCH_OPTIONS_ENDPOINT, {type: 'highest-position'});
    const optSFLEndpoint = getEndpointByUserType(SEARCH_OPTIONS_ENDPOINT, {type: 'special-field-large'});
    const optSFSEndpoint = getEndpointByUserType(SEARCH_OPTIONS_ENDPOINT, {type: 'special-field-small'});

    const optCPEndpoint = getEndpointByUserType(SEARCH_OPTIONS_ENDPOINT, {type: 'connection-position'});
    const optCIEndpoint = getEndpointByUserType(SEARCH_OPTIONS_ENDPOINT, {type: 'company-industry'});
    const optLangEndpoint = getEndpointByUserType(SEARCH_OPTIONS_ENDPOINT, {type: 'language'});
    const optQTEndpoint = getEndpointByUserType(SEARCH_OPTIONS_ENDPOINT, {type: 'qualification-type'});
    const optQEndpoint = getEndpointByUserType(SEARCH_OPTIONS_ENDPOINT, {type: 'qualification'});

    const optRREndpoint = getEndpointByUserType(SEARCH_OPTIONS_ENDPOINT, {type: 'relocation-region'});
    const optRAEndpoint = getEndpointByUserType(SEARCH_OPTIONS_ENDPOINT, {type: 'relocation-area'});

    const keywordInput = useRef(null);

    const [params, setParams] = useState(props.params);
    const [optionLoaded, setOptionLoaded] = useState(props.optionLoaded);
    const [options, setOptions] = useState();

    const rankList = [
        {rank_code: 'vip', rank: 'VIP'},
        {rank_code: 'ip', rank: 'IP'},
        {rank_code: 'no_rank', rank: 'ランクなし'},
    ];

    // const ageList = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const ageList = [
        {label: '10代', value: '10'}, {label: '20代', value: '20'}, {label: '30代', value: '30'}, {label: '40代', value: '40'}, {label: '50代', value: '50'},
        {label: '60代', value: '60'}, {label: '70代', value: '70'}, {label: '80代', value: '80'}, {label: '90代', value: '90'}, {label: '100代', value: '100'}
    ];

    const defaultItemLanguage = {
        language: [''],
        language_level: ['']
    }

    const defaultItemQualification = {
        qualification_type: [''],
        qualification: ['']
    }

    const defaultItemRelocation = {
        relocation_region: [''],
        relocation_area: [''],
        relocation_period: ['']
    }

    useEffect(() => {
        let defaultParams = {};
        let setDefaultFlg = false;

        if (!params.language || params.language.length == 0) {
            setDefaultFlg = true;
            defaultParams = {...defaultItemLanguage};
        }
        if (!params.qualification_type || params.qualification_type.length == 0) {
            setDefaultFlg = true;
            defaultParams = {...defaultItemQualification};
        }
        if (!params.relocation_region || params.relocation_region.length == 0) {
            setDefaultFlg = true;
            defaultParams = {...defaultItemRelocation};
        }

        if (setDefaultFlg) {
            setParams({...params, ...defaultParams});
        }

        if (!_.isEmpty(props.optionsAdviserSearch) && !optionLoaded) {
            setOptionLoaded(true);
            setOptions(props.optionsAdviserSearch);
        }
    });

    useEffect(() => {
        const sections = [
            'profileSearchSection',
            'personalSearchSection',
            'experienceSearchSection',
            'orderSearchSection'
        ];

        const addSection = {
            profileSearchSection: [
                // 'highest_position',
                'special_field_large',
                'special_field_small',
                'language[0]',
                'language_level[0]',
                'qualification_type[0]',
                'qualification[0]',
                'relocation_region[0]',
                'relocation_area[0]'
            ],
            personalSearchSection: ['connection_position'],
            experienceSearchSection: ['company_industry', 'listed_code[0]'],
            orderSearchSection: []
        };

        keywordInput.current.focus();

        let openContainer = false;
        sections.map(item => {
            if (checkOpenSection(item, addSection[item])) {
                openContainer = true;
                openSection(item);
            }
        });
        if (openContainer) {
            openSection('containerSearchSection');
        }
    }, []);

    const checkOpenSection = (idSection, addition = []) => {
        let els = $('#' + idSection).find('input, select, textarea');
        let result = false;
        els.map((index, el) => {
            let name = el.name;
            if (name && checkOpen(name)) {
                result = true;
            }
        });
        addition.map(name => {
            if (checkOpen(name)) {
                result = true;
            }
        });
        return result;
    }

    const checkOpen = (name) => {
        let result = false;
        let arrRegex = /([a-zA-Z_\d]+)\[(\d)\]/;
        let matchName = name.match(arrRegex);
        if (matchName) {
            name = matchName[1];
            let tmpValue = [];
            if (params[name]) {
                tmpValue = params[name].filter(item => item);
            }
            if (!_.isEmpty(tmpValue)) result = true;
        } else {
            if (params[name] && !_.isEmpty(params[name])) result = true;
        }
        return result;
    }

    const openSection = (idSection) => {
        $('#' + idSection).removeClass('collapsed-card');
        $('#' + idSection + ' > .card-header:first-child').find('.card-tools .btn i').removeClass('fa-plus').addClass('fa-minus');
    }

    const handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        let value = target.value;
        const elType = target.type;
        
        if (value !== "" && target.dataset && target.dataset.check && target.dataset.check === 'number-positive') {
            let numberPosRegex = /^[0-9]*$/;
            if (!value.match(numberPosRegex)) {
                return false;
            }
            const maxLength = target.maxLength;
            if (value.length > maxLength) {
                return false;
            }
        }

        let arrRegex = /([a-zA-Z_\d]+)\[(\d+)\]/;
        let matchName = name.match(arrRegex);
        if (matchName) {
            let tmpParams = [];
            if (params[matchName[1]]) {
                tmpParams = [...params[matchName[1]]];
            }
            if (elType === 'checkbox') {
                if (target.checked) {
                    tmpParams.push(value);
                } else {
                    tmpParams = tmpParams.filter(item => item !== value);
                }

            } else {
                tmpParams[matchName[2]] = value || '';
            }

            setParams({...params, [matchName[1]]: tmpParams});
        } else {
            if (target.type === 'checkbox') value = target.checked ? 1 : 0;
            setParams({...params, [name]: value});
        }

    }

    const handleAddItemSearch = (type, index) => {
        const limitAddConfig = getConfig('limitAddItemSearch');
        let limitAdd = limitAddConfig['default'];
        if (limitAddConfig[type]) {
            limitAdd = limitAddConfig[type];
        }
        
        let keyParams = [];
        if (type == 'language') {
            keyParams = Object.keys(defaultItemLanguage);
        } else if (type == 'qualification') {
            keyParams = Object.keys(defaultItemQualification);
        } else if (type == 'relocation') {
            keyParams = Object.keys(defaultItemRelocation);
        }
        const oldParams = {...params};
        // const pIndex = index + 1;
        keyParams.map(pkey => {
            // oldParams[pkey].splice(pIndex, 0, '');
            if (oldParams[pkey].length < limitAdd) {
                oldParams[pkey].push('');
            }
        });
        setParams({...oldParams});
    }

    const handleRemoveItemSearch = (type, index) => {
        let keyParams = [];
        if (type == 'language') {
            keyParams = Object.keys(defaultItemLanguage);
        } else if (type == 'qualification') {
            keyParams = Object.keys(defaultItemQualification);
        } else if (type == 'relocation') {
            keyParams = Object.keys(defaultItemRelocation);
        }
        const oldParams = {...params};
        keyParams.map(pkey => {
            oldParams[pkey].splice(index, 1);
        });
        setParams({...oldParams});
    }

    const handleReset = () => {
        setParams({});
    }

    const getSelectedItem = (selectedVal, list) => {

        if (!selectedVal) return '';
        if (_.isObject(selectedVal)) return selectedVal;
        if (_.isEmpty(list)) return '';
        let data = list.find(item => item.value == selectedVal);
        if (!data) return '';
        return data;
    }

    const handleSelectChange = (selected, attr) => {
        let newParamState = {...params, [attr.name]: selected || ''};
        let arrRegex = /([a-zA-Z_\d]+)\[(\d)\]/;
        let matchName = attr.name.match(arrRegex);

        if (attr.name === 'special_field_large') {
            newParamState = {...newParamState, special_field_small: ''};
            reloadOption(optSFSEndpoint, 'special_field_small', {special_field_large: selected?.value || ''});
        } else if (matchName) {
            let tmpParams = [];
            if (params[matchName[1]]) {
                tmpParams = [...params[matchName[1]]];
            }
            tmpParams[matchName[2]] = selected?.value || '';
            newParamState = {...params, [matchName[1]]: tmpParams};
            if (matchName[1] === 'language' && !tmpParams[matchName[2]]) {
                let tmpLanguageLevel = [];
                if (params['language_level']) {
                    tmpLanguageLevel = [...params['language_level']];
                }
                tmpLanguageLevel[matchName[2]] = '';
                newParamState = {...newParamState, language_level: tmpLanguageLevel};
            } else if (matchName[1] === 'qualification_type') {
                if (newParamState['qualification']) {
                    newParamState['qualification'][matchName[2]] = '';
                }
                reloadOption(optQEndpoint, 'qualification', {qualification_type: selected?.value || ''}, matchName[2]);
            } else if (matchName[1] === 'relocation_region') {
                if (newParamState['relocation_area']) {
                    newParamState['relocation_area'][matchName[2]] = '';
                }

                let tmpPeriod = [];
                if (params['relocation_period']) {
                    tmpPeriod = [...params['relocation_period']];
                }
                tmpPeriod[matchName[2]] = '';
                newParamState = {...newParamState, relocation_period: tmpPeriod};

                reloadOption(optRAEndpoint, 'relocation_area', {relocation_region: selected?.value || ''}, matchName[2]);
            }
        }

        setParams(newParamState);
    }

    const reloadOption = (url, keyLoad, selectedVal, index = null) => {
        axios.get(url, {params: selectedVal})
        .then(json => {
            if (index !== null) {

                let data = [];
                if (options[keyLoad]) {
                    data = [...options[keyLoad]];
                }
                data[index] = json.data;
                setOptions({...options, [keyLoad]: data});
            } else {
                setOptions({...options, [keyLoad]: json.data});
            }

        });
    }

    const getSelectedValue = (id, list = []) => {
        let rs = '';
        list.forEach( element => {
            if (String(element?.value) === String(id)) {
                rs = element;
            }
        });
        return rs;
    };

    const handleChangeSelect = (selected, attr) => {
        const name = attr.name;
        let arrRegex = /([a-zA-Z_\d]+)\[(\d+)\]/;
        let matchName = name.match(arrRegex);
        if (matchName) {
            let tmpParams = [];
            if (params[matchName[1]]) {
                tmpParams = [...params[matchName[1]]];
            }
            tmpParams[matchName[2]] = selected?.value || '';
            setParams({...params, [matchName[1]]: tmpParams});
        } else {
            let value = selected?.value || '';
            setParams({...params, [name]: value});
        }
    };

    return (
        <form id="adviserSearchForm">
            <div className="row">
                <div className="col-xl-6 col-md-5">
                    <div className="form-group">
                        <input type="text" className="form-control form-control-lg" placeholder="キーワード"
                            name="keyword" value={params.keyword || ''}
                            onChange={handleChange}
                            ref={ keywordInput }
                        />
                    </div>
                </div>
                <div className="col-md-2 offset-md-3 offset-xl-2">
                    <div className="form-group">
                        <button type="button" className="btn btn-primary btn-block btn-lg" onClick={() => props.handleSearch(params)}>
                            <i className="fa fa-search" />
                        </button>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group">
                        <button type="button" className="btn btn-secondary btn-block btn-lg" onClick={handleReset}>
                            <i className="fas fa-eraser" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div id="containerSearchSection" className="card card-primary card-outline collapsed-card"> {/*collapsed-card*/}
                        <div className="card-header">
                            <h3 className="card-title">詳細検索</h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                    <i className="fas fa-plus" />
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            {/* Profile Section */}
                            <div className="card shadow-none collapsed-card" id="profileSearchSection"> {/*collapsed-card*/}
                                <div className="card-header">
                                    <h3 className="card-title">プロフィール</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                            <i className="fas fa-plus" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        {/*<div className="col-md-6">*/}
                                        {/*    <div className="form-group">*/}
                                        {/*        <label>最高役職</label>*/}
                                        {/*        {options?.highest_position &&*/}
                                        {/*            <AsyncSelectComponent*/}
                                        {/*                name="highest_position"*/}
                                        {/*                url={optHPEndpoint}*/}
                                        {/*                handleChangeSelect={handleSelectChange}*/}
                                        {/*                value={getSelectedItem(params.highest_position, options.highest_position)}*/}
                                        {/*                defaultOptions={options.highest_position}*/}
                                        {/*            />*/}
                                        {/*        }*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>所属団体名</label>
                                                <input name="group_name" className="form-control"
                                                    onChange={handleChange}
                                                    value={params.group_name || ''}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 col-xl-3">
                                            <div className="form-group">
                                                <label>得意分野</label>
                                                {options?.special_field_large &&
                                                    <AsyncSelectComponent
                                                        name="special_field_large"
                                                        url={optSFLEndpoint}
                                                        handleChangeSelect={handleSelectChange}
                                                        value={getSelectedItem(params.special_field_large, options.special_field_large)}
                                                        defaultOptions={options.special_field_large}
                                                    />
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-xl-3">
                                            <div className="form-group">
                                                <label className="d-none d-md-block">&nbsp;</label>
                                                {options?.special_field_small &&
                                                    <AsyncSelectComponent
                                                        name="special_field_small"
                                                        url={optSFSEndpoint}
                                                        handleChangeSelect={handleSelectChange}
                                                        value={getSelectedItem(params.special_field_small, options.special_field_small)}
                                                        defaultOptions={options.special_field_small}
                                                        isDisabled={!params.special_field_large}
                                                    />
                                                }

                                            </div>
                                        </div>
                                        <div className="col-md-12 col-xl-6">
                                            <div className="form-group">
                                                <label>年齢</label>
                                                <div className="group-range">
                                                    <div className="item-range">
                                                        <Select
                                                            className="w-100"
                                                            placeholder={trans('main.INFO_LBL_CHOOSE')}
                                                            name="age_from"
                                                            isClearable={true}
                                                            options={ageList}
                                                            value={getSelectedValue(params.age_from, ageList)}
                                                            onChange={handleChangeSelect}
                                                        />
                                                    </div>
                                                    <div className="addon" style={{lineHeight: 36 + 'px'}}>〜</div>
                                                    <div className="item-range">
                                                        <Select
                                                            className="w-100"
                                                            placeholder={trans('main.INFO_LBL_CHOOSE')}
                                                            name="age_to"
                                                            isClearable={true}
                                                            options={ageList}
                                                            value={getSelectedValue(params.age_to, ageList)}
                                                            onChange={handleChangeSelect}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12 col-xl-6">
                                            <div className="row">
                                            {params.language && params.language.map((item, index) => {
                                                return (
                                                    <React.Fragment key={"language_" + index}>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                {index == 0 &&
                                                                    <label>言語</label>
                                                                }
                                                                {options?.language &&
                                                                    <AsyncSelectComponent
                                                                        name={"language[" + index + "]"}
                                                                        url={optLangEndpoint}
                                                                        handleChangeSelect={handleSelectChange}
                                                                        value={getSelectedItem(item, options.language)}
                                                                        defaultOptions={options.language}
                                                                    />
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                {index == 0 &&
                                                                    <label>会話レベル</label>
                                                                }
                                                                <div className="d-flex">
                                                                <Select
                                                                    className="w-100 mr-1"
                                                                    placeholder={trans('main.INFO_LBL_CHOOSE')}
                                                                    name={"language_level[" + index + "]"}
                                                                    isClearable={true}
                                                                    options={options?.language_level}
                                                                    value={
                                                                        params?.language_level && params?.language_level[index]
                                                                            ? getSelectedValue(params.language_level[index], options?.language_level)  : ''
                                                                    }
                                                                    isDisabled={!item}
                                                                    onChange={handleChangeSelect}
                                                                />
                                                                {index == 0 &&
                                                                    <button type="button" className="btn btn-success" onClick={() => handleAddItemSearch('language', index)}>
                                                                        <i className="fa fa-plus"/>
                                                                    </button>
                                                                }
                                                                {index != 0 &&
                                                                    <button type="button" className="btn btn-danger" onClick={() => handleRemoveItemSearch('language', index)}>
                                                                        <i className="fa fa-trash" />
                                                                    </button>
                                                                }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </React.Fragment>
                                                )
                                            })}
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-xl-6">
                                            <div className="row">
                                            {params.qualification_type && params.qualification_type.map((item, index) => {
                                                return (
                                                    <React.Fragment key={"qualification_" + index}>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                {index == 0 &&
                                                                    <label>資格</label>
                                                                }
                                                                {options?.qualification_type &&
                                                                    <AsyncSelectComponent
                                                                        name={"qualification_type[" + index + "]"}
                                                                        url={optQTEndpoint}
                                                                        handleChangeSelect={handleSelectChange}
                                                                        value={getSelectedItem(item, options.qualification_type)}
                                                                        defaultOptions={options.qualification_type}
                                                                    />
                                                                }

                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                {index == 0 &&
                                                                    <label className="d-none d-md-block">&nbsp;</label>
                                                                }
                                                                <div className="d-flex">
                                                                {options?.qualification &&
                                                                    <AsyncSelectComponent
                                                                        className="w-100 mr-1"
                                                                        name={"qualification[" + index + "]"}
                                                                        url={optQEndpoint}
                                                                        handleChangeSelect={handleSelectChange}
                                                                        value={getSelectedItem(
                                                                            params?.qualification && params?.qualification[index] ? params.qualification[index] : ''
                                                                            , options.qualification[index])}
                                                                        defaultOptions={
                                                                            options?.qualification
                                                                            && options?.qualification[index]
                                                                            ? options.qualification[index] : []
                                                                        }
                                                                        defaultParams={{qualification_type: params['qualification_type'][index]}}
                                                                        isDisabled={!item}
                                                                    />
                                                                }
                                                                {index == 0 &&
                                                                    <button type="button" className="btn btn-success" onClick={() => handleAddItemSearch('qualification', index)}>
                                                                        <i className="fa fa-plus" />
                                                                    </button>
                                                                }
                                                                {index != 0 &&
                                                                    <button type="button" className="btn btn-danger" onClick={() => handleRemoveItemSearch('qualification', index)}>
                                                                        <i className="fa fa-trash" />
                                                                    </button>
                                                                }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </React.Fragment>
                                                )
                                            })}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        {params.relocation_region && params.relocation_region.map((item, index) => {
                                            return (
                                                <React.Fragment key={"relocation_" + index}>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            {index == 0 &&
                                                                <label>赴任経験</label>
                                                            }
                                                            {options?.relocation_region &&
                                                                <AsyncSelectComponent
                                                                    name={"relocation_region[" + index + "]"}
                                                                    url={optRREndpoint}
                                                                    handleChangeSelect={handleSelectChange}
                                                                    value={getSelectedItem(item, options.relocation_region)}
                                                                    defaultOptions={options.relocation_region}
                                                                />
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            {index == 0 &&
                                                                <label className="d-none d-md-block">&nbsp;</label>
                                                            }
                                                            {options?.relocation_area &&
                                                                <AsyncSelectComponent
                                                                    name={"relocation_area[" + index + "]"}
                                                                    url={optRAEndpoint}
                                                                    handleChangeSelect={handleSelectChange}
                                                                    value={getSelectedItem(
                                                                        params?.relocation_area && params?.relocation_area[index] ? params.relocation_area[index] : ''
                                                                        , options.relocation_area[index])}
                                                                    defaultOptions={
                                                                        options?.relocation_area
                                                                        && options?.relocation_area[index]
                                                                        ? options.relocation_area[index] : []
                                                                    }
                                                                    defaultParams={{relocation_region: params['relocation_region'][index]}}
                                                                    isDisabled={!item}
                                                                />
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            {index == 0 &&
                                                                <label className="d-none d-md-block">&nbsp;</label>
                                                            }
                                                            <div className="d-flex">
                                                            <Select
                                                                className="w-100 mr-1"
                                                                placeholder={trans('main.INFO_LBL_CHOOSE')}
                                                                name={"relocation_period[" + index + "]"}
                                                                isClearable={true}
                                                                options={options?.relocation_period}
                                                                value={
                                                                    params?.relocation_period && params?.relocation_period[index]
                                                                        ? getSelectedValue(params.relocation_period[index], options?.relocation_period)  : ''
                                                                }
                                                                isDisabled={!item}
                                                                onChange={handleChangeSelect}
                                                            />
                                                            {index == 0 &&
                                                                <button type="button" className="btn btn-success" onClick={() => handleAddItemSearch('relocation', index)}>
                                                                    <i className="fa fa-plus"/>
                                                                </button>
                                                            }
                                                            {index != 0 &&
                                                                <button type="button" className="btn btn-danger" onClick={() => handleRemoveItemSearch('relocation', index)}>
                                                                    <i className="fa fa-trash" />
                                                                </button>
                                                            }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>

                            <hr />
                            {/* Personal Connection Section */}
                            <div className="card shadow-none collapsed-card" id="personalSearchSection"> {/*collapsed-card*/}
                                <div className="card-header">
                                    <h3 className="card-title">人脈</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                            <i className="fas fa-plus" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <p>顧問が持つ人脈を所属企業・役職から検索できます。</p>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>所属企業名</label>
                                                <input name="connection_company_name" className="form-control" value={params.connection_company_name || ''} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>役職</label>
                                                {options?.connection_position &&
                                                    <AsyncSelectComponent
                                                        name="connection_position"
                                                        url={optCPEndpoint}
                                                        handleChangeSelect={handleSelectChange}
                                                        value={getSelectedItem(params.connection_position, options.connection_position)}
                                                        defaultOptions={options.connection_position}
                                                    />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr />
                            {/* Experience Section */}
                            <div className="card shadow-none collapsed-card" id="experienceSearchSection"> {/*collapsed-card*/}
                                <div className="card-header">
                                    <h3 className="card-title">経歴</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                            <i className="fas fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">                                                
                                                <div className="icheck-primary d-inline">
                                                    <input type="checkbox" id="chkPrimaryCompany" name="primary_company"
                                                           checked={params.primary_company == 1 ? true : false}
                                                           onChange={handleChange}
                                                    />
                                                    <label htmlFor="chkPrimaryCompany">顧問の最も代表的な経歴企業に絞る</label>
                                                </div>
                                                {/*<label className="mr-3">顧問の最も代表的な経歴企業に絞る</label>*/}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">

                                                <label className="mr-3">上場区分</label><br/>
                                                <div className="row">
                                                {options?.listed && options.listed.map((item, index) => {
                                                    return (
                                                    <div className="form-group col-md-3" key={"listed_" + item.listed_code}>
                                                        <div className={"icheck-primary"}>
                                                            <input type="checkbox" id={"listed_code" + item.listed_code} name={"listed_code[" + index + "]"}
                                                                value={item.listed_code}
                                                                checked={params.listed_code && params.listed_code.includes(item.listed_code.toString()) ? true : false }
                                                                onChange={handleChange}
                                                            />
                                                            <label htmlFor={"listed_code" + item.listed_code}>{item.listed}</label>
                                                        </div>
                                                    </div>
                                                )})}
                                                </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>企業名</label>
                                                <input name="company_name" className="form-control" value={params.company_name || ''} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>企業業界</label>
                                                {/* <AsyncSelectComponent /> */}
                                                {options?.company_industry &&
                                                    <AsyncSelectComponent
                                                        name="company_industry"
                                                        url={optCIEndpoint}
                                                        handleChangeSelect={handleSelectChange}
                                                        value={getSelectedItem(params.company_industry, options.company_industry)}
                                                        defaultOptions={options.company_industry}
                                                    />
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>売上(百円)</label>
                                                <div className="group-range">
                                                    <div className="item-range">
                                                        <input data-check="number-positive" maxLength="20" name="company_sales_from" className="form-control" value={params.company_sales_from || ''} onChange={handleChange} />
                                                    </div>
                                                    <div className="addon">〜</div>
                                                    <div className="item-range">
                                                        <input data-check="number-positive" maxLength="20" name="company_sales_to" className="form-control" value={params.company_sales_to || ''} onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>最終利益(百円)</label>
                                                <div className="group-range">
                                                    <div className="item-range">
                                                        <input data-check="number-positive" maxLength="20" name="company_income_from" className="form-control" value={params.company_income_from || ''} onChange={handleChange} />
                                                    </div>
                                                    <div className="addon">〜</div>
                                                    <div className="item-range">
                                                        <input data-check="number-positive" maxLength="20" name="company_income_to" className="form-control" value={params.company_income_to || ''} onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>従業員数</label>
                                                <div className="group-range">
                                                    <div className="item-range">
                                                        <input data-check="number-positive" maxLength="11" name="employee_num_from" className="form-control" value={params.employee_num_from || ''} onChange={handleChange} />
                                                    </div>
                                                    <div className="addon">〜</div>
                                                    <div className="item-range">
                                                        <input data-check="number-positive" maxLength="11" name="employee_num_to" className="form-control" value={params.employee_num_to || ''} onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr />
                            {/* Order Section */}
                            <div className="card shadow-none collapsed-card" id="orderSearchSection"> {/*collapsed-card*/}
                                <div className="card-header">
                                    <h3 className="card-title">その他</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                            <i className="fas fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="mr-3">顧問区分</label><br/>
                                                {rankList && rankList.map((item, index) => (
                                                    <div className={"icheck-primary d-inline" + (index > 0 ? ' ml-5' : '')} key={"rank_" + item.rank_code}>
                                                        <input type="checkbox" id={"rank_code" + item.rank_code} name={"rank_code[" + index + "]"}
                                                            value={item.rank_code}
                                                            checked={params.rank_code && params.rank_code.includes(item.rank_code) ? true : false }
                                                            onChange={handleChange}
                                                        />
                                                        <label htmlFor={"rank_code" + item.rank_code}>{item.rank}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="mr-3">&nbsp;</label><br/>
                                                <div className="icheck-primary d-inline">
                                                    <input type="checkbox" id="asking_propriety" name="asking_propriety"
                                                        checked={params.asking_propriety == 1 ? true : false}
                                                        onChange={handleChange}
                                                    />
                                                    <label htmlFor="asking_propriety">活動可能な顧問のみ表示する。</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*<div className="row justify-content-end">*/}
            {/*    */}
            {/*</div>*/}
        </form>
    );

}
