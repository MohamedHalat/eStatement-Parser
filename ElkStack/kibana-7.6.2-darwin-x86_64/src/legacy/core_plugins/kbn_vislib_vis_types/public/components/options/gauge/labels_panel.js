"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LabelsPanel = LabelsPanel;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _common = require("../../common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function LabelsPanel(_ref) {
  var stateParams = _ref.stateParams,
      setValue = _ref.setValue,
      setGaugeValue = _ref.setGaugeValue;
  return _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "s"
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "kbnVislibVisTypes.controls.gaugeOptions.labelsTitle",
    defaultMessage: "Labels"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_common.SwitchOption, {
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.gaugeOptions.showLabelsLabel', {
      defaultMessage: 'Show labels'
    }),
    paramName: "show",
    value: stateParams.gauge.labels.show,
    setValue: function setValue(paramName, value) {
      return setGaugeValue('labels', _objectSpread({}, stateParams.gauge.labels, _defineProperty({}, paramName, value)));
    }
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_common.TextInputOption, {
    disabled: !stateParams.gauge.labels.show,
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.gaugeOptions.subTextLabel', {
      defaultMessage: 'Sub label'
    }),
    paramName: "subText",
    value: stateParams.gauge.style.subText,
    setValue: function setValue(paramName, value) {
      return setGaugeValue('style', _objectSpread({}, stateParams.gauge.style, _defineProperty({}, paramName, value)));
    }
  }), _react.default.createElement(_common.SwitchOption, {
    disabled: !stateParams.gauge.labels.show,
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.gaugeOptions.displayWarningsLabel', {
      defaultMessage: 'Display warnings'
    }),
    tooltip: _i18n.i18n.translate('kbnVislibVisTypes.controls.gaugeOptions.switchWarningsTooltip', {
      defaultMessage: 'Turns on/off warnings. When turned on, a warning will be shown if not all labels could be displayed.'
    }),
    paramName: "isDisplayWarning",
    value: stateParams.isDisplayWarning,
    setValue: setValue
  }));
}