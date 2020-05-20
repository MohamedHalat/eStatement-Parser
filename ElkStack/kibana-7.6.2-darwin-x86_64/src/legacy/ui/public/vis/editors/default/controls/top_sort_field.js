"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TopSortFieldParamEditor = TopSortFieldParamEditor;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _field = require("./field");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function TopSortFieldParamEditor(props) {
  var customLabel = _i18n.i18n.translate('common.ui.aggTypes.sortOnLabel', {
    defaultMessage: 'Sort on'
  });

  return _react.default.createElement(_field.FieldParamEditor, _extends({}, props, {
    customLabel: customLabel
  }));
}