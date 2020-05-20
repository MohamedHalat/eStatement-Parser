"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serialDiffMetricAgg = void 0;

var _i18n = require("@kbn/i18n");

var _metric_agg_type = require("./metric_agg_type");

var _parent_pipeline_agg_helper = require("./lib/parent_pipeline_agg_helper");

var _make_nested_label = require("./lib/make_nested_label");

var _metric_agg_types = require("./metric_agg_types");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var serialDiffTitle = _i18n.i18n.translate('common.ui.aggTypes.metrics.serialDiffTitle', {
  defaultMessage: 'Serial Diff'
});

var serialDiffLabel = _i18n.i18n.translate('common.ui.aggTypes.metrics.serialDiffLabel', {
  defaultMessage: 'serial diff'
});

var serialDiffMetricAgg = new _metric_agg_type.MetricAggType({
  name: _metric_agg_types.METRIC_TYPES.SERIAL_DIFF,
  title: serialDiffTitle,
  subtype: _parent_pipeline_agg_helper.parentPipelineAggHelper.subtype,
  makeLabel: function makeLabel(agg) {
    return (0, _make_nested_label.makeNestedLabel)(agg, serialDiffLabel);
  },
  params: _toConsumableArray(_parent_pipeline_agg_helper.parentPipelineAggHelper.params()),
  getFormat: _parent_pipeline_agg_helper.parentPipelineAggHelper.getFormat
});
exports.serialDiffMetricAgg = serialDiffMetricAgg;