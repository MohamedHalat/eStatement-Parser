"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSearchSource = createSearchSource;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
function createSearchSource(SearchSource, initialState, indexPattern, aggs, useTimeFilter) {
  var filters = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];
  var timefilter = arguments.length > 6 ? arguments[6] : undefined;
  var searchSource = initialState ? new SearchSource(initialState) : new SearchSource(); // Do not not inherit from rootSearchSource to avoid picking up time and globals

  searchSource.setParent(undefined);
  searchSource.setField('filter', function () {
    var activeFilters = _toConsumableArray(filters);

    if (useTimeFilter) {
      var filter = timefilter.createFilter(indexPattern);

      if (filter) {
        activeFilters.push(filter);
      }
    }

    return activeFilters;
  });
  searchSource.setField('size', 0);
  searchSource.setField('index', indexPattern);
  searchSource.setField('aggs', aggs);
  return searchSource;
}