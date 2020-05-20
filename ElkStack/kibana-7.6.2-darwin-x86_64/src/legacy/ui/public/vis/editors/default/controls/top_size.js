"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TopSizeParamEditor = TopSizeParamEditor;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _size = require("./size");

var _top_aggregate = require("./top_aggregate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function TopSizeParamEditor(props) {
  var iconTip = _react.default.createElement(_react.default.Fragment, null, ' ', _react.default.createElement(_eui.EuiIconTip, {
    position: "right",
    content: _i18n.i18n.translate('common.ui.aggTypes.sizeTooltip', {
      defaultMessage: "Request top-K hits. Multiple hits will be combined via 'aggregate with'."
    }),
    type: "questionInCircle"
  }));

  var fieldType = props.agg.params.field && props.agg.params.field.type;
  var disabled = fieldType && !(0, _top_aggregate.getCompatibleAggs)(props.agg).length;
  return _react.default.createElement(_size.SizeParamEditor, _extends({}, props, {
    iconTip: iconTip,
    disabled: disabled
  }));
}