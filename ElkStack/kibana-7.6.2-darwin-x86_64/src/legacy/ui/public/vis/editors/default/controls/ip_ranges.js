"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IpRangesParamEditor = IpRangesParamEditor;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _from_to_list = require("./components/from_to_list");

var _mask_list = require("./components/mask_list");

var _ip_range_type = require("./ip_range_type");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function IpRangesParamEditor(_ref) {
  var agg = _ref.agg,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? {
    fromTo: [],
    mask: []
  } : _ref$value,
      setTouched = _ref.setTouched,
      setValue = _ref.setValue,
      setValidity = _ref.setValidity,
      showValidation = _ref.showValidation;

  var handleChange = function handleChange(modelName, items) {
    setValue(_objectSpread({}, value, _defineProperty({}, modelName, items)));
  };

  return _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    id: "visEditorIpRange".concat(agg.id),
    compressed: true
  }, agg.params.ipRangeType === _ip_range_type.IpRangeTypes.MASK ? _react.default.createElement(_mask_list.MaskList, {
    list: value.mask,
    showValidation: showValidation,
    onBlur: setTouched,
    onChange: function onChange(items) {
      return handleChange(_ip_range_type.IpRangeTypes.MASK, items);
    },
    setValidity: setValidity
  }) : _react.default.createElement(_from_to_list.FromToList, {
    list: value.fromTo,
    showValidation: showValidation,
    onBlur: setTouched,
    onChange: function onChange(items) {
      return handleChange(_ip_range_type.IpRangeTypes.FROM_TO, items);
    },
    setValidity: setValidity
  }));
}