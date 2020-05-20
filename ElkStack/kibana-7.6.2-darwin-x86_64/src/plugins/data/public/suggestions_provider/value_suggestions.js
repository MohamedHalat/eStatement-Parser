"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSuggestionsProvider = getSuggestionsProvider;

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
function getSuggestionsProvider(uiSettings, http) {
  var requestSuggestions = (0, _lodash.memoize)(function (index, field, query) {
    var boolFilter = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    var signal = arguments.length > 4 ? arguments[4] : undefined;
    return http.fetch("/api/kibana/suggestions/values/".concat(index), {
      method: 'POST',
      body: JSON.stringify({
        query: query,
        field: field.name,
        boolFilter: boolFilter
      }),
      signal: signal
    });
  }, resolver);
  return function _callee(index, field, query, boolFilter, signal) {
    var shouldSuggestValues;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            shouldSuggestValues = uiSettings.get('filterEditor:suggestValues');

            if (!(field.type === 'boolean')) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", [true, false]);

          case 5:
            if (!(!shouldSuggestValues || !field.aggregatable || field.type !== 'string')) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", []);

          case 7:
            _context.next = 9;
            return regeneratorRuntime.awrap(requestSuggestions(index, field, query, boolFilter, signal));

          case 9:
            return _context.abrupt("return", _context.sent);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    });
  };
}

function resolver(index, field, query, boolFilter) {
  // Only cache results for a minute
  var ttl = Math.floor(Date.now() / 1000 / 60);
  return [ttl, query, index, field.name, JSON.stringify(boolFilter)].join('|');
}