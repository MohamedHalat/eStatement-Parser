"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultEditorAggParams = DefaultEditorAggParams;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _useUnmount = _interopRequireDefault(require("react-use/lib/useUnmount"));

var _agg_types = require("ui/agg_types/");

var _agg_select = require("./agg_select");

var _agg_param = require("./agg_param");

var _agg_params_helper = require("./agg_params_helper");

var _agg_params_state = require("./agg_params_state");

var _editor_config_providers = require("../../config/editor_config_providers");

var _agg_groups = require("../agg_groups");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var FIXED_VALUE_PROP = 'fixedValue';
var DEFAULT_PROP = 'default';

function DefaultEditorAggParams(_ref) {
  var agg = _ref.agg,
      aggError = _ref.aggError,
      _ref$aggIndex = _ref.aggIndex,
      aggIndex = _ref$aggIndex === void 0 ? 0 : _ref$aggIndex,
      _ref$aggIsTooLow = _ref.aggIsTooLow,
      aggIsTooLow = _ref$aggIsTooLow === void 0 ? false : _ref$aggIsTooLow,
      className = _ref.className,
      disabledParams = _ref.disabledParams,
      groupName = _ref.groupName,
      formIsTouched = _ref.formIsTouched,
      indexPattern = _ref.indexPattern,
      metricAggs = _ref.metricAggs,
      _ref$state = _ref.state,
      state = _ref$state === void 0 ? {} : _ref$state,
      onAggParamsChange = _ref.onAggParamsChange,
      onAggTypeChange = _ref.onAggTypeChange,
      setTouched = _ref.setTouched,
      setValidity = _ref.setValidity;
  var groupedAggTypeOptions = (0, _agg_params_helper.getAggTypeOptions)(agg, indexPattern, groupName);
  var errors = (0, _agg_params_helper.getError)(agg, aggIsTooLow);
  var editorConfig = (0, _react.useMemo)(function () {
    return _editor_config_providers.editorConfigProviders.getConfigForAgg(_agg_types.aggTypes[groupName], indexPattern, agg);
  }, [groupName, agg.type]);
  var params = (0, _agg_params_helper.getAggParamsToRender)({
    agg: agg,
    editorConfig: editorConfig,
    metricAggs: metricAggs,
    state: state
  });
  var allParams = [].concat(_toConsumableArray(params.basic), _toConsumableArray(params.advanced));

  var _useReducer = (0, _react.useReducer)(_agg_params_state.aggParamsReducer, allParams, _agg_params_state.initAggParamsState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      paramsState = _useReducer2[0],
      onChangeParamsState = _useReducer2[1];

  var _useReducer3 = (0, _react.useReducer)(_agg_params_state.aggTypeReducer, {
    touched: false,
    valid: true
  }),
      _useReducer4 = _slicedToArray(_useReducer3, 2),
      aggType = _useReducer4[0],
      onChangeAggType = _useReducer4[1];

  var isFormValid = !errors.length && aggType.valid && Object.entries(paramsState).every(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        paramState = _ref3[1];

    return paramState.valid;
  });
  var isAllInvalidParamsTouched = !!errors.length || (0, _agg_params_helper.isInvalidParamsTouched)(agg.type, aggType, paramsState); // reset validity before component destroyed

  (0, _useUnmount.default)(function () {
    return setValidity(true);
  });
  (0, _react.useEffect)(function () {
    Object.entries(editorConfig).forEach(function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 2),
          param = _ref5[0],
          paramConfig = _ref5[1];

      var paramOptions = agg.type.params.find(function (paramOption) {
        return paramOption.name === param;
      });
      var hasFixedValue = paramConfig.hasOwnProperty(FIXED_VALUE_PROP);
      var hasDefault = paramConfig.hasOwnProperty(DEFAULT_PROP); // If the parameter has a fixed value in the config, set this value.
      // Also for all supported configs we should freeze the editor for this param.

      if (hasFixedValue || hasDefault) {
        var newValue;
        var property = FIXED_VALUE_PROP;
        var typedParamConfig = paramConfig;

        if (hasDefault) {
          property = DEFAULT_PROP;
          typedParamConfig = paramConfig;
        }

        if (paramOptions && paramOptions.deserialize) {
          newValue = paramOptions.deserialize(typedParamConfig[property]);
        } else {
          newValue = typedParamConfig[property];
        }

        onAggParamsChange(agg.params, param, newValue);
      }
    });
  }, [editorConfig]);
  (0, _react.useEffect)(function () {
    setTouched(false);
  }, [agg.type]);
  (0, _react.useEffect)(function () {
    setValidity(isFormValid);
  }, [isFormValid, agg.type]);
  (0, _react.useEffect)(function () {
    // when all invalid controls were touched or they are untouched
    setTouched(isAllInvalidParamsTouched);
  }, [isAllInvalidParamsTouched]);

  var renderParam = function renderParam(paramInstance, model) {
    return _react.default.createElement(_agg_param.DefaultEditorAggParam, _extends({
      key: "".concat(paramInstance.aggParam.name).concat(agg.type ? agg.type.name : ''),
      disabled: disabledParams && disabledParams.includes(paramInstance.aggParam.name),
      showValidation: formIsTouched || model.touched,
      onChange: onAggParamsChange,
      setValidity: function setValidity(valid) {
        onChangeParamsState({
          type: _agg_params_state.AGG_PARAMS_ACTION_KEYS.VALID,
          paramName: paramInstance.aggParam.name,
          payload: valid
        });
      } // setTouched can be called from sub-agg which passes a parameter
      ,
      setTouched: function setTouched() {
        var isTouched = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        onChangeParamsState({
          type: _agg_params_state.AGG_PARAMS_ACTION_KEYS.TOUCHED,
          paramName: paramInstance.aggParam.name,
          payload: isTouched
        });
      },
      subAggParams: {
        onAggParamsChange: onAggParamsChange,
        onAggTypeChange: onAggTypeChange,
        formIsTouched: formIsTouched
      }
    }, paramInstance));
  };

  return _react.default.createElement(_eui.EuiForm, {
    className: className,
    isInvalid: !!errors.length,
    error: errors,
    "data-test-subj": "visAggEditorParams"
  }, _react.default.createElement(_agg_select.DefaultEditorAggSelect, {
    aggError: aggError,
    id: agg.id,
    indexPattern: indexPattern,
    value: agg.type,
    aggTypeOptions: groupedAggTypeOptions,
    isSubAggregation: aggIndex >= 1 && groupName === _agg_groups.AggGroupNames.Buckets,
    showValidation: formIsTouched || aggType.touched,
    setValue: function setValue(value) {
      onAggTypeChange(agg, value); // reset touched and valid of params

      onChangeParamsState({
        type: _agg_params_state.AGG_PARAMS_ACTION_KEYS.RESET
      });
    },
    setTouched: function setTouched() {
      return onChangeAggType({
        type: _agg_params_state.AGG_TYPE_ACTION_KEYS.TOUCHED,
        payload: true
      });
    },
    setValidity: function setValidity(valid) {
      return onChangeAggType({
        type: _agg_params_state.AGG_TYPE_ACTION_KEYS.VALID,
        payload: valid
      });
    }
  }), params.basic.map(function (param) {
    var model = paramsState[param.aggParam.name] || {
      touched: false,
      valid: true
    };
    return renderParam(param, model);
  }), params.advanced.length ? _react.default.createElement(_eui.EuiFormRow, null, _react.default.createElement(_eui.EuiAccordion, {
    id: "advancedAccordion",
    "data-test-subj": "advancedParams-".concat(agg.id),
    buttonContent: _i18n.i18n.translate('common.ui.vis.editors.advancedToggle.advancedLinkLabel', {
      defaultMessage: 'Advanced'
    })
  }, _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), params.advanced.map(function (param) {
    var model = paramsState[param.aggParam.name] || {
      touched: false,
      valid: true
    };
    return renderParam(param, model);
  }))) : null);
}