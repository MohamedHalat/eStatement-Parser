"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createVegaRequestHandler = createVegaRequestHandler;

var _public = require("../../../../plugins/data/public");

var _vega_parser = require("./data_model/vega_parser");

var _search_cache = require("./data_model/search_cache");

var _time_cache = require("./data_model/time_cache");

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
// @ts-ignore
// @ts-ignore
// @ts-ignore
function createVegaRequestHandler(_ref) {
  var es = _ref.es,
      plugins = _ref.plugins,
      uiSettings = _ref.core.uiSettings,
      serviceSettings = _ref.serviceSettings;
  var searchCache = new _search_cache.SearchCache(es, {
    max: 10,
    maxAge: 4 * 1000
  });
  var timefilter = plugins.data.query.timefilter.timefilter;
  var timeCache = new _time_cache.TimeCache(timefilter, 3 * 1000);
  return function (_ref2) {
    var timeRange = _ref2.timeRange,
        filters = _ref2.filters,
        query = _ref2.query,
        visParams = _ref2.visParams;
    timeCache.setTimeRange(timeRange);

    var esQueryConfigs = _public.esQuery.getEsQueryConfig(uiSettings);

    var filtersDsl = _public.esQuery.buildEsQuery(undefined, query, filters, esQueryConfigs);

    var vp = new _vega_parser.VegaParser(visParams.spec, searchCache, timeCache, filtersDsl, serviceSettings);
    return vp.parseAsync();
  };
}