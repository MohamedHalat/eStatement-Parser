"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RangesPanel = RangesPanel;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _colormaps = require("ui/vislib/components/color/colormaps");

var _common = require("../../common");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function RangesPanel(_ref) {
  var setGaugeValue = _ref.setGaugeValue,
      setTouched = _ref.setTouched,
      setValidity = _ref.setValidity,
      setValue = _ref.setValue,
      stateParams = _ref.stateParams,
      uiState = _ref.uiState,
      vis = _ref.vis;
  var setColorSchemaOptions = (0, _react.useCallback)(function (paramName, value) {
    setGaugeValue(paramName, value); // set outline if color schema is changed to greys
    // if outline wasn't set explicitly yet

    if (paramName === 'colorSchema' && value === _colormaps.ColorSchemas.Greys && typeof stateParams.gauge.outline === 'undefined') {
      setGaugeValue('outline', true);
    }
  }, [setGaugeValue, stateParams]);
  return _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "s"
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "kbnVislibVisTypes.controls.gaugeOptions.rangesTitle",
    defaultMessage: "Ranges"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_common.ColorRanges, {
    "data-test-subj": "gaugeColorRange",
    colorsRange: stateParams.gauge.colorsRange,
    setValue: setGaugeValue,
    setTouched: setTouched,
    setValidity: setValidity
  }), _react.default.createElement(_common.SwitchOption, {
    disabled: stateParams.gauge.colorsRange.length < 2,
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.gaugeOptions.autoExtendRangeLabel', {
      defaultMessage: 'Auto extend range'
    }),
    tooltip: _i18n.i18n.translate('kbnVislibVisTypes.controls.gaugeOptions.extendRangeTooltip', {
      defaultMessage: 'Extends range to the maximum value in your data.'
    }),
    paramName: "extendRange",
    value: stateParams.gauge.extendRange,
    setValue: setGaugeValue
  }), _react.default.createElement(_common.SwitchOption, {
    "data-test-subj": "gaugePercentageMode",
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.gaugeOptions.percentageModeLabel', {
      defaultMessage: 'Percentage mode'
    }),
    paramName: "percentageMode",
    value: stateParams.gauge.percentageMode,
    setValue: setGaugeValue
  }), _react.default.createElement(_common.ColorSchemaOptions, {
    disabled: stateParams.gauge.colorsRange.length < 2,
    colorSchema: stateParams.gauge.colorSchema,
    colorSchemas: vis.type.editorConfig.collections.colorSchemas,
    invertColors: stateParams.gauge.invertColors,
    uiState: uiState,
    setValue: setColorSchemaOptions
  }), _react.default.createElement(_common.SwitchOption, {
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.gaugeOptions.showOutline', {
      defaultMessage: 'Show outline'
    }),
    paramName: "outline",
    value: stateParams.gauge.outline,
    setValue: setGaugeValue
  }), _react.default.createElement(_common.SwitchOption, {
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.gaugeOptions.showLegendLabel', {
      defaultMessage: 'Show legend'
    }),
    paramName: "addLegend",
    value: stateParams.addLegend,
    setValue: setValue
  }), _react.default.createElement(_common.SwitchOption, {
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.gaugeOptions.showScaleLabel', {
      defaultMessage: 'Show scale'
    }),
    paramName: "show",
    value: stateParams.gauge.scale.show,
    setValue: function setValue(paramName, value) {
      return setGaugeValue('scale', _objectSpread({}, stateParams.gauge.scale, _defineProperty({}, paramName, value)));
    }
  }));
}