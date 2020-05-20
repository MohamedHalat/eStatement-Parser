"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GaugeOptions = GaugeOptions;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _ranges_panel = require("./ranges_panel");

var _style_panel = require("./style_panel");

var _labels_panel = require("./labels_panel");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function GaugeOptions(props) {
  var stateParams = props.stateParams,
      setValue = props.setValue;
  var setGaugeValue = (0, _react.useCallback)(function (paramName, value) {
    return setValue('gauge', _objectSpread({}, stateParams.gauge, _defineProperty({}, paramName, value)));
  }, [setValue, stateParams.gauge]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_style_panel.StylePanel, _extends({}, props, {
    setGaugeValue: setGaugeValue
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_ranges_panel.RangesPanel, _extends({}, props, {
    setGaugeValue: setGaugeValue
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_labels_panel.LabelsPanel, _extends({}, props, {
    setGaugeValue: setGaugeValue
  })));
}