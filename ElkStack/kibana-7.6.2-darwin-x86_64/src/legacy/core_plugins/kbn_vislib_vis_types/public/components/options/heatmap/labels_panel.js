"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LabelsPanel = LabelsPanel;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _common = require("../../common");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VERTICAL_ROTATION = 270;

function LabelsPanel(_ref) {
  var valueAxis = _ref.valueAxis,
      setValue = _ref.setValue;
  var rotateLabels = valueAxis.labels.rotate === VERTICAL_ROTATION;
  var setValueAxisLabels = (0, _react.useCallback)(function (paramName, value) {
    return setValue('valueAxes', [_objectSpread({}, valueAxis, {
      labels: _objectSpread({}, valueAxis.labels, _defineProperty({}, paramName, value))
    })]);
  }, [valueAxis, setValue]);
  var setRotateLabels = (0, _react.useCallback)(function (paramName, value) {
    return setValueAxisLabels(paramName, value ? VERTICAL_ROTATION : 0);
  }, [setValueAxisLabels]);
  var setColor = (0, _react.useCallback)(function (value) {
    return setValueAxisLabels('color', value);
  }, [setValueAxisLabels]);
  return _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "s"
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "kbnVislibVisTypes.controls.heatmapOptions.labelsTitle",
    defaultMessage: "Labels"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_common.SwitchOption, {
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.showLabelsTitle', {
      defaultMessage: 'Show labels'
    }),
    paramName: "show",
    value: valueAxis.labels.show,
    setValue: setValueAxisLabels
  }), _react.default.createElement(_common.SwitchOption, {
    disabled: !valueAxis.labels.show,
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.rotateLabel', {
      defaultMessage: 'Rotate'
    }),
    paramName: "rotate",
    value: rotateLabels,
    setValue: setRotateLabels
  }), _react.default.createElement(_common.SwitchOption, {
    disabled: !valueAxis.labels.show,
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.overwriteAutomaticColorLabel', {
      defaultMessage: 'Overwrite automatic color'
    }),
    paramName: "overwriteColor",
    value: valueAxis.labels.overwriteColor,
    setValue: setValueAxisLabels
  }), _react.default.createElement(_eui.EuiFormRow, {
    display: "rowCompressed",
    fullWidth: true,
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.colorLabel', {
      defaultMessage: 'Color'
    })
  }, _react.default.createElement(_eui.EuiColorPicker, {
    compressed: true,
    fullWidth: true,
    disabled: !valueAxis.labels.show || !valueAxis.labels.overwriteColor,
    color: valueAxis.labels.color,
    onChange: setColor
  })));
}