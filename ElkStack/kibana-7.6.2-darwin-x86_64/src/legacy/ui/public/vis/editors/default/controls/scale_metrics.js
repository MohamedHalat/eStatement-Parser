"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScaleMetricsParamEditor = ScaleMetricsParamEditor;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _switch = require("./switch");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ScaleMetricsParamEditor(props) {
  return _react.default.createElement(_switch.SwitchParamEditor, _extends({
    dataTestSubj: "scaleMetricsSwitch",
    displayLabel: _i18n.i18n.translate('common.ui.aggTypes.scaleMetricsLabel', {
      defaultMessage: 'Scale metric values (deprecated)'
    }),
    displayToolTip: _i18n.i18n.translate('common.ui.aggTypes.scaleMetricsTooltip', {
      defaultMessage: 'If you select a manual minimum interval and a larger interval will be used, enabling this will ' + 'cause count and sum metrics to be scaled to the manual selected interval.'
    })
  }, props));
}