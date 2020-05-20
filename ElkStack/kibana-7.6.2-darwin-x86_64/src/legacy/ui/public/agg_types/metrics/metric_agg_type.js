"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMetricAggType = isMetricAggType;
exports.MetricAggType = void 0;

var _i18n = require("@kbn/i18n");

var _new_platform = require("ui/new_platform");

var _agg_type = require("../agg_type");

var _metric_agg_types = require("./metric_agg_types");

var _public = require("../../../../../plugins/data/public");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var metricType = 'metrics';

var MetricAggType =
/*#__PURE__*/
function (_AggType) {
  _inherits(MetricAggType, _AggType);

  function MetricAggType(config) {
    var _this;

    _classCallCheck(this, MetricAggType);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MetricAggType).call(this, config));

    _defineProperty(_assertThisInitialized(_this), "subtype", void 0);

    _defineProperty(_assertThisInitialized(_this), "isScalable", void 0);

    _defineProperty(_assertThisInitialized(_this), "type", metricType);

    _defineProperty(_assertThisInitialized(_this), "getKey", function () {});

    _this.getValue = config.getValue || function (agg, bucket) {
      // Metric types where an empty set equals `zero`
      var isSettableToZero = [_metric_agg_types.METRIC_TYPES.CARDINALITY, _metric_agg_types.METRIC_TYPES.SUM].includes(agg.type.name); // Return proper values when no buckets are present
      // `Count` handles empty sets properly

      if (!bucket[agg.id] && isSettableToZero) return 0;
      return bucket[agg.id] && bucket[agg.id].value;
    };

    _this.getFormat = config.getFormat || function (agg) {
      var registeredFormats = _new_platform.npStart.plugins.data.fieldFormats;
      var field = agg.getField();
      return field ? field.format : registeredFormats.getDefaultInstance(_public.KBN_FIELD_TYPES.NUMBER);
    };

    _this.subtype = config.subtype || _i18n.i18n.translate('common.ui.aggTypes.metrics.metricAggregationsSubtypeTitle', {
      defaultMessage: 'Metric Aggregations'
    });

    _this.isScalable = config.isScalable || function () {
      return false;
    };

    return _this;
  }

  return MetricAggType;
}(_agg_type.AggType);

exports.MetricAggType = MetricAggType;

function isMetricAggType(aggConfig) {
  return aggConfig && aggConfig.type === metricType;
}