"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createReporter = createReporter;

var _analytics = require("@kbn/analytics");

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
function createReporter(config) {
  var localStorage = config.localStorage,
      debug = config.debug,
      fetch = config.fetch;
  return new _analytics.Reporter({
    debug: debug,
    storage: localStorage,
    http: function http(report) {
      var response;
      return regeneratorRuntime.async(function http$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(fetch.post('/api/ui_metric/report', {
                body: JSON.stringify({
                  report: report
                })
              }));

            case 2:
              response = _context.sent;

              if (!(response.status !== 'ok')) {
                _context.next = 5;
                break;
              }

              throw Error('Unable to store report.');

            case 5:
              return _context.abrupt("return", response);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  });
}