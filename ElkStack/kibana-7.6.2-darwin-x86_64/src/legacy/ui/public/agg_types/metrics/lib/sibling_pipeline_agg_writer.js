"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.siblingPipelineAggWriter = void 0;

var _metric_agg_types = require("../metric_agg_types");

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
var siblingPipelineAggWriter = function siblingPipelineAggWriter(agg, output) {
  var customMetric = agg.getParam('customMetric');
  if (!customMetric) return;
  var metricAgg = customMetric;
  var bucketAgg = agg.getParam('customBucket'); // if a bucket is selected, we must add this agg as a sibling to it, and add a metric to that bucket (or select one of its)

  if (metricAgg.type.name !== _metric_agg_types.METRIC_TYPES.COUNT) {
    bucketAgg.subAggs = (output.subAggs || []).concat(metricAgg);
    output.params.buckets_path = "".concat(bucketAgg.id, ">").concat(metricAgg.id);
  } else {
    output.params.buckets_path = bucketAgg.id + '>_count';
  }

  output.parentAggs = (output.parentAggs || []).concat(bucketAgg);
};

exports.siblingPipelineAggWriter = siblingPipelineAggWriter;