"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Vis", {
  enumerable: true,
  get: function get() {
    return _vis.Vis;
  }
});
Object.defineProperty(exports, "VisParams", {
  enumerable: true,
  get: function get() {
    return _vis.VisParams;
  }
});
Object.defineProperty(exports, "VisOptionsProps", {
  enumerable: true,
  get: function get() {
    return _default.VisOptionsProps;
  }
});
Object.defineProperty(exports, "ValidatedDualRange", {
  enumerable: true,
  get: function get() {
    return _validated_range.ValidatedDualRange;
  }
});
Object.defineProperty(exports, "SearchSourceFields", {
  enumerable: true,
  get: function get() {
    return _public.SearchSourceFields;
  }
});
exports.SearchSource = void 0;

var _courier = require("ui/courier");

var _vis = require("ui/vis");

var _default = require("ui/vis/editors/default");

var _validated_range = require("ui/validated_range");

var _public = require("../../data/public");

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
var SearchSource = _courier.SearchSource;
exports.SearchSource = SearchSource;