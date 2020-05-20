"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChartOptions = ChartOptions;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _collections = require("../../../utils/collections");

var _common = require("../../common");

var _line_options = require("./line_options");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ChartOptions(_ref) {
  var chart = _ref.chart,
      index = _ref.index,
      stateParams = _ref.stateParams,
      vis = _ref.vis,
      changeValueAxis = _ref.changeValueAxis,
      setParamByIndex = _ref.setParamByIndex;
  var setChart = (0, _react.useCallback)(function (paramName, value) {
    setParamByIndex('seriesParams', index, paramName, value);
  }, [setParamByIndex, index]);
  var setValueAxis = (0, _react.useCallback)(function (paramName, value) {
    changeValueAxis(index, paramName, value);
  }, [changeValueAxis, index]);
  var valueAxesOptions = (0, _react.useMemo)(function () {
    return [].concat(_toConsumableArray(stateParams.valueAxes.map(function (_ref2) {
      var id = _ref2.id,
          name = _ref2.name;
      return {
        text: name,
        value: id
      };
    })), [{
      text: _i18n.i18n.translate('kbnVislibVisTypes.controls.pointSeries.series.newAxisLabel', {
        defaultMessage: 'New axis…'
      }),
      value: 'new'
    }]);
  }, [stateParams.valueAxes]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_common.SelectOption, {
    id: "seriesValueAxis".concat(index),
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.pointSeries.series.valueAxisLabel', {
      defaultMessage: 'Value axis'
    }),
    options: valueAxesOptions,
    paramName: "valueAxis",
    value: chart.valueAxis,
    setValue: setValueAxis
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_common.SelectOption, {
    id: "seriesType".concat(index),
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.pointSeries.series.chartTypeLabel', {
      defaultMessage: 'Chart type'
    }),
    options: vis.type.editorConfig.collections.chartTypes,
    paramName: "type",
    value: chart.type,
    setValue: setChart
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_common.SelectOption, {
    id: "seriesMode".concat(index),
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.pointSeries.series.modeLabel', {
      defaultMessage: 'Mode'
    }),
    options: vis.type.editorConfig.collections.chartModes,
    paramName: "mode",
    value: chart.mode,
    setValue: setChart
  }))), chart.type === _collections.ChartTypes.AREA && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_common.SelectOption, {
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.pointSeries.series.lineModeLabel', {
      defaultMessage: 'Line mode'
    }),
    options: vis.type.editorConfig.collections.interpolationModes,
    paramName: "interpolate",
    value: chart.interpolate,
    setValue: setChart
  })), chart.type === _collections.ChartTypes.LINE && _react.default.createElement(_line_options.LineOptions, {
    chart: chart,
    vis: vis,
    setChart: setChart
  }));
}