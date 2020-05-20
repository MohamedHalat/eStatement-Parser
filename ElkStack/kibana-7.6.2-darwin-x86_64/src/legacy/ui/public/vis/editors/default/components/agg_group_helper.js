"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isInvalidAggsTouched = isInvalidAggsTouched;
exports.getEnabledMetricAggsCount = exports.calcAggIsTooLow = exports.isAggRemovable = void 0;

var _lodash = require("lodash");

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
var isAggRemovable = function isAggRemovable(agg, group) {
  var metricCount = group.reduce(function (count, aggregation) {
    return aggregation.schema.name === agg.schema.name ? ++count : count;
  }, 0); // make sure the the number of these aggs is above the min

  return metricCount > agg.schema.min;
};

exports.isAggRemovable = isAggRemovable;

var getEnabledMetricAggsCount = function getEnabledMetricAggsCount(group) {
  return group.reduce(function (count, aggregation) {
    return aggregation.schema.name === 'metric' && aggregation.enabled ? ++count : count;
  }, 0);
};

exports.getEnabledMetricAggsCount = getEnabledMetricAggsCount;

var calcAggIsTooLow = function calcAggIsTooLow(agg, aggIndex, group) {
  if (!agg.schema.mustBeFirst) {
    return false;
  }

  var firstDifferentSchema = (0, _lodash.findIndex)(group, function (aggr) {
    return aggr.schema !== agg.schema;
  });

  if (firstDifferentSchema === -1) {
    return false;
  }

  return aggIndex > firstDifferentSchema;
};

exports.calcAggIsTooLow = calcAggIsTooLow;

function isInvalidAggsTouched(aggsState) {
  var invalidAggs = Object.values(aggsState).filter(function (agg) {
    return !agg.valid;
  });

  if ((0, _lodash.isEmpty)(invalidAggs)) {
    return false;
  }

  return invalidAggs.every(function (agg) {
    return agg.touched;
  });
}