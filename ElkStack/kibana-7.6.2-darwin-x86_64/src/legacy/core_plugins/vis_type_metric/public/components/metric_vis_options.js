"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricVisOptions = MetricVisOptions;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _components = require("../../../kbn_vislib_vis_types/public/components");

var _collections = require("../../../kbn_vislib_vis_types/public/utils/collections");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function MetricVisOptions(_ref) {
  var stateParams = _ref.stateParams,
      setValue = _ref.setValue,
      setValidity = _ref.setValidity,
      setTouched = _ref.setTouched,
      vis = _ref.vis,
      uiState = _ref.uiState;
  var setMetricValue = (0, _react.useCallback)(function (paramName, value) {
    return setValue('metric', _objectSpread({}, stateParams.metric, _defineProperty({}, paramName, value)));
  }, [setValue, stateParams.metric]);
  var setMetricLabels = (0, _react.useCallback)(function (paramName, value) {
    return setMetricValue('labels', _objectSpread({}, stateParams.metric.labels, _defineProperty({}, paramName, value)));
  }, [setMetricValue, stateParams.metric.labels]);
  var setMetricStyle = (0, _react.useCallback)(function (paramName, value) {
    return setMetricValue('style', _objectSpread({}, stateParams.metric.style, _defineProperty({}, paramName, value)));
  }, [setMetricValue, stateParams.metric.style]);
  var setColorMode = (0, _react.useCallback)(function (id) {
    return setMetricValue('metricColorMode', id);
  }, [setMetricValue]);

  var metricColorModeLabel = _i18n.i18n.translate('visTypeMetric.params.color.useForLabel', {
    defaultMessage: 'Use color for'
  });

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "s"
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "visTypeMetric.params.settingsTitle",
    defaultMessage: "Settings"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_components.SwitchOption, {
    label: _i18n.i18n.translate('visTypeMetric.params.percentageModeLabel', {
      defaultMessage: 'Percentage mode'
    }),
    paramName: "percentageMode",
    value: stateParams.metric.percentageMode,
    setValue: setMetricValue
  }), _react.default.createElement(_components.SwitchOption, {
    label: _i18n.i18n.translate('visTypeMetric.params.showTitleLabel', {
      defaultMessage: 'Show title'
    }),
    paramName: "show",
    value: stateParams.metric.labels.show,
    setValue: setMetricLabels
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "s"
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "visTypeMetric.params.rangesTitle",
    defaultMessage: "Ranges"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_components.ColorRanges, {
    "data-test-subj": "metricColorRange",
    colorsRange: stateParams.metric.colorsRange,
    setValue: setMetricValue,
    setTouched: setTouched,
    setValidity: setValidity
  }), _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    display: "rowCompressed",
    label: metricColorModeLabel
  }, _react.default.createElement(_eui.EuiButtonGroup, {
    buttonSize: "compressed",
    idSelected: stateParams.metric.metricColorMode,
    isDisabled: stateParams.metric.colorsRange.length === 1,
    isFullWidth: true,
    legend: metricColorModeLabel,
    options: vis.type.editorConfig.collections.metricColorMode,
    onChange: setColorMode
  })), _react.default.createElement(_components.ColorSchemaOptions, {
    colorSchema: stateParams.metric.colorSchema,
    colorSchemas: vis.type.editorConfig.collections.colorSchemas,
    disabled: stateParams.metric.colorsRange.length === 1 || stateParams.metric.metricColorMode === _collections.ColorModes.NONE,
    invertColors: stateParams.metric.invertColors,
    setValue: setMetricValue,
    showHelpText: false,
    uiState: uiState
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "s"
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "visTypeMetric.params.style.styleTitle",
    defaultMessage: "Style"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_components.RangeOption, {
    label: _i18n.i18n.translate('visTypeMetric.params.style.fontSizeLabel', {
      defaultMessage: 'Metric font size in points'
    }),
    min: 12,
    max: 120,
    paramName: "fontSize",
    value: stateParams.metric.style.fontSize,
    setValue: setMetricStyle,
    showInput: true,
    showLabels: true,
    showValue: false
  })));
}