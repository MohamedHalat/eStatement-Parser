"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapRange = exports.isMapRangeFilter = void 0;

var _lodash = require("lodash");

var _common = require("../../../../../common");

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
var getFormattedValueFn = function getFormattedValueFn(left, right) {
  return function (formatter) {
    var displayValue = "".concat(left, " to ").concat(right);

    if (formatter) {
      var convert = formatter.getConverterFor('text');
      displayValue = "".concat(convert(left), " to ").concat(convert(right));
    }

    return displayValue;
  };
};

var getFirstRangeKey = function getFirstRangeKey(filter) {
  return filter.range && Object.keys(filter.range)[0];
};

var getRangeByKey = function getRangeByKey(filter, key) {
  return (0, _lodash.get)(filter, ['range', key]);
};

function getParams(filter) {
  var isScriptedRange = _common.esFilters.isScriptedRangeFilter(filter);

  var key = (isScriptedRange ? filter.meta.field : getFirstRangeKey(filter)) || '';
  var params = isScriptedRange ? (0, _lodash.get)(filter, 'script.script.params') : getRangeByKey(filter, key);
  var left = (0, _lodash.has)(params, 'gte') ? params.gte : params.gt;
  if (left == null) left = -Infinity;
  var right = (0, _lodash.has)(params, 'lte') ? params.lte : params.lt;
  if (right == null) right = Infinity;
  var value = getFormattedValueFn(left, right);
  return {
    type: _common.esFilters.FILTERS.RANGE,
    key: key,
    value: value,
    params: params
  };
}

var isMapRangeFilter = function isMapRangeFilter(filter) {
  return _common.esFilters.isRangeFilter(filter) || _common.esFilters.isScriptedRangeFilter(filter);
};

exports.isMapRangeFilter = isMapRangeFilter;

var mapRange = function mapRange(filter) {
  if (!isMapRangeFilter(filter)) {
    throw filter;
  }

  return getParams(filter);
};

exports.mapRange = mapRange;