"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expandShorthand = void 0;

var _lodash = require("lodash");

var _types = require("../../../data/common/types");

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
// import from ./common/types to prevent circular dependency of kibana_utils <-> data plugin

/** @public */
var expandShorthand = function expandShorthand(sh) {
  return (0, _lodash.mapValues)(sh, function (val) {
    var fieldMap = (0, _lodash.isString)(val) ? {
      type: val
    } : val;
    var json = {
      type: _types.ES_FIELD_TYPES.TEXT,
      _serialize: function _serialize(v) {
        if (v) return JSON.stringify(v);
      },
      _deserialize: function _deserialize(v) {
        if (v) return JSON.parse(v);
      }
    };
    return fieldMap.type === 'json' ? json : fieldMap;
  });
};

exports.expandShorthand = expandShorthand;