"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.percentileRanksMetricAgg = void 0;

var _i18n = require("@kbn/i18n");

var _new_platform = require("ui/new_platform");

var _percentile_ranks = require("../../vis/editors/default/controls/percentile_ranks");

var _metric_agg_type = require("./metric_agg_type");

var _get_response_agg_config_class = require("./lib/get_response_agg_config_class");

var _percentiles_get_value = require("./percentiles_get_value");

var _metric_agg_types = require("./metric_agg_types");

var _public = require("../../../../../plugins/data/public");

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var getFieldFormats = function getFieldFormats() {
  return _new_platform.npStart.plugins.data.fieldFormats;
};

var valueProps = {
  makeLabel: function makeLabel() {
    var fieldFormats = getFieldFormats();
    var field = this.getField();
    var format = field && field.format || fieldFormats.getDefaultInstance(_public.KBN_FIELD_TYPES.NUMBER);
    var customLabel = this.getParam('customLabel');
    var label = customLabel || this.getFieldDisplayName();
    return _i18n.i18n.translate('common.ui.aggTypes.metrics.percentileRanks.valuePropsLabel', {
      defaultMessage: 'Percentile rank {format} of "{label}"',
      values: {
        format: format.convert(this.key, 'text'),
        label: label
      }
    });
  }
};
var percentileRanksMetricAgg = new _metric_agg_type.MetricAggType({
  name: _metric_agg_types.METRIC_TYPES.PERCENTILE_RANKS,
  title: _i18n.i18n.translate('common.ui.aggTypes.metrics.percentileRanksTitle', {
    defaultMessage: 'Percentile Ranks'
  }),
  makeLabel: function makeLabel(agg) {
    return _i18n.i18n.translate('common.ui.aggTypes.metrics.percentileRanksLabel', {
      defaultMessage: 'Percentile ranks of {field}',
      values: {
        field: agg.getFieldDisplayName()
      }
    });
  },
  params: [{
    name: 'field',
    type: 'field',
    filterFieldTypes: _public.KBN_FIELD_TYPES.NUMBER
  }, {
    name: 'values',
    editorComponent: _percentile_ranks.PercentileRanksEditor,
    default: []
  }, {
    write: function write(agg, output) {
      output.params.keyed = false;
    }
  }],
  getResponseAggs: function getResponseAggs(agg) {
    var ValueAggConfig = (0, _get_response_agg_config_class.getResponseAggConfigClass)(agg, valueProps);
    var values = agg.getParam('values');
    return values.map(function (value) {
      return new ValueAggConfig(value);
    });
  },
  getFormat: function getFormat() {
    var fieldFormats = getFieldFormats();
    return fieldFormats.getInstance(_public.FIELD_FORMAT_IDS.PERCENT) || fieldFormats.getDefaultInstance(_public.KBN_FIELD_TYPES.NUMBER);
  },
  getValue: function getValue(agg, bucket) {
    return (0, _percentiles_get_value.getPercentileValue)(agg, bucket) / 100;
  }
});
exports.percentileRanksMetricAgg = percentileRanksMetricAgg;