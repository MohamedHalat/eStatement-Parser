"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "IEsSearchRequest", {
  enumerable: true,
  get: function () {
    return _es_search.IEsSearchRequest;
  }
});
Object.defineProperty(exports, "IEsSearchResponse", {
  enumerable: true,
  get: function () {
    return _es_search.IEsSearchResponse;
  }
});
Object.defineProperty(exports, "ES_SEARCH_STRATEGY", {
  enumerable: true,
  get: function () {
    return _es_search.ES_SEARCH_STRATEGY;
  }
});
Object.defineProperty(exports, "IKibanaSearchResponse", {
  enumerable: true,
  get: function () {
    return _types.IKibanaSearchResponse;
  }
});
Object.defineProperty(exports, "IKibanaSearchRequest", {
  enumerable: true,
  get: function () {
    return _types.IKibanaSearchRequest;
  }
});
exports.DEFAULT_SEARCH_STRATEGY = void 0;

var _es_search = require("./es_search");

var _types = require("./types");

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
const DEFAULT_SEARCH_STRATEGY = _es_search.ES_SEARCH_STRATEGY;
exports.DEFAULT_SEARCH_STRATEGY = DEFAULT_SEARCH_STRATEGY;