"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parentPipelineAggHelper = void 0;

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _metric_agg = require("../../../vis/editors/default/controls/metric_agg");

var _sub_agg = require("../../../vis/editors/default/controls/sub_agg");

var _nested_agg_helpers = require("./nested_agg_helpers");

var _parent_pipeline_agg_writer = require("./parent_pipeline_agg_writer");

var _schemas = require("../../../vis/editors/default/schemas");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var metricAggFilter = ['!top_hits', '!percentiles', '!percentile_ranks', '!median', '!std_dev', '!geo_bounds', '!geo_centroid'];

var metricAggTitle = _i18n.i18n.translate('common.ui.aggTypes.metrics.metricAggTitle', {
  defaultMessage: 'Metric agg'
});

var subtypeLabel = _i18n.i18n.translate('common.ui.aggTypes.metrics.parentPipelineAggregationsSubtypeTitle', {
  defaultMessage: 'Parent Pipeline Aggregations'
});

var _all = _slicedToArray(new _schemas.Schemas([{
  group: 'none',
  name: 'metricAgg',
  title: metricAggTitle,
  hideCustomLabel: true,
  aggFilter: metricAggFilter
}]).all, 1),
    metricAggSchema = _all[0];

var parentPipelineAggHelper = {
  subtype: subtypeLabel,
  params: function params() {
    return [{
      name: 'metricAgg',
      editorComponent: _metric_agg.MetricAggParamEditor,
      default: 'custom',
      write: _parent_pipeline_agg_writer.parentPipelineAggWriter
    }, {
      name: 'customMetric',
      editorComponent: _sub_agg.SubAggParamEditor,
      type: 'agg',
      makeAgg: function makeAgg(termsAgg, state) {
        state = state || {
          type: 'count'
        };
        state.schema = metricAggSchema;
        var metricAgg = termsAgg.aggConfigs.createAggConfig(state, {
          addToAggConfigs: false
        });
        metricAgg.id = termsAgg.id + '-metric';
        return metricAgg;
      },
      modifyAggConfigOnSearchRequestStart: (0, _nested_agg_helpers.forwardModifyAggConfigOnSearchRequestStart)('customMetric'),
      write: _lodash.noop
    }, {
      name: 'buckets_path',
      write: _lodash.noop
    }];
  },
  getFormat: function getFormat(agg) {
    var subAgg;
    var customMetric = agg.getParam('customMetric');

    if (customMetric) {
      subAgg = customMetric;
    } else {
      subAgg = agg.aggConfigs.byId(agg.getParam('metricAgg'));
    }

    return subAgg.type.getFormat(subAgg);
  }
};
exports.parentPipelineAggHelper = parentPipelineAggHelper;