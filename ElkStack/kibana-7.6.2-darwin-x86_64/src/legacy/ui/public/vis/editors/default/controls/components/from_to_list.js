"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FromToList = FromToList;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../../../../plugins/kibana_utils/public");

var _input_list = require("./input_list");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var EMPTY_STRING = '';

function FromToList(_ref) {
  var showValidation = _ref.showValidation,
      onBlur = _ref.onBlur,
      rest = _objectWithoutProperties(_ref, ["showValidation", "onBlur"]);

  var fromToListConfig = {
    defaultValue: {
      from: {
        value: '0.0.0.0',
        model: '0.0.0.0',
        isInvalid: false
      },
      to: {
        value: '255.255.255.255',
        model: '255.255.255.255',
        isInvalid: false
      }
    },
    validateClass: _public.Ipv4Address,
    getModelValue: function getModelValue() {
      var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return {
        from: {
          value: item.from || EMPTY_STRING,
          model: item.from || EMPTY_STRING,
          isInvalid: false
        },
        to: {
          value: item.to || EMPTY_STRING,
          model: item.to || EMPTY_STRING,
          isInvalid: false
        }
      };
    },
    getRemoveBtnAriaLabel: function getRemoveBtnAriaLabel(item) {
      return _i18n.i18n.translate('common.ui.aggTypes.ipRanges.removeRangeAriaLabel', {
        defaultMessage: 'Remove the range of {from} to {to}',
        values: {
          from: item.from.value || '*',
          to: item.to.value || '*'
        }
      });
    },
    onChangeFn: function onChangeFn(_ref2) {
      var from = _ref2.from,
          to = _ref2.to;
      var result = {};

      if (from.model) {
        result.from = from.model;
      }

      if (to.model) {
        result.to = to.model;
      }

      return result;
    },
    hasInvalidValuesFn: function hasInvalidValuesFn(_ref3) {
      var from = _ref3.from,
          to = _ref3.to;
      return from.isInvalid || to.isInvalid;
    },
    renderInputRow: function renderInputRow(item, index, onChangeValue) {
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFieldText, {
        "aria-label": _i18n.i18n.translate('common.ui.aggTypes.ipRanges.ipRangeFromAriaLabel', {
          defaultMessage: 'IP range from: {value}',
          values: {
            value: item.from.value || '*'
          }
        }),
        compressed: true,
        isInvalid: showValidation ? item.from.isInvalid : false,
        placeholder: "*",
        onChange: function onChange(ev) {
          onChangeValue(index, ev.target.value, 'from');
        },
        value: item.from.value,
        onBlur: onBlur
      })), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiIcon, {
        type: "sortRight",
        color: "subdued"
      })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFieldText, {
        "aria-label": _i18n.i18n.translate('common.ui.aggTypes.ipRanges.ipRangeToAriaLabel', {
          defaultMessage: 'IP range to: {value}',
          values: {
            value: item.to.value || '*'
          }
        }),
        compressed: true,
        isInvalid: showValidation ? item.to.isInvalid : false,
        placeholder: "*",
        onChange: function onChange(ev) {
          onChangeValue(index, ev.target.value, 'to');
        },
        value: item.to.value,
        onBlur: onBlur
      })));
    },
    modelNames: ['from', 'to']
  };
  return _react.default.createElement(_input_list.InputList, _extends({
    config: fromToListConfig
  }, rest));
}