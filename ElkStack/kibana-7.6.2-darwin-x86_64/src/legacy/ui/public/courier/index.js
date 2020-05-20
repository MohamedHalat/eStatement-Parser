"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ISearchSource", {
  enumerable: true,
  get: function get() {
    return _public.ISearchSource;
  }
});
Object.defineProperty(exports, "EsQuerySortValue", {
  enumerable: true,
  get: function get() {
    return _public.EsQuerySortValue;
  }
});
Object.defineProperty(exports, "FetchOptions", {
  enumerable: true,
  get: function get() {
    return _public.FetchOptions;
  }
});
Object.defineProperty(exports, "SortDirection", {
  enumerable: true,
  get: function get() {
    return _public.SortDirection;
  }
});
Object.defineProperty(exports, "getRequestInspectorStats", {
  enumerable: true,
  get: function get() {
    return _public.getRequestInspectorStats;
  }
});
Object.defineProperty(exports, "getResponseInspectorStats", {
  enumerable: true,
  get: function get() {
    return _public.getResponseInspectorStats;
  }
});
Object.defineProperty(exports, "addSearchStrategy", {
  enumerable: true,
  get: function get() {
    return _search_strategy.addSearchStrategy;
  }
});
Object.defineProperty(exports, "getSearchErrorType", {
  enumerable: true,
  get: function get() {
    return _search_strategy.getSearchErrorType;
  }
});
Object.defineProperty(exports, "hasSearchStategyForIndexPattern", {
  enumerable: true,
  get: function get() {
    return _search_strategy.hasSearchStategyForIndexPattern;
  }
});
Object.defineProperty(exports, "isDefaultTypeIndexPattern", {
  enumerable: true,
  get: function get() {
    return _search_strategy.isDefaultTypeIndexPattern;
  }
});
Object.defineProperty(exports, "SearchError", {
  enumerable: true,
  get: function get() {
    return _search_strategy.SearchError;
  }
});
exports.SearchSource = exports.defaultSearchStrategy = void 0;

var _legacy = require("../../../core_plugins/data/public/legacy");

var _public = require("../../../core_plugins/data/public");

var _search_strategy = require("../../../core_plugins/data/public/search/search_strategy");

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

/**
 * Nothing to see here!
 *
 * Courier / SearchSource has moved to the data plugin, and is being
 * re-exported from ui/courier for backwards compatibility.
 */
// runtime contracts
var _dataStart$search = _legacy.start.search,
    defaultSearchStrategy = _dataStart$search.defaultSearchStrategy,
    SearchSource = _dataStart$search.SearchSource; // types

/* eslint-enable @kbn/eslint/no-restricted-paths */

exports.SearchSource = SearchSource;
exports.defaultSearchStrategy = defaultSearchStrategy;