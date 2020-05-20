"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IsFilteredByCollarParamEditor = IsFilteredByCollarParamEditor;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _switch = require("./switch");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function IsFilteredByCollarParamEditor(props) {
  return _react.default.createElement(_switch.SwitchParamEditor, _extends({
    displayLabel: _i18n.i18n.translate('common.ui.aggTypes.onlyRequestDataAroundMapExtentLabel', {
      defaultMessage: 'Only request data around map extent'
    }),
    displayToolTip: _i18n.i18n.translate('common.ui.aggTypes.onlyRequestDataAroundMapExtentTooltip', {
      defaultMessage: 'Apply geo_bounding_box filter aggregation to narrow the subject area to the map view box with collar'
    }),
    dataTestSubj: "isFilteredByCollarCheckbox"
  }, props));
}