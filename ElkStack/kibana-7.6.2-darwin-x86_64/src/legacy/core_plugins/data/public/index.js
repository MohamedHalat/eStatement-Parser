"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  plugin: true,
  DataStart: true,
  EsQuerySortValue: true,
  FetchOptions: true,
  ISearchSource: true,
  SortDirection: true,
  SearchSourceFields: true,
  SavedQueryAttributes: true,
  SavedQuery: true,
  SavedQueryTimeFilter: true,
  FilterStateManager: true,
  getRequestInspectorStats: true,
  getResponseInspectorStats: true
};
exports.plugin = plugin;
Object.defineProperty(exports, "DataStart", {
  enumerable: true,
  get: function get() {
    return _plugin.DataStart;
  }
});
Object.defineProperty(exports, "EsQuerySortValue", {
  enumerable: true,
  get: function get() {
    return _types.EsQuerySortValue;
  }
});
Object.defineProperty(exports, "FetchOptions", {
  enumerable: true,
  get: function get() {
    return _types.FetchOptions;
  }
});
Object.defineProperty(exports, "ISearchSource", {
  enumerable: true,
  get: function get() {
    return _types.ISearchSource;
  }
});
Object.defineProperty(exports, "SortDirection", {
  enumerable: true,
  get: function get() {
    return _types.SortDirection;
  }
});
Object.defineProperty(exports, "SearchSourceFields", {
  enumerable: true,
  get: function get() {
    return _types.SearchSourceFields;
  }
});
Object.defineProperty(exports, "SavedQueryAttributes", {
  enumerable: true,
  get: function get() {
    return _public.SavedQueryAttributes;
  }
});
Object.defineProperty(exports, "SavedQuery", {
  enumerable: true,
  get: function get() {
    return _public.SavedQuery;
  }
});
Object.defineProperty(exports, "SavedQueryTimeFilter", {
  enumerable: true,
  get: function get() {
    return _public.SavedQueryTimeFilter;
  }
});
Object.defineProperty(exports, "FilterStateManager", {
  enumerable: true,
  get: function get() {
    return _filter_manager.FilterStateManager;
  }
});
Object.defineProperty(exports, "getRequestInspectorStats", {
  enumerable: true,
  get: function get() {
    return _search.getRequestInspectorStats;
  }
});
Object.defineProperty(exports, "getResponseInspectorStats", {
  enumerable: true,
  get: function get() {
    return _search.getResponseInspectorStats;
  }
});

var _plugin = require("./plugin");

var _types = require("./search/types");

var _public = require("../../../../plugins/data/public");

var _common = require("../common");

Object.keys(_common).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _common[key];
    }
  });
});

var _filter_manager = require("./filter/filter_manager");

var _search = require("./search");

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
// /// Define plugin function
function plugin() {
  return new _plugin.DataPlugin();
} // /// Export types & static code

/** @public types */