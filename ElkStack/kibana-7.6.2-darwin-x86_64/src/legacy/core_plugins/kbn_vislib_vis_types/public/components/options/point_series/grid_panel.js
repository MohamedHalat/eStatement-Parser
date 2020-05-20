"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridPanel = GridPanel;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _common = require("../../common");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function GridPanel(_ref) {
  var stateParams = _ref.stateParams,
      setValue = _ref.setValue,
      hasHistogramAgg = _ref.hasHistogramAgg;
  var setGrid = (0, _react.useCallback)(function (paramName, value) {
    return setValue('grid', _objectSpread({}, stateParams.grid, _defineProperty({}, paramName, value)));
  }, [stateParams.grid, setValue]);
  var options = (0, _react.useMemo)(function () {
    return [].concat(_toConsumableArray(stateParams.valueAxes.map(function (_ref2) {
      var id = _ref2.id,
          name = _ref2.name;
      return {
        text: name,
        value: id
      };
    })), [{
      text: _i18n.i18n.translate('kbnVislibVisTypes.controls.pointSeries.gridAxis.dontShowLabel', {
        defaultMessage: "Don't show"
      }),
      value: ''
    }]);
  }, [stateParams.valueAxes]);
  (0, _react.useEffect)(function () {
    if (hasHistogramAgg) {
      setGrid('categoryLines', false);
    }
  }, [hasHistogramAgg]);
  return _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "s"
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "kbnVislibVisTypes.controls.pointSeries.gridAxis.gridText",
    defaultMessage: "Grid"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_common.SwitchOption, {
    disabled: hasHistogramAgg,
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.pointSeries.gridAxis.xAxisLinesLabel', {
      defaultMessage: 'Show X-axis lines'
    }),
    paramName: "categoryLines",
    tooltip: hasHistogramAgg ? _i18n.i18n.translate('kbnVislibVisTypes.controls.pointSeries.gridAxis.yAxisLinesDisabledTooltip', {
      defaultMessage: "X-axis lines can't show for histograms."
    }) : undefined,
    value: stateParams.grid.categoryLines,
    setValue: setGrid,
    "data-test-subj": "showCategoryLines"
  }), _react.default.createElement(_common.SelectOption, {
    id: "gridAxis",
    label: _i18n.i18n.translate('kbnVislibVisTypes.controls.pointSeries.gridAxis.yAxisLinesLabel', {
      defaultMessage: 'Y-axis lines'
    }),
    options: options,
    paramName: "valueAxis",
    value: stateParams.grid.valueAxis || '',
    setValue: setGrid
  }));
}