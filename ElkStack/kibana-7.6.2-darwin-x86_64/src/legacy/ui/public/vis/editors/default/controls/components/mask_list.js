"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MaskList = MaskList;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _cidr_mask = require("../../../../../agg_types/buckets/lib/cidr_mask");

var _input_list = require("./input_list");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var EMPTY_STRING = '';

function MaskList(_ref) {
  var showValidation = _ref.showValidation,
      onBlur = _ref.onBlur,
      rest = _objectWithoutProperties(_ref, ["showValidation", "onBlur"]);

  var maskListConfig = {
    defaultValue: {
      mask: {
        model: '0.0.0.0/1',
        value: '0.0.0.0/1',
        isInvalid: false
      }
    },
    validateClass: _cidr_mask.CidrMask,
    getModelValue: function getModelValue() {
      var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return {
        mask: {
          model: item.mask || EMPTY_STRING,
          value: item.mask || EMPTY_STRING,
          isInvalid: false
        }
      };
    },
    getRemoveBtnAriaLabel: function getRemoveBtnAriaLabel(item) {
      return item.mask.value ? _i18n.i18n.translate('common.ui.aggTypes.ipRanges.removeCidrMaskButtonAriaLabel', {
        defaultMessage: 'Remove the CIDR mask value of {mask}',
        values: {
          mask: item.mask.value
        }
      }) : _i18n.i18n.translate('common.ui.aggTypes.ipRanges.removeEmptyCidrMaskButtonAriaLabel', {
        defaultMessage: 'Remove the CIDR mask default value'
      });
    },
    onChangeFn: function onChangeFn(_ref2) {
      var mask = _ref2.mask;

      if (mask.model) {
        return {
          mask: mask.model
        };
      }

      return {};
    },
    hasInvalidValuesFn: function hasInvalidValuesFn(_ref3) {
      var mask = _ref3.mask;
      return mask.isInvalid;
    },
    renderInputRow: function renderInputRow(_ref4, index, onChangeValue) {
      var mask = _ref4.mask;
      return _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFieldText, {
        "aria-label": _i18n.i18n.translate('common.ui.aggTypes.ipRanges.cidrMaskAriaLabel', {
          defaultMessage: 'CIDR mask: {mask}',
          values: {
            mask: mask.value || '*'
          }
        }),
        compressed: true,
        fullWidth: true,
        isInvalid: showValidation ? mask.isInvalid : false,
        placeholder: "*",
        onChange: function onChange(ev) {
          onChangeValue(index, ev.target.value, 'mask');
        },
        value: mask.value,
        onBlur: onBlur
      }));
    },
    modelNames: 'mask'
  };
  return _react.default.createElement(_input_list.InputList, _extends({
    config: maskListConfig
  }, rest));
}