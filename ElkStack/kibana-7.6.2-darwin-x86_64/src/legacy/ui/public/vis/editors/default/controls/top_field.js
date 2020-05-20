"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TopFieldParamEditor = TopFieldParamEditor;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _field = require("./field");

var _top_aggregate = require("./top_aggregate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function TopFieldParamEditor(props) {
  var compatibleAggs = (0, _top_aggregate.getCompatibleAggs)(props.agg);
  var customError;

  if (props.value && !compatibleAggs.length) {
    customError = _i18n.i18n.translate('common.ui.aggTypes.aggregateWith.noAggsErrorTooltip', {
      defaultMessage: 'The chosen field has no compatible aggregations.'
    });
  }

  return _react.default.createElement(_field.FieldParamEditor, _extends({}, props, {
    customError: customError
  }));
}