"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.migrateIncludeExcludeFormat = exports.isStringType = exports.isType = void 0;

var _lodash = require("lodash");

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
var isType = function isType(type) {
  return function (agg) {
    var field = agg.params.field;
    return field && field.type === type;
  };
};

exports.isType = isType;
var isStringType = isType('string');
exports.isStringType = isStringType;
var migrateIncludeExcludeFormat = {
  serialize: function serialize(value, agg) {
    if (this.shouldShow && !this.shouldShow(agg)) return;
    if (!value || (0, _lodash.isString)(value)) return value;else return value.pattern;
  },
  write: function write(aggConfig, output) {
    var value = aggConfig.getParam(this.name);

    if ((0, _lodash.isObject)(value)) {
      output.params[this.name] = value.pattern;
    } else if (value && isStringType(aggConfig)) {
      output.params[this.name] = value;
    }
  }
};
exports.migrateIncludeExcludeFormat = migrateIncludeExcludeFormat;