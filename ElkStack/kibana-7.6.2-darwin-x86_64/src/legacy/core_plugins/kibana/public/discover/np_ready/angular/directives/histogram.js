"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findMinInterval = findMinInterval;
exports.DiscoverHistogram = void 0;

var _eui = require("@elastic/eui");

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _eui_theme_dark = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_dark.json"));

var _charts = require("@elastic/charts");

var _i18n = require("@kbn/i18n");

var _kibana_services = require("../../../kibana_services");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function findIntervalFromDuration(dateValue, esValue, esUnit, timeZone) {
  var date = _momentTimezone.default.tz(dateValue, timeZone);

  var startOfDate = _momentTimezone.default.tz(date, timeZone).startOf(esUnit);

  var endOfDate = _momentTimezone.default.tz(date, timeZone).startOf(esUnit).add(esValue, esUnit);

  return endOfDate.valueOf() - startOfDate.valueOf();
}

function getIntervalInMs(value, esValue, esUnit, timeZone) {
  switch (esUnit) {
    case 's':
      return 1000 * esValue;

    case 'ms':
      return 1 * esValue;

    default:
      return findIntervalFromDuration(value, esValue, esUnit, timeZone);
  }
}

function findMinInterval(xValues, esValue, esUnit, timeZone) {
  return xValues.reduce(function (minInterval, currentXvalue, index) {
    var currentDiff = minInterval;

    if (index > 0) {
      currentDiff = Math.abs(xValues[index - 1] - currentXvalue);
    }

    var singleUnitInterval = getIntervalInMs(currentXvalue, esValue, esUnit, timeZone);
    return Math.min(minInterval, singleUnitInterval, currentDiff);
  }, Number.MAX_SAFE_INTEGER);
}

var DiscoverHistogram =
/*#__PURE__*/
function (_Component) {
  _inherits(DiscoverHistogram, _Component);

  function DiscoverHistogram() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DiscoverHistogram);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DiscoverHistogram)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "subscription", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", {
      chartsTheme: (0, _kibana_services.getServices)().eui_utils.getChartsThemeDefault()
    });

    _defineProperty(_assertThisInitialized(_this), "onBrushEnd", function (min, max) {
      var range = {
        from: min,
        to: max
      };

      _this.props.timefilterUpdateHandler(range);
    });

    _defineProperty(_assertThisInitialized(_this), "onElementClick", function (xInterval) {
      return function (elementData) {
        var startRange = elementData[0].x;
        var range = {
          from: startRange,
          to: startRange + xInterval
        };

        _this.props.timefilterUpdateHandler(range);
      };
    });

    _defineProperty(_assertThisInitialized(_this), "formatXValue", function (val) {
      var xAxisFormat = _this.props.chartData.xAxisFormat.params.pattern;
      return (0, _momentTimezone.default)(val).format(xAxisFormat);
    });

    _defineProperty(_assertThisInitialized(_this), "renderBarTooltip", function (xInterval, domainStart, domainEnd) {
      return function (headerData) {
        var headerDataValue = headerData.value;

        var formattedValue = _this.formatXValue(headerDataValue);

        var partialDataText = _i18n.i18n.translate('kbn.discover.histogram.partialData.bucketTooltipText', {
          defaultMessage: 'The selected time range does not include this entire bucket, it may contain partial data.'
        });

        if (headerDataValue < domainStart || headerDataValue + xInterval > domainEnd) {
          return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
            alignItems: "center",
            className: "dscHistogram__header--partial",
            responsive: false,
            gutterSize: "xs"
          }, _react.default.createElement(_eui.EuiFlexItem, {
            grow: false
          }, _react.default.createElement(_eui.EuiIcon, {
            type: "iInCircle"
          })), _react.default.createElement(_eui.EuiFlexItem, null, partialDataText)), _react.default.createElement(_eui.EuiSpacer, {
            size: "xs"
          }), _react.default.createElement("p", null, formattedValue));
        }

        return formattedValue;
      };
    });

    return _this;
  }

  _createClass(DiscoverHistogram, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.subscription = (0, _kibana_services.getServices)().eui_utils.getChartsTheme$().subscribe(function (chartsTheme) {
        return _this2.setState({
          chartsTheme: chartsTheme
        });
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.subscription) {
        this.subscription.unsubscribe();
        this.subscription = undefined;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var uiSettings = (0, _kibana_services.getServices)().uiSettings;
      var timeZone = (0, _kibana_services.timezoneProvider)(uiSettings)();
      var chartData = this.props.chartData;
      var chartsTheme = this.state.chartsTheme;

      if (!chartData || !chartData.series[0]) {
        return null;
      }

      var data = chartData.series[0].values;
      /**
       * Deprecation: [interval] on [date_histogram] is deprecated, use [fixed_interval] or [calendar_interval].
       * see https://github.com/elastic/kibana/issues/27410
       * TODO: Once the Discover query has been update, we should change the below to use the new field
       */

      var _chartData$ordered = chartData.ordered,
          intervalESValue = _chartData$ordered.intervalESValue,
          intervalESUnit = _chartData$ordered.intervalESUnit,
          xInterval = _chartData$ordered.interval;
      var xValues = chartData.xAxisOrderedValues;
      var lastXValue = xValues[xValues.length - 1];
      var domain = chartData.ordered;
      var domainStart = domain.min.valueOf();
      var domainEnd = domain.max.valueOf();
      var domainMin = data[0].x > domainStart ? domainStart : data[0].x;
      var domainMax = domainEnd - xInterval > lastXValue ? domainEnd - xInterval : lastXValue;
      var xDomain = {
        min: domainMin,
        max: domainMax,
        minInterval: findMinInterval(xValues, intervalESValue, intervalESUnit, timeZone)
      }; // Domain end of 'now' will be milliseconds behind current time, so we extend time by 1 minute and check if
      // the annotation is within this range; if so, the line annotation uses the domainEnd as its value

      var now = (0, _momentTimezone.default)();
      var isAnnotationAtEdge = (0, _momentTimezone.default)(domainEnd).add(60000).isAfter(now) && now.isAfter(domainEnd);
      var lineAnnotationValue = isAnnotationAtEdge ? domainEnd : now;
      var lineAnnotationData = [{
        dataValue: lineAnnotationValue
      }];
      var isDarkMode = uiSettings.get('theme:darkMode');
      var lineAnnotationStyle = {
        line: {
          strokeWidth: 2,
          stroke: isDarkMode ? _eui_theme_dark.default.euiColorDanger : _eui_theme_light.default.euiColorDanger,
          opacity: 0.7
        }
      };
      var rectAnnotations = [];

      if (domainStart !== domainMin) {
        rectAnnotations.push({
          coordinates: {
            x1: domainStart
          }
        });
      }

      if (domainEnd !== domainMax) {
        rectAnnotations.push({
          coordinates: {
            x0: domainEnd
          }
        });
      }

      var rectAnnotationStyle = {
        stroke: isDarkMode ? _eui_theme_dark.default.euiColorLightShade : _eui_theme_light.default.euiColorDarkShade,
        strokeWidth: 0,
        opacity: isDarkMode ? 0.6 : 0.2,
        fill: isDarkMode ? _eui_theme_dark.default.euiColorLightShade : _eui_theme_light.default.euiColorDarkShade
      };
      var tooltipProps = {
        headerFormatter: this.renderBarTooltip(xInterval, domainStart, domainEnd),
        type: _charts.TooltipType.VerticalCursor
      };
      return _react.default.createElement(_charts.Chart, {
        size: "100%"
      }, _react.default.createElement(_charts.Settings, {
        xDomain: xDomain,
        onBrushEnd: this.onBrushEnd,
        onElementClick: this.onElementClick(xInterval),
        tooltip: tooltipProps,
        theme: chartsTheme
      }), _react.default.createElement(_charts.Axis, {
        id: "discover-histogram-left-axis",
        position: _charts.Position.Left,
        ticks: 5,
        title: chartData.yAxisLabel
      }), _react.default.createElement(_charts.Axis, {
        id: "discover-histogram-bottom-axis",
        position: _charts.Position.Bottom,
        title: chartData.xAxisLabel,
        tickFormat: this.formatXValue,
        ticks: 10
      }), _react.default.createElement(_charts.LineAnnotation, {
        id: "line-annotation",
        domainType: _charts.AnnotationDomainTypes.XDomain,
        dataValues: lineAnnotationData,
        hideTooltips: true,
        style: lineAnnotationStyle
      }), _react.default.createElement(_charts.RectAnnotation, {
        dataValues: rectAnnotations,
        id: "rect-annotation",
        zIndex: 2,
        style: rectAnnotationStyle,
        hideTooltips: true
      }), _react.default.createElement(_charts.HistogramBarSeries, {
        id: "discover-histogram",
        xScaleType: _charts.ScaleType.Time,
        yScaleType: _charts.ScaleType.Linear,
        xAccessor: "x",
        yAccessors: ['y'],
        data: data,
        timeZone: timeZone,
        name: chartData.yAxisLabel
      }));
    }
  }]);

  return DiscoverHistogram;
}(_react.Component);

exports.DiscoverHistogram = DiscoverHistogram;

_defineProperty(DiscoverHistogram, "propTypes", {
  chartData: _propTypes.default.object,
  timefilterUpdateHandler: _propTypes.default.func
});