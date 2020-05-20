"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.percentilesMetricAgg = void 0;

var _i18n = require("@kbn/i18n");

var _metric_agg_type = require("./metric_agg_type");

var _metric_agg_types = require("./metric_agg_types");

var _public = require("../../../../../plugins/data/public");

var _get_response_agg_config_class = require("./lib/get_response_agg_config_class");

var _percentiles_get_value = require("./percentiles_get_value");

var _percentiles = require("../../vis/editors/default/controls/percentiles");

var _ordinal_suffix = require("./lib/ordinal_suffix");

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
// @ts-ignore
var valueProps = {
  makeLabel: function makeLabel() {
    var customLabel = this.getParam('customLabel');
    var label = customLabel || this.getFieldDisplayName();
    return _i18n.i18n.translate('common.ui.aggTypes.metrics.percentiles.valuePropsLabel', {
      defaultMessage: '{percentile} percentile of {label}',
      values: {
        percentile: (0, _ordinal_suffix.ordinalSuffix)(this.key),
        label: label
      }
    });
  }
};
var percentilesMetricAgg = new _metric_agg_type.MetricAggType({
  name: _metric_agg_types.METRIC_TYPES.PERCENTILES,
  title: _i18n.i18n.translate('common.ui.aggTypes.metrics.percentilesTitle', {
    defaultMessage: 'Percentiles'
  }),
  makeLabel: function makeLabel(agg) {
    return _i18n.i18n.translate('common.ui.aggTypes.metrics.percentilesLabel', {
      defaultMessage: 'Percentiles of {field}',
      values: {
        field: agg.getFieldDisplayName()
      }
    });
  },
  params: [{
    name: 'field',
    type: 'field',
    filterFieldTypes: [_public.KBN_FIELD_TYPES.NUMBER, _public.KBN_FIELD_TYPES.DATE]
  }, {
    name: 'percents',
    editorComponent: _percentiles.PercentilesEditor,
    default: [1, 5, 25, 50, 75, 95, 99]
  }, {
    write: function write(agg, output) {
      output.params.keyed = false;
    }
  }],
  getResponseAggs: function getResponseAggs(agg) {
    var ValueAggConfig = (0, _get_response_agg_config_class.getResponseAggConfigClass)(agg, valueProps);
    return agg.getParam('percents').map(function (percent) {
      return new ValueAggConfig(percent);
    });
  },
  getValue: _percentiles_get_value.getPercentileValue
});
exports.percentilesMetricAgg = percentilesMetricAgg;