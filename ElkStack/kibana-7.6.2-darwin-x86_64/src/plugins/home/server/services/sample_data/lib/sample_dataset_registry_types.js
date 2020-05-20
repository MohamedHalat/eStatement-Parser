"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmbeddableTypes = exports.DatasetStatusTypes = void 0;

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
let DatasetStatusTypes;
exports.DatasetStatusTypes = DatasetStatusTypes;

(function (DatasetStatusTypes) {
  DatasetStatusTypes["NOT_INSTALLED"] = "not_installed";
  DatasetStatusTypes["INSTALLED"] = "installed";
  DatasetStatusTypes["UNKNOWN"] = "unknown";
})(DatasetStatusTypes || (exports.DatasetStatusTypes = DatasetStatusTypes = {}));

let EmbeddableTypes;
exports.EmbeddableTypes = EmbeddableTypes;

(function (EmbeddableTypes) {
  EmbeddableTypes["MAP_SAVED_OBJECT_TYPE"] = "map";
  EmbeddableTypes["SEARCH_EMBEDDABLE_TYPE"] = "search";
  EmbeddableTypes["VISUALIZE_EMBEDDABLE_TYPE"] = "visualization";
})(EmbeddableTypes || (exports.EmbeddableTypes = EmbeddableTypes = {}));