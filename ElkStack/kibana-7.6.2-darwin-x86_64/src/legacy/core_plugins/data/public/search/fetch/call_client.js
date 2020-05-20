"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callClient = callClient;

var _lodash = require("lodash");

var _search_strategy = require("../search_strategy");

var _handle_response = require("./handle_response");

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
function callClient(searchRequests) {
  var requestsOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var _ref = arguments.length > 2 ? arguments[2] : undefined,
      es = _ref.es,
      config = _ref.config,
      esShardTimeout = _ref.esShardTimeout;

  // Correlate the options with the request that they're associated with
  var requestOptionEntries = searchRequests.map(function (request, i) {
    return [request, requestsOptions[i]];
  });
  var requestOptionsMap = new Map(requestOptionEntries); // Group the requests by the strategy used to search that specific request

  var searchStrategyMap = (0, _lodash.groupBy)(searchRequests, function (request, i) {
    var searchStrategy = (0, _search_strategy.getSearchStrategyForSearchRequest)(request, requestsOptions[i]);
    return searchStrategy.id;
  }); // Execute each search strategy with the group of requests, but return the responses in the same
  // order in which they were received. We use a map to correlate the original request with its
  // response.

  var requestResponseMap = new Map();
  Object.keys(searchStrategyMap).forEach(function (searchStrategyId) {
    var searchStrategy = (0, _search_strategy.getSearchStrategyById)(searchStrategyId);
    var requests = searchStrategyMap[searchStrategyId]; // There's no way `searchStrategy` could be undefined here because if we didn't get a matching strategy for this ID
    // then an error would have been thrown above

    var _search = searchStrategy.search({
      searchRequests: requests,
      es: es,
      config: config,
      esShardTimeout: esShardTimeout
    }),
        searching = _search.searching,
        abort = _search.abort;

    requests.forEach(function (request, i) {
      var response = searching.then(function (results) {
        return (0, _handle_response.handleResponse)(request, results[i]);
      });

      var _ref2 = requestOptionsMap.get(request) || {},
          _ref2$abortSignal = _ref2.abortSignal,
          abortSignal = _ref2$abortSignal === void 0 ? null : _ref2$abortSignal;

      if (abortSignal) abortSignal.addEventListener('abort', abort);
      requestResponseMap.set(request, response);
    });
  }, []);
  return searchRequests.map(function (request) {
    return requestResponseMap.get(request);
  });
}