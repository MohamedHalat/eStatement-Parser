"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fieldWildcardMatcher = fieldWildcardMatcher;
exports.fieldWildcardFilter = fieldWildcardFilter;
exports.makeRegEx = void 0;

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
var makeRegEx = (0, _lodash.memoize)(function makeRegEx(glob) {
  var globRegex = glob.split('*').map(_lodash.escapeRegExp).join('.*');
  return new RegExp("^".concat(globRegex, "$"));
}); // Note that this will return an essentially noop function if globs is undefined.

exports.makeRegEx = makeRegEx;

function fieldWildcardMatcher() {
  var globs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var metaFields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return function matcher(val) {
    // do not test metaFields or keyword
    if (metaFields.indexOf(val) !== -1) {
      return false;
    }

    return globs.some(function (p) {
      return makeRegEx(p).test("".concat(val));
    });
  };
} // Note that this will return an essentially noop function if globs is undefined.


function fieldWildcardFilter() {
  var globs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var metaFields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var matcher = fieldWildcardMatcher(globs, metaFields);
  return function filter(val) {
    return !matcher(val);
  };
}