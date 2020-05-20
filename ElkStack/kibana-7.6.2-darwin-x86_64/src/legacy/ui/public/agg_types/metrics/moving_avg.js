"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.movingAvgMetricAgg = void 0;

var _i18n = require("@kbn/i18n");

var _metric_agg_type = require("./metric_agg_type");

var _parent_pipeline_agg_helper = require("./lib/parent_pipeline_agg_helper");

var _make_nested_label = require("./lib/make_nested_label");

var _metric_agg_types = require("./metric_agg_types");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var movingAvgTitle = _i18n.i18n.translate('common.ui.aggTypes.metrics.movingAvgTitle', {
  defaultMessage: 'Moving Avg'
});

var movingAvgLabel = _i18n.i18n.translate('common.ui.aggTypes.metrics.movingAvgLabel', {
  defaultMessage: 'moving avg'
});

var movingAvgMetricAgg = new _metric_agg_type.MetricAggType({
  name: _metric_agg_types.METRIC_TYPES.MOVING_FN,
  dslName: 'moving_fn',
  title: movingAvgTitle,
  subtype: _parent_pipeline_agg_helper.parentPipelineAggHelper.subtype,
  makeLabel: function makeLabel(agg) {
    return (0, _make_nested_label.makeNestedLabel)(agg, movingAvgLabel);
  },
  params: [].concat(_toConsumableArray(_parent_pipeline_agg_helper.parentPipelineAggHelper.params()), [{
    name: 'window',
    default: 5
  }, {
    name: 'script',
    default: 'MovingFunctions.unweightedAvg(values)'
  }]),
  getValue: function getValue(agg, bucket) {
    /**
     * The previous implementation using `moving_avg` did not
     * return any bucket in case there are no documents or empty window.
     * The `moving_fn` aggregation returns buckets with the value null if the
     * window is empty or doesn't return any value if the sibiling metric
     * is null. Since our generic MetricAggType.getValue implementation
     * would return the value 0 for null buckets, we need a specific
     * implementation here, that preserves the null value.
     */
    return bucket[agg.id] ? bucket[agg.id].value : null;
  },
  getFormat: _parent_pipeline_agg_helper.parentPipelineAggHelper.getFormat
});
exports.movingAvgMetricAgg = movingAvgMetricAgg;