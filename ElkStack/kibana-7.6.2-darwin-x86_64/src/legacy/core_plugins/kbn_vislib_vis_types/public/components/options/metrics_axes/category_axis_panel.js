"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoryAxisPanel = CategoryAxisPanel;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _common = require("../../common");

var _label_options = require("./label_options");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function CategoryAxisPanel(props) {
  var axis = props.axis,
      onPositionChanged = props.onPositionChanged,
      vis = props.vis,
      setCategoryAxis = props.setCategoryAxis;
  var setAxis = (0, _react.useCallback)(function (paramName, value) {
    var updatedAxis = _objectSpread({}, axis, _defineProperty({}, paramName, value));

    setCategoryAxis(updatedAxis);
  }, [setCategoryAxis]);
  var setPosition = (0, _react.useCallback)(function (paramName, value) {
    setAxis(paramName, value);
    onPositionChanged(value);
  }, [setAxis, onPositionChanged]);
  return _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "s"
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "kbnVislibVisTypes.controls.pointSeries.categoryAxis.xAxisTitle",
    defaultMessage: "X-axis"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_common.SelectOption, {
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.pointSeries.categoryAxis.positionLabel', {
      defaultMessage: 'Position'
    }),
    options: vis.type.editorConfig.collections.positions,
    paramName: "position",
    value: axis.position,
    setValue: setPosition,
    "data-test-subj": "categoryAxisPosition"
  }), _react.default.createElement(_common.SwitchOption, {
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.pointSeries.categoryAxis.showLabel', {
      defaultMessage: 'Show axis lines and labels'
    }),
    paramName: "show",
    value: axis.show,
    setValue: setAxis
  }), axis.show && _react.default.createElement(_label_options.LabelOptions, _extends({
    axis: axis,
    axesName: "categoryAxes",
    index: 0
  }, props)));
}