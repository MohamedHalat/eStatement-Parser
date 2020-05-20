"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.siblingPipelineAggHelper = void 0;

var _i18n = require("@kbn/i18n");

var _sibling_pipeline_agg_writer = require("./sibling_pipeline_agg_writer");

var _sub_metric = require("../../../vis/editors/default/controls/sub_metric");

var _nested_agg_helpers = require("./nested_agg_helpers");

var _schemas = require("../../../vis/editors/default/schemas");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var metricAggFilter = ['!top_hits', '!percentiles', '!percentile_ranks', '!median', '!std_dev', '!sum_bucket', '!avg_bucket', '!min_bucket', '!max_bucket', '!derivative', '!moving_avg', '!serial_diff', '!cumulative_sum', '!geo_bounds', '!geo_centroid'];
var bucketAggFilter = [];

var _all = _slicedToArray(new _schemas.Schemas([{
  group: 'none',
  name: 'metricAgg',
  title: _i18n.i18n.translate('common.ui.aggTypes.metrics.metricAggTitle', {
    defaultMessage: 'Metric agg'
  }),
  aggFilter: metricAggFilter
}]).all, 1),
    metricAggSchema = _all[0];

var _all2 = _slicedToArray(new _schemas.Schemas([{
  group: 'none',
  title: _i18n.i18n.translate('common.ui.aggTypes.metrics.bucketAggTitle', {
    defaultMessage: 'Bucket agg'
  }),
  name: 'bucketAgg',
  aggFilter: bucketAggFilter
}]).all, 1),
    bucketAggSchema = _all2[0];

var siblingPipelineAggHelper = {
  subtype: _i18n.i18n.translate('common.ui.aggTypes.metrics.siblingPipelineAggregationsSubtypeTitle', {
    defaultMessage: 'Sibling pipeline aggregations'
  }),
  params: function params() {
    return [{
      name: 'customBucket',
      type: 'agg',
      default: null,
      makeAgg: function makeAgg(agg, state) {
        state = state || {
          type: 'date_histogram'
        };
        state.schema = bucketAggSchema;
        var orderAgg = agg.aggConfigs.createAggConfig(state, {
          addToAggConfigs: false
        });
        orderAgg.id = agg.id + '-bucket';
        return orderAgg;
      },
      editorComponent: _sub_metric.SubMetricParamEditor,
      modifyAggConfigOnSearchRequestStart: (0, _nested_agg_helpers.forwardModifyAggConfigOnSearchRequestStart)('customBucket'),
      write: function write() {}
    }, {
      name: 'customMetric',
      type: 'agg',
      default: null,
      makeAgg: function makeAgg(agg, state) {
        state = state || {
          type: 'count'
        };
        state.schema = metricAggSchema;
        var orderAgg = agg.aggConfigs.createAggConfig(state, {
          addToAggConfigs: false
        });
        orderAgg.id = agg.id + '-metric';
        return orderAgg;
      },
      editorComponent: _sub_metric.SubMetricParamEditor,
      modifyAggConfigOnSearchRequestStart: (0, _nested_agg_helpers.forwardModifyAggConfigOnSearchRequestStart)('customMetric'),
      write: _sibling_pipeline_agg_writer.siblingPipelineAggWriter
    }];
  },
  getFormat: function getFormat(agg) {
    var customMetric = agg.getParam('customMetric');
    return customMetric.type.getFormat(customMetric);
  }
};
exports.siblingPipelineAggHelper = siblingPipelineAggHelper;