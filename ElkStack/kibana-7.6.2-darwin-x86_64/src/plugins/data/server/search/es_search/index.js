"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.esSearchService = esSearchService;
Object.defineProperty(exports, "ES_SEARCH_STRATEGY", {
  enumerable: true,
  get: function () {
    return _search.ES_SEARCH_STRATEGY;
  }
});
Object.defineProperty(exports, "IEsSearchRequest", {
  enumerable: true,
  get: function () {
    return _search.IEsSearchRequest;
  }
});
Object.defineProperty(exports, "IEsSearchResponse", {
  enumerable: true,
  get: function () {
    return _search.IEsSearchResponse;
  }
});

var _es_search_service = require("./es_search_service");

var _search = require("../../../common/search");

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
function esSearchService(initializerContext) {
  return new _es_search_service.EsSearchService(initializerContext);
}