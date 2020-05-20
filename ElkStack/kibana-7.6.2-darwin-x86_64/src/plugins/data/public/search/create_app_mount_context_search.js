"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAppMountSearchContext = void 0;

var _operators = require("rxjs/operators");

var _rxjs = require("rxjs");

var _search = require("../../common/search");

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
var createAppMountSearchContext = function createAppMountSearchContext(searchStrategies) {
  var getSearchStrategy = function getSearchStrategy(strategyName) {
    var strategyProvider = searchStrategies[strategyName ? strategyName : _search.DEFAULT_SEARCH_STRATEGY];

    if (!strategyProvider) {
      throw new Error("Strategy with name ".concat(strategyName, " does not exist"));
    }

    return strategyProvider(search);
  };

  var search = function search(request, options, strategyName) {
    var strategyPromise = getSearchStrategy(strategyName);
    return (0, _rxjs.from)(strategyPromise).pipe((0, _operators.mergeMap)(function (strategy) {
      return strategy.search(request, options);
    }));
  };

  return {
    search: search
  };
};

exports.createAppMountSearchContext = createAppMountSearchContext;