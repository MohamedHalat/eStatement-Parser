"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "IndexPattern", {
  enumerable: true,
  get: function get() {
    return _index_patterns.IndexPattern;
  }
});
Object.defineProperty(exports, "IndexPatterns", {
  enumerable: true,
  get: function get() {
    return _index_patterns.IndexPatterns;
  }
});
Object.defineProperty(exports, "IndexPatternsContract", {
  enumerable: true,
  get: function get() {
    return _index_patterns.IndexPatternsContract;
  }
});
Object.defineProperty(exports, "Field", {
  enumerable: true,
  get: function get() {
    return _fields.Field;
  }
});
Object.defineProperty(exports, "FieldList", {
  enumerable: true,
  get: function get() {
    return _fields.FieldList;
  }
});
Object.defineProperty(exports, "IFieldList", {
  enumerable: true,
  get: function get() {
    return _fields.IFieldList;
  }
});
exports.indexPatterns = void 0;

var _lib = require("./lib");

var _utils = require("./utils");

var _index_patterns = require("./index_patterns");

var _fields = require("./fields");

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
var indexPatterns = {
  ILLEGAL_CHARACTERS_KEY: _lib.ILLEGAL_CHARACTERS_KEY,
  CONTAINS_SPACES_KEY: _lib.CONTAINS_SPACES_KEY,
  ILLEGAL_CHARACTERS_VISIBLE: _lib.ILLEGAL_CHARACTERS_VISIBLE,
  ILLEGAL_CHARACTERS: _lib.ILLEGAL_CHARACTERS,
  IndexPatternMissingIndices: _lib.IndexPatternMissingIndices,
  validate: _lib.validateIndexPattern,
  getRoutes: _utils.getRoutes,
  getFromSavedObject: _lib.getFromSavedObject,
  flattenHitWrapper: _index_patterns.flattenHitWrapper,
  formatHitProvider: _index_patterns.formatHitProvider
};
exports.indexPatterns = indexPatterns;