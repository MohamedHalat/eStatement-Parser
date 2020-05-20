"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeatmapOptions = HeatmapOptions;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _common = require("../../common");

var _labels_panel = require("./labels_panel");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function HeatmapOptions(props) {
  var stateParams = props.stateParams,
      vis = props.vis,
      uiState = props.uiState,
      setValue = props.setValue,
      setValidity = props.setValidity,
      setTouched = props.setTouched;

  var _stateParams$valueAxe = _slicedToArray(stateParams.valueAxes, 1),
      valueAxis = _stateParams$valueAxe[0];

  var isColorsNumberInvalid = stateParams.colorsNumber < 2 || stateParams.colorsNumber > 10;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isColorRangesValid = _useState2[0],
      setIsColorRangesValid = _useState2[1];

  var setValueAxisScale = (0, _react.useCallback)(function (paramName, value) {
    return setValue('valueAxes', [_objectSpread({}, valueAxis, {
      scale: _objectSpread({}, valueAxis.scale, _defineProperty({}, paramName, value))
    })]);
  }, [valueAxis, setValue]);
  (0, _react.useEffect)(function () {
    setValidity(stateParams.setColorRange ? isColorRangesValid : !isColorsNumberInvalid);
  }, [stateParams.setColorRange, isColorRangesValid, isColorsNumberInvalid, setValidity]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "s"
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "kbnVislibVisTypes.editors.heatmap.basicSettingsTitle",
    defaultMessage: "Basic settings"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_common.BasicOptions, props), _react.default.createElement(_common.SwitchOption, {
    label: _i18n.i18n.translate('kbnVislibVisTypes.editors.heatmap.highlightLabel', {
      defaultMessage: 'Highlight range'
    }),
    paramName: "enableHover",
    value: stateParams.enableHover,
    setValue: setValue,
    tooltip: _i18n.i18n.translate('kbnVislibVisTypes.editors.heatmap.highlightLabelTooltip', {
      defaultMessage: 'Highlight hovered range in the chart and corresponding label in the legend.'
    })
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "s"
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "kbnVislibVisTypes.editors.heatmap.heatmapSettingsTitle",
    defaultMessage: "Heatmap settings"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_common.ColorSchemaOptions, {
    colorSchema: stateParams.colorSchema,
    colorSchemas: vis.type.editorConfig.collections.colorSchemas,
    invertColors: stateParams.invertColors,
    uiState: uiState,
    setValue: setValue
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_common.SelectOption, {
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.colorScaleLabel', {
      defaultMessage: 'Color scale'
    }),
    options: vis.type.editorConfig.collections.scales,
    paramName: "type",
    value: valueAxis.scale.type,
    setValue: setValueAxisScale
  }), _react.default.createElement(_common.SwitchOption, {
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.scaleToDataBoundsLabel', {
      defaultMessage: 'Scale to data bounds'
    }),
    paramName: "defaultYExtents",
    value: valueAxis.scale.defaultYExtents,
    setValue: setValueAxisScale
  }), _react.default.createElement(_common.SwitchOption, {
    disabled: stateParams.setColorRange,
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.percentageModeLabel', {
      defaultMessage: 'Percentage mode'
    }),
    paramName: "percentageMode",
    value: stateParams.setColorRange ? false : stateParams.percentageMode,
    setValue: setValue
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_common.NumberInputOption, {
    "data-test-subj": "heatmapColorsNumber",
    disabled: stateParams.setColorRange,
    isInvalid: isColorsNumberInvalid,
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.colorsNumberLabel', {
      defaultMessage: 'Number of colors'
    }),
    max: 10,
    min: 2,
    paramName: "colorsNumber",
    value: stateParams.colorsNumber,
    setValue: setValue
  }), _react.default.createElement(_common.SwitchOption, {
    "data-test-subj": "heatmapUseCustomRanges",
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.heatmapOptions.useCustomRangesLabel', {
      defaultMessage: 'Use custom ranges'
    }),
    paramName: "setColorRange",
    value: stateParams.setColorRange,
    setValue: setValue
  }), stateParams.setColorRange && _react.default.createElement(_common.ColorRanges, {
    "data-test-subj": "heatmapColorRange",
    colorsRange: stateParams.colorsRange,
    setValue: setValue,
    setTouched: setTouched,
    setValidity: setIsColorRangesValid
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_labels_panel.LabelsPanel, {
    valueAxis: valueAxis,
    setValue: setValue
  }));
}