"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.histogramBucketAgg = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _i18n = require("@kbn/i18n");

var _notify = require("ui/notify");

var _new_platform = require("ui/new_platform");

var _bucket_agg_type = require("./_bucket_agg_type");

var _histogram = require("./create_filter/histogram");

var _number_interval = require("../../vis/editors/default/controls/number_interval");

var _min_doc_count = require("../../vis/editors/default/controls/min_doc_count");

var _has_extended_bounds = require("../../vis/editors/default/controls/has_extended_bounds");

var _extended_bounds = require("../../vis/editors/default/controls/extended_bounds");

var _public = require("../../../../../plugins/data/public");

var _bucket_agg_types = require("./bucket_agg_types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var getUIConfig = function getUIConfig() {
  return _new_platform.npStart.core.uiSettings;
};

var histogramBucketAgg = new _bucket_agg_type.BucketAggType({
  name: _bucket_agg_types.BUCKET_TYPES.HISTOGRAM,
  title: _i18n.i18n.translate('common.ui.aggTypes.buckets.histogramTitle', {
    defaultMessage: 'Histogram'
  }),
  ordered: {},
  makeLabel: function makeLabel(aggConfig) {
    return aggConfig.getFieldDisplayName();
  },
  createFilter: _histogram.createFilterHistogram,
  decorateAggConfig: function decorateAggConfig() {
    var autoBounds;
    return {
      setAutoBounds: {
        configurable: true,
        value: function value(newValue) {
          autoBounds = newValue;
        }
      },
      getAutoBounds: {
        configurable: true,
        value: function value() {
          return autoBounds;
        }
      }
    };
  },
  params: [{
    name: 'field',
    type: 'field',
    filterFieldTypes: _public.KBN_FIELD_TYPES.NUMBER
  }, {
    /*
     * This parameter can be set if you want the auto scaled interval to always
     * be a multiple of a specific base.
     */
    name: 'intervalBase',
    default: null,
    write: function write() {}
  }, {
    name: 'interval',
    editorComponent: _number_interval.NumberIntervalParamEditor,
    modifyAggConfigOnSearchRequestStart: function modifyAggConfigOnSearchRequestStart(aggConfig, searchSource, options) {
      var field = aggConfig.getField();
      var aggBody = field.scripted ? {
        script: {
          source: field.script,
          lang: field.lang
        }
      } : {
        field: field.name
      };
      var childSearchSource = searchSource.createChild().setField('size', 0).setField('aggs', {
        maxAgg: {
          max: aggBody
        },
        minAgg: {
          min: aggBody
        }
      });
      return childSearchSource.fetch(options).then(function (resp) {
        aggConfig.setAutoBounds({
          min: _lodash.default.get(resp, 'aggregations.minAgg.value'),
          max: _lodash.default.get(resp, 'aggregations.maxAgg.value')
        });
      }).catch(function (e) {
        if (e.name === 'AbortError') return;

        _notify.toastNotifications.addWarning(_i18n.i18n.translate('common.ui.aggTypes.histogram.missingMaxMinValuesWarning', {
          defaultMessage: 'Unable to retrieve max and min values to auto-scale histogram buckets. This may lead to poor visualization performance.'
        }));
      });
    },
    write: function write(aggConfig, output) {
      var interval = parseFloat(aggConfig.params.interval);

      if (interval <= 0) {
        interval = 1;
      }

      var autoBounds = aggConfig.getAutoBounds(); // ensure interval does not create too many buckets and crash browser

      if (autoBounds) {
        var range = autoBounds.max - autoBounds.min;
        var bars = range / interval;
        var config = getUIConfig();

        if (bars > config.get('histogram:maxBars')) {
          var minInterval = range / config.get('histogram:maxBars'); // Round interval by order of magnitude to provide clean intervals
          // Always round interval up so there will always be less buckets than histogram:maxBars

          var orderOfMagnitude = Math.pow(10, Math.floor(Math.log10(minInterval)));
          var roundInterval = orderOfMagnitude;

          while (roundInterval < minInterval) {
            roundInterval += orderOfMagnitude;
          }

          interval = roundInterval;
        }
      }

      var base = aggConfig.params.intervalBase;

      if (base) {
        if (interval < base) {
          // In case the specified interval is below the base, just increase it to it's base
          interval = base;
        } else if (interval % base !== 0) {
          // In case the interval is not a multiple of the base round it to the next base
          interval = Math.round(interval / base) * base;
        }
      }

      output.params.interval = interval;
    }
  }, {
    name: 'min_doc_count',
    default: false,
    editorComponent: _min_doc_count.MinDocCountParamEditor,
    write: function write(aggConfig, output) {
      if (aggConfig.params.min_doc_count) {
        output.params.min_doc_count = 0;
      } else {
        output.params.min_doc_count = 1;
      }
    }
  }, {
    name: 'has_extended_bounds',
    default: false,
    editorComponent: _has_extended_bounds.HasExtendedBoundsParamEditor,
    write: function write() {}
  }, {
    name: 'extended_bounds',
    default: {
      min: '',
      max: ''
    },
    editorComponent: _extended_bounds.ExtendedBoundsParamEditor,
    write: function write(aggConfig, output) {
      var _aggConfig$params$ext = aggConfig.params.extended_bounds,
          min = _aggConfig$params$ext.min,
          max = _aggConfig$params$ext.max;

      if (aggConfig.params.has_extended_bounds && (min || min === 0) && (max || max === 0)) {
        output.params.extended_bounds = {
          min: min,
          max: max
        };
      }
    },
    shouldShow: function shouldShow(aggConfig) {
      return aggConfig.params.has_extended_bounds;
    }
  }]
});
exports.histogramBucketAgg = histogramBucketAgg;