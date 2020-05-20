"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExtendedBoundsParamEditor = ExtendedBoundsParamEditor;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _agg_utils = require("./agg_utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function areBoundsValid(_ref) {
  var min = _ref.min,
      max = _ref.max;

  if (min === '' || max === '') {
    return false;
  }

  return max >= min;
}

function ExtendedBoundsParamEditor(_ref2) {
  var _ref2$value = _ref2.value,
      value = _ref2$value === void 0 ? {} : _ref2$value,
      setValue = _ref2.setValue,
      setValidity = _ref2.setValidity,
      showValidation = _ref2.showValidation,
      setTouched = _ref2.setTouched;

  var minLabel = _i18n.i18n.translate('common.ui.aggTypes.extendedBounds.minLabel', {
    defaultMessage: 'Min'
  });

  var maxLabel = _i18n.i18n.translate('common.ui.aggTypes.extendedBounds.maxLabel', {
    defaultMessage: 'Max'
  });

  var isValid = areBoundsValid(value);
  var error;

  if (!isValid) {
    error = _i18n.i18n.translate('common.ui.aggTypes.extendedBounds.errorMessage', {
      defaultMessage: 'Min should be less than or equal to Max.'
    });
  }

  (0, _agg_utils.useValidation)(setValidity, isValid);

  var handleChange = function handleChange(ev, name) {
    setValue(_objectSpread({}, value, _defineProperty({}, name, ev.target.value === '' ? '' : parseFloat(ev.target.value))));
  };

  return _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    isInvalid: showValidation ? !isValid : false,
    error: error
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s",
    responsive: false
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFieldNumber, {
    value: (0, _lodash.isUndefined)(value.min) ? '' : value.min,
    onChange: function onChange(ev) {
      return handleChange(ev, 'min');
    },
    onBlur: setTouched,
    fullWidth: true,
    isInvalid: showValidation ? !isValid : false,
    "aria-label": minLabel,
    prepend: minLabel,
    compressed: true
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFieldNumber, {
    value: (0, _lodash.isUndefined)(value.max) ? '' : value.max,
    onChange: function onChange(ev) {
      return handleChange(ev, 'max');
    },
    onBlur: setTouched,
    fullWidth: true,
    isInvalid: showValidation ? !isValid : false,
    "aria-label": maxLabel,
    prepend: maxLabel,
    compressed: true
  }))));
}