"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bucketAvgMetricAgg = void 0;

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _metric_agg_type = require("./metric_agg_type");

var _make_nested_label = require("./lib/make_nested_label");

var _sibling_pipeline_agg_helper = require("./lib/sibling_pipeline_agg_helper");

var _metric_agg_types = require("./metric_agg_types");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var overallAverageLabel = _i18n.i18n.translate('common.ui.aggTypes.metrics.overallAverageLabel', {
  defaultMessage: 'overall average'
});

var averageBucketTitle = _i18n.i18n.translate('common.ui.aggTypes.metrics.averageBucketTitle', {
  defaultMessage: 'Average Bucket'
});

var bucketAvgMetricAgg = new _metric_agg_type.MetricAggType({
  name: _metric_agg_types.METRIC_TYPES.AVG_BUCKET,
  title: averageBucketTitle,
  makeLabel: function makeLabel(agg) {
    return (0, _make_nested_label.makeNestedLabel)(agg, overallAverageLabel);
  },
  subtype: _sibling_pipeline_agg_helper.siblingPipelineAggHelper.subtype,
  params: _toConsumableArray(_sibling_pipeline_agg_helper.siblingPipelineAggHelper.params()),
  getFormat: _sibling_pipeline_agg_helper.siblingPipelineAggHelper.getFormat,
  getValue: function getValue(agg, bucket) {
    var customMetric = agg.getParam('customMetric');
    var customBucket = agg.getParam('customBucket');
    var scaleMetrics = customMetric.type && customMetric.type.isScalable();
    var value = bucket[agg.id] && bucket[agg.id].value;

    if (scaleMetrics && customBucket.type.name === 'date_histogram') {
      var aggInfo = customBucket.write();
      value *= (0, _lodash.get)(aggInfo, 'bucketInterval.scale', 1);
    }

    return value;
  }
});
exports.bucketAvgMetricAgg = bucketAvgMetricAgg;