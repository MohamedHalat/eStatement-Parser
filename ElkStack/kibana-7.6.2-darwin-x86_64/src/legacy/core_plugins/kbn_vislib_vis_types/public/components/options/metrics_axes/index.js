"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricsAxisOptions = MetricsAxisOptions;

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _eui = require("@elastic/eui");

var _series_panel = require("./series_panel");

var _category_axis_panel = require("./category_axis_panel");

var _value_axes_panel = require("./value_axes_panel");

var _utils = require("./utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var VALUE_AXIS_PREFIX = 'ValueAxis-';

function MetricsAxisOptions(props) {
  var stateParams = props.stateParams,
      setValue = props.setValue,
      aggs = props.aggs,
      aggsLabels = props.aggsLabels,
      setVisType = props.setVisType,
      vis = props.vis;

  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      isCategoryAxisHorizontal = _useState2[0],
      setIsCategoryAxisHorizontal = _useState2[1];

  var setParamByIndex = (0, _react.useCallback)(function (axesName, index, paramName, value) {
    var items = stateParams[axesName];

    var array = _toConsumableArray(items);

    array[index] = _objectSpread({}, array[index], _defineProperty({}, paramName, value));
    setValue(axesName, array);
  }, [stateParams, setValue]);
  var setCategoryAxis = (0, _react.useCallback)(function (value) {
    var categoryAxes = _toConsumableArray(stateParams.categoryAxes);

    categoryAxes[0] = value;
    setValue('categoryAxes', categoryAxes);
  }, [setValue, stateParams.categoryAxes]); // stores previous aggs' custom labels

  var _useState3 = (0, _react.useState)({}),
      _useState4 = _slicedToArray(_useState3, 2),
      lastCustomLabels = _useState4[0],
      setLastCustomLabels = _useState4[1]; // stores previous aggs' field and type


  var _useState5 = (0, _react.useState)({}),
      _useState6 = _slicedToArray(_useState5, 2),
      lastSeriesAgg = _useState6[0],
      setLastSeriesAgg = _useState6[1];

  var updateAxisTitle = function updateAxisTitle() {
    var axes = (0, _lodash.cloneDeep)(stateParams.valueAxes);
    var isAxesChanged = false;

    var lastLabels = _objectSpread({}, lastCustomLabels);

    var lastMatchingSeriesAgg = _objectSpread({}, lastSeriesAgg);

    stateParams.valueAxes.forEach(function (axis, axisNumber) {
      var newCustomLabel = '';
      var matchingSeries = [];
      stateParams.seriesParams.forEach(function (series, seriesIndex) {
        if (axisNumber === 0 && !series.valueAxis || series.valueAxis === axis.id) {
          var aggByIndex = aggs.bySchemaName('metric')[seriesIndex];
          matchingSeries.push(aggByIndex);
        }
      });

      if (matchingSeries.length === 1) {
        // if several series matches to the axis, axis title is set according to the first serie.
        newCustomLabel = matchingSeries[0].makeLabel();
      }

      if (lastCustomLabels[axis.id] !== newCustomLabel && newCustomLabel !== '') {
        var lastSeriesAggType = (0, _lodash.get)(lastSeriesAgg, "".concat(matchingSeries[0].id, ".type"));
        var lastSeriesAggField = (0, _lodash.get)(lastSeriesAgg, "".concat(matchingSeries[0].id, ".field"));
        var matchingSeriesAggType = (0, _lodash.get)(matchingSeries, '[0]type.name', '');
        var matchingSeriesAggField = (0, _lodash.get)(matchingSeries, '[0]params.field.name', '');
        var aggTypeIsChanged = lastSeriesAggType !== matchingSeriesAggType;
        var aggFieldIsChanged = lastSeriesAggField !== matchingSeriesAggField;
        lastMatchingSeriesAgg[matchingSeries[0].id] = {
          type: matchingSeriesAggType,
          field: matchingSeriesAggField
        };
        lastLabels[axis.id] = newCustomLabel;

        if (Object.keys(lastCustomLabels).length !== 0 && (aggTypeIsChanged || aggFieldIsChanged || axis.title.text === '' || lastCustomLabels[axis.id] === axis.title.text)) {
          // Override axis title with new custom label
          axes[axisNumber] = _objectSpread({}, axis, {
            title: _objectSpread({}, axis.title, {
              text: newCustomLabel
            })
          });
          isAxesChanged = true;
        }
      }
    });

    if (isAxesChanged) {
      setValue('valueAxes', axes);
    }

    setLastSeriesAgg(lastMatchingSeriesAgg);
    setLastCustomLabels(lastLabels);
  };

  var onValueAxisPositionChanged = (0, _react.useCallback)(function (index, value) {
    var valueAxes = _toConsumableArray(stateParams.valueAxes);

    var name = (0, _utils.getUpdatedAxisName)(value, valueAxes);
    valueAxes[index] = _objectSpread({}, valueAxes[index], {
      name: name,
      position: value
    });
    setValue('valueAxes', valueAxes);
  }, [stateParams.valueAxes, _utils.getUpdatedAxisName, setValue]);
  var onCategoryAxisPositionChanged = (0, _react.useCallback)(function (chartPosition) {
    var isChartHorizontal = (0, _utils.isAxisHorizontal)(chartPosition);
    setIsCategoryAxisHorizontal((0, _utils.isAxisHorizontal)(chartPosition));
    stateParams.valueAxes.forEach(function (axis, index) {
      if ((0, _utils.isAxisHorizontal)(axis.position) === isChartHorizontal) {
        var position = (0, _utils.mapPosition)(axis.position);
        onValueAxisPositionChanged(index, position);
      }
    });
  }, [stateParams.valueAxes, onValueAxisPositionChanged]);
  var addValueAxis = (0, _react.useCallback)(function () {
    var nextAxisIdNumber = stateParams.valueAxes.reduce((0, _utils.countNextAxisNumber)(VALUE_AXIS_PREFIX), 1);
    var newAxis = (0, _lodash.cloneDeep)(stateParams.valueAxes[0]);
    newAxis.id = VALUE_AXIS_PREFIX + nextAxisIdNumber;
    newAxis.position = (0, _utils.mapPositionOpposite)(newAxis.position);
    newAxis.name = (0, _utils.getUpdatedAxisName)(newAxis.position, stateParams.valueAxes);
    setValue('valueAxes', [].concat(_toConsumableArray(stateParams.valueAxes), [newAxis]));
    return newAxis;
  }, [stateParams.valueAxes, setValue]);
  var removeValueAxis = (0, _react.useCallback)(function (axis) {
    var newValueAxes = stateParams.valueAxes.filter(function (valAxis) {
      return valAxis.id !== axis.id;
    });
    setValue('valueAxes', newValueAxes);
    var isSeriesUpdated = false;
    var series = stateParams.seriesParams.map(function (ser) {
      if (axis.id === ser.valueAxis) {
        isSeriesUpdated = true;
        return _objectSpread({}, ser, {
          valueAxis: newValueAxes[0].id
        });
      }

      return ser;
    });

    if (isSeriesUpdated) {
      // if seriesParams have valueAxis equals to removed one, then we reset it to the first valueAxis
      setValue('seriesParams', series);
    }

    if (stateParams.grid.valueAxis === axis.id) {
      // reset Y-axis grid lines setting
      setValue('grid', _objectSpread({}, stateParams.grid, {
        valueAxis: undefined
      }));
    }
  }, [stateParams.seriesParams, stateParams.valueAxes, setValue]);
  var changeValueAxis = (0, _react.useCallback)(function (index, paramName, selectedValueAxis) {
    var newValueAxis = selectedValueAxis;

    if (selectedValueAxis === 'new') {
      var axis = addValueAxis();
      newValueAxis = axis.id;
    }

    setParamByIndex('seriesParams', index, paramName, newValueAxis);
    updateAxisTitle();
  }, [addValueAxis, setParamByIndex]);
  var metrics = (0, _react.useMemo)(function () {
    var schemaName = vis.type.schemas.metrics[0].name;
    return aggs.bySchemaName(schemaName);
  }, [vis.type.schemas.metrics[0].name, aggs, aggsLabels]);
  var firstValueAxesId = stateParams.valueAxes[0].id;
  (0, _react.useEffect)(function () {
    var updatedSeries = metrics.map(function (agg) {
      var params = stateParams.seriesParams.find(function (param) {
        return param.data.id === agg.id;
      });
      var label = agg.makeLabel(); // update labels for existing params or create new one

      if (params) {
        return _objectSpread({}, params, {
          data: _objectSpread({}, params.data, {
            label: label
          })
        });
      } else {
        var series = (0, _utils.makeSerie)(agg.id, label, firstValueAxesId, stateParams.seriesParams[stateParams.seriesParams.length - 1]);
        return series;
      }
    });
    setValue('seriesParams', updatedSeries);
  }, [aggsLabels, metrics, firstValueAxesId]);
  var visType = (0, _react.useMemo)(function () {
    var types = (0, _lodash.uniq)(stateParams.seriesParams.map(function (_ref) {
      var type = _ref.type;
      return type;
    }));
    return types.length === 1 ? types[0] : 'histogram';
  }, [stateParams.seriesParams]);
  (0, _react.useEffect)(function () {
    setVisType(visType);
  }, [visType]);
  (0, _react.useEffect)(function () {
    updateAxisTitle();
  }, [aggsLabels]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_series_panel.SeriesPanel, _extends({
    setParamByIndex: setParamByIndex,
    changeValueAxis: changeValueAxis
  }, props)), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_value_axes_panel.ValueAxesPanel, _extends({
    addValueAxis: addValueAxis,
    isCategoryAxisHorizontal: isCategoryAxisHorizontal,
    removeValueAxis: removeValueAxis,
    onValueAxisPositionChanged: onValueAxisPositionChanged,
    setParamByIndex: setParamByIndex
  }, props)), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_category_axis_panel.CategoryAxisPanel, _extends({}, props, {
    axis: stateParams.categoryAxes[0],
    onPositionChanged: onCategoryAxisPositionChanged,
    setCategoryAxis: setCategoryAxis
  })));
}