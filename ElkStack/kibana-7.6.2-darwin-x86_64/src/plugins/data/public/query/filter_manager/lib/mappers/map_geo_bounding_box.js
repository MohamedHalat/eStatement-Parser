"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapGeoBoundingBox = void 0;

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
var getFormattedValueFn = function getFormattedValueFn(params) {
  return function (formatter) {
    var corners = formatter ? {
      topLeft: formatter.convert(params.top_left),
      bottomRight: formatter.convert(params.bottom_right)
    } : {
      topLeft: JSON.stringify(params.top_left),
      bottomRight: JSON.stringify(params.bottom_right)
    };
    return corners.topLeft + ' to ' + corners.bottomRight;
  };
};

var getParams = function getParams(filter) {
  var key = Object.keys(filter.geo_bounding_box).filter(function (k) {
    return k !== 'ignore_unmapped';
  })[0];
  var params = filter.geo_bounding_box[key];
  return {
    key: key,
    params: params,
    type: _common.esFilters.FILTERS.GEO_BOUNDING_BOX,
    value: getFormattedValueFn(params)
  };
};

var mapGeoBoundingBox = function mapGeoBoundingBox(filter) {
  if (!_common.esFilters.isGeoBoundingBoxFilter(filter)) {
    throw filter;
  }

  return getParams(filter);
};

exports.mapGeoBoundingBox = mapGeoBoundingBox;