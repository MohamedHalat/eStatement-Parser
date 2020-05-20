"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stdDeviationMetricAgg = void 0;

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _metric_agg_type = require("./metric_agg_type");

var _metric_agg_types = require("./metric_agg_types");

var _get_response_agg_config_class = require("./lib/get_response_agg_config_class");

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
var responseAggConfigProps = {
  valProp: function valProp() {
    var customLabel = this.getParam('customLabel');
    var details = this.keyedDetails(customLabel)[this.key];
    return details.valProp;
  },
  makeLabel: function makeLabel() {
    var fieldDisplayName = this.getFieldDisplayName();
    var customLabel = this.getParam('customLabel');
    var details = this.keyedDetails(customLabel, fieldDisplayName);
    return (0, _lodash.get)(details, [this.key, 'title']);
  },
  keyedDetails: function keyedDetails(customLabel, fieldDisplayName) {
    var label = customLabel || _i18n.i18n.translate('common.ui.aggTypes.metrics.standardDeviation.keyDetailsLabel', {
      defaultMessage: 'Standard Deviation of {fieldDisplayName}',
      values: {
        fieldDisplayName: fieldDisplayName
      }
    });

    return {
      std_lower: {
        valProp: ['std_deviation_bounds', 'lower'],
        title: _i18n.i18n.translate('common.ui.aggTypes.metrics.standardDeviation.lowerKeyDetailsTitle', {
          defaultMessage: 'Lower {label}',
          values: {
            label: label
          }
        })
      },
      std_upper: {
        valProp: ['std_deviation_bounds', 'upper'],
        title: _i18n.i18n.translate('common.ui.aggTypes.metrics.standardDeviation.upperKeyDetailsTitle', {
          defaultMessage: 'Upper {label}',
          values: {
            label: label
          }
        })
      }
    };
  }
};
var stdDeviationMetricAgg = new _metric_agg_type.MetricAggType({
  name: _metric_agg_types.METRIC_TYPES.STD_DEV,
  dslName: 'extended_stats',
  title: _i18n.i18n.translate('common.ui.aggTypes.metrics.standardDeviationTitle', {
    defaultMessage: 'Standard Deviation'
  }),
  makeLabel: function makeLabel(agg) {
    return _i18n.i18n.translate('common.ui.aggTypes.metrics.standardDeviationLabel', {
      defaultMessage: 'Standard Deviation of {field}',
      values: {
        field: agg.getFieldDisplayName()
      }
    });
  },
  params: [{
    name: 'field',
    type: 'field',
    filterFieldTypes: _public.KBN_FIELD_TYPES.NUMBER
  }],
  getResponseAggs: function getResponseAggs(agg) {
    var ValueAggConfig = (0, _get_response_agg_config_class.getResponseAggConfigClass)(agg, responseAggConfigProps);
    return [new ValueAggConfig('std_lower'), new ValueAggConfig('std_upper')];
  },
  getValue: function getValue(agg, bucket) {
    return (0, _lodash.get)(bucket[agg.parentId], agg.valProp());
  }
});
exports.stdDeviationMetricAgg = stdDeviationMetricAgg;