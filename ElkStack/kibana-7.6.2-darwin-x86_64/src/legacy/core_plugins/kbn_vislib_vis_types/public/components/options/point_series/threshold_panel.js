"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThresholdPanel = ThresholdPanel;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _common = require("../../common");

var _required_number_input = require("../../common/required_number_input");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function ThresholdPanel(_ref) {
  var stateParams = _ref.stateParams,
      setValue = _ref.setValue,
      setMultipleValidity = _ref.setMultipleValidity,
      vis = _ref.vis;
  var setThresholdLine = (0, _react.useCallback)(function (paramName, value) {
    return setValue('thresholdLine', _objectSpread({}, stateParams.thresholdLine, _defineProperty({}, paramName, value)));
  }, [stateParams.thresholdLine, setValue]);
  var setThresholdLineColor = (0, _react.useCallback)(function (value) {
    return setThresholdLine('color', value);
  }, [setThresholdLine]);
  var setThresholdLineValidity = (0, _react.useCallback)(function (paramName, isValid) {
    return setMultipleValidity("thresholdLine__".concat(paramName), isValid);
  }, [setMultipleValidity]);
  return _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "s"
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "kbnVislibVisTypes.editors.pointSeries.thresholdLineSettingsTitle",
    defaultMessage: "Threshold line"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_common.SwitchOption, {
    label: _i18n.i18n.translate('kbnVislibVisTypes.editors.pointSeries.thresholdLine.showLabel', {
      defaultMessage: 'Show threshold line'
    }),
    paramName: "show",
    value: stateParams.thresholdLine.show,
    setValue: setThresholdLine
  }), stateParams.thresholdLine.show && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_required_number_input.NumberInputOption, {
    label: _i18n.i18n.translate('kbnVislibVisTypes.editors.pointSeries.thresholdLine.valueLabel', {
      defaultMessage: 'Threshold value'
    }),
    paramName: "value",
    value: stateParams.thresholdLine.value,
    setValue: setThresholdLine,
    setValidity: setThresholdLineValidity
  }), _react.default.createElement(_required_number_input.NumberInputOption, {
    label: _i18n.i18n.translate('kbnVislibVisTypes.editors.pointSeries.thresholdLine.widthLabel', {
      defaultMessage: 'Line width'
    }),
    paramName: "width",
    min: 1,
    step: 1,
    value: stateParams.thresholdLine.width,
    setValue: setThresholdLine,
    setValidity: setThresholdLineValidity
  }), _react.default.createElement(_common.SelectOption, {
    label: _i18n.i18n.translate('kbnVislibVisTypes.editors.pointSeries.thresholdLine.styleLabel', {
      defaultMessage: 'Line style'
    }),
    options: vis.type.editorConfig.collections.thresholdLineStyles,
    paramName: "style",
    value: stateParams.thresholdLine.style,
    setValue: setThresholdLine
  }), _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('kbnVislibVisTypes.editors.pointSeries.thresholdLine.colorLabel', {
      defaultMessage: 'Line color'
    }),
    fullWidth: true,
    compressed: true
  }, _react.default.createElement(_eui.EuiColorPicker, {
    compressed: true,
    color: stateParams.thresholdLine.color,
    fullWidth: true,
    onChange: setThresholdLineColor
  }))));
}