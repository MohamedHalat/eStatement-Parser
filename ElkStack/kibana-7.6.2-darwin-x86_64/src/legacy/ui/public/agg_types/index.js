"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "setBounds", {
  enumerable: true,
  get: function get() {
    return _date_histogram.setBounds;
  }
});
Object.defineProperty(exports, "AggType", {
  enumerable: true,
  get: function get() {
    return _agg_type.AggType;
  }
});
Object.defineProperty(exports, "AggParam", {
  enumerable: true,
  get: function get() {
    return _agg_params.AggParam;
  }
});
Object.defineProperty(exports, "AggConfig", {
  enumerable: true,
  get: function get() {
    return _agg_config.AggConfig;
  }
});
Object.defineProperty(exports, "AggConfigs", {
  enumerable: true,
  get: function get() {
    return _agg_configs.AggConfigs;
  }
});
Object.defineProperty(exports, "FieldParamType", {
  enumerable: true,
  get: function get() {
    return _param_types.FieldParamType;
  }
});
exports.aggTypes = void 0;

var _count = require("./metrics/count");

var _avg = require("./metrics/avg");

var _sum = require("./metrics/sum");

var _median = require("./metrics/median");

var _min = require("./metrics/min");

var _max = require("./metrics/max");

var _top_hit = require("./metrics/top_hit");

var _std_deviation = require("./metrics/std_deviation");

var _cardinality = require("./metrics/cardinality");

var _percentiles = require("./metrics/percentiles");

var _geo_bounds = require("./metrics/geo_bounds");

var _geo_centroid = require("./metrics/geo_centroid");

var _percentile_ranks = require("./metrics/percentile_ranks");

var _derivative = require("./metrics/derivative");

var _cumulative_sum = require("./metrics/cumulative_sum");

var _moving_avg = require("./metrics/moving_avg");

var _serial_diff = require("./metrics/serial_diff");

var _date_histogram = require("./buckets/date_histogram");

var _histogram = require("./buckets/histogram");

var _range = require("./buckets/range");

var _date_range = require("./buckets/date_range");

var _ip_range = require("./buckets/ip_range");

var _terms = require("./buckets/terms");

var _filter = require("./buckets/filter");

var _filters = require("./buckets/filters");

var _significant_terms = require("./buckets/significant_terms");

var _geo_hash = require("./buckets/geo_hash");

var _geo_tile = require("./buckets/geo_tile");

var _bucket_sum = require("./metrics/bucket_sum");

var _bucket_avg = require("./metrics/bucket_avg");

var _bucket_min = require("./metrics/bucket_min");

var _bucket_max = require("./metrics/bucket_max");

var _agg_type = require("./agg_type");

var _agg_params = require("./agg_params");

var _agg_config = require("./agg_config");

var _agg_configs = require("./agg_configs");

var _param_types = require("./param_types");

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
var aggTypes = {
  metrics: [_count.countMetricAgg, _avg.avgMetricAgg, _sum.sumMetricAgg, _median.medianMetricAgg, _min.minMetricAgg, _max.maxMetricAgg, _std_deviation.stdDeviationMetricAgg, _cardinality.cardinalityMetricAgg, _percentiles.percentilesMetricAgg, _percentile_ranks.percentileRanksMetricAgg, _top_hit.topHitMetricAgg, _derivative.derivativeMetricAgg, _cumulative_sum.cumulativeSumMetricAgg, _moving_avg.movingAvgMetricAgg, _serial_diff.serialDiffMetricAgg, _bucket_avg.bucketAvgMetricAgg, _bucket_sum.bucketSumMetricAgg, _bucket_min.bucketMinMetricAgg, _bucket_max.bucketMaxMetricAgg, _geo_bounds.geoBoundsMetricAgg, _geo_centroid.geoCentroidMetricAgg],
  buckets: [_date_histogram.dateHistogramBucketAgg, _histogram.histogramBucketAgg, _range.rangeBucketAgg, _date_range.dateRangeBucketAgg, _ip_range.ipRangeBucketAgg, _terms.termsBucketAgg, _filter.filterBucketAgg, _filters.filtersBucketAgg, _significant_terms.significantTermsBucketAgg, _geo_hash.geoHashBucketAgg, _geo_tile.geoTileBucketAgg]
};
exports.aggTypes = aggTypes;