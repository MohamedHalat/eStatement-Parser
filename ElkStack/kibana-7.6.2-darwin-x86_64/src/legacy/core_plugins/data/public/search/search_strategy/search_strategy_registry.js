"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasSearchStategyForIndexPattern = exports.getSearchStrategyForSearchRequest = exports.getSearchStrategyById = exports.getSearchStrategyByViability = exports.addSearchStrategy = exports.searchStrategies = void 0;

var _no_op_search_strategy = require("./no_op_search_strategy");

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
var searchStrategies = [];
exports.searchStrategies = searchStrategies;

var addSearchStrategy = function addSearchStrategy(searchStrategy) {
  if (searchStrategies.includes(searchStrategy)) {
    return;
  }

  searchStrategies.push(searchStrategy);
};

exports.addSearchStrategy = addSearchStrategy;

var getSearchStrategyByViability = function getSearchStrategyByViability(indexPattern) {
  return searchStrategies.find(function (searchStrategy) {
    return searchStrategy.isViable(indexPattern);
  });
};

exports.getSearchStrategyByViability = getSearchStrategyByViability;

var getSearchStrategyById = function getSearchStrategyById(searchStrategyId) {
  return [].concat(searchStrategies, [_no_op_search_strategy.noOpSearchStrategy]).find(function (searchStrategy) {
    return searchStrategy.id === searchStrategyId;
  });
};

exports.getSearchStrategyById = getSearchStrategyById;

var getSearchStrategyForSearchRequest = function getSearchStrategyForSearchRequest(searchRequest) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      searchStrategyId = _ref.searchStrategyId;

  // Allow the searchSource to declare the correct strategy with which to execute its searches.
  if (searchStrategyId != null) {
    var strategy = getSearchStrategyById(searchStrategyId);
    if (!strategy) throw Error("No strategy with ID ".concat(searchStrategyId));
    return strategy;
  } // Otherwise try to match it to a strategy.


  var viableSearchStrategy = getSearchStrategyByViability(searchRequest.index);

  if (viableSearchStrategy) {
    return viableSearchStrategy;
  } // This search strategy automatically rejects with an error.


  return _no_op_search_strategy.noOpSearchStrategy;
};

exports.getSearchStrategyForSearchRequest = getSearchStrategyForSearchRequest;

var hasSearchStategyForIndexPattern = function hasSearchStategyForIndexPattern(indexPattern) {
  return Boolean(getSearchStrategyByViability(indexPattern));
};

exports.hasSearchStategyForIndexPattern = hasSearchStategyForIndexPattern;