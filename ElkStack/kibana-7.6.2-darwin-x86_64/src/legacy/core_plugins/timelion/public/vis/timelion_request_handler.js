"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimelionRequestHandler = getTimelionRequestHandler;

var _timezone = require("ui/vis/lib/timezone");

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../plugins/data/public");

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
// @ts-ignore
function getTimelionRequestHandler(dependencies) {
  var uiSettings = dependencies.uiSettings,
      http = dependencies.http,
      timefilter = dependencies.timefilter;
  var timezone = (0, _timezone.timezoneProvider)(uiSettings)();
  return function _callee(_ref) {
    var timeRange, filters, query, visParams, expression, esQueryConfigs, timeRangeBounds, err;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            timeRange = _ref.timeRange, filters = _ref.filters, query = _ref.query, visParams = _ref.visParams;
            expression = visParams.expression;

            if (expression) {
              _context.next = 4;
              break;
            }

            throw new Error(_i18n.i18n.translate('timelion.emptyExpressionErrorMessage', {
              defaultMessage: 'Timelion error: No expression provided'
            }));

          case 4:
            esQueryConfigs = _public.esQuery.getEsQueryConfig(uiSettings); // parse the time range client side to make sure it behaves like other charts

            timeRangeBounds = timefilter.calculateBounds(timeRange);
            _context.prev = 6;
            _context.next = 9;
            return regeneratorRuntime.awrap(http.post('../api/timelion/run', {
              body: JSON.stringify({
                sheet: [expression],
                extended: {
                  es: {
                    filter: _public.esQuery.buildEsQuery(undefined, query, filters, esQueryConfigs)
                  }
                },
                time: {
                  from: timeRangeBounds.min,
                  to: timeRangeBounds.max,
                  interval: visParams.interval,
                  timezone: timezone
                }
              })
            }));

          case 9:
            return _context.abrupt("return", _context.sent);

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](6);

            if (!(_context.t0 && _context.t0.body)) {
              _context.next = 20;
              break;
            }

            err = new Error("".concat(_i18n.i18n.translate('timelion.requestHandlerErrorTitle', {
              defaultMessage: 'Timelion request error'
            }), ": ").concat(_context.t0.body.title, " ").concat(_context.t0.body.message));
            err.stack = _context.t0.stack;
            throw err;

          case 20:
            throw _context.t0;

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[6, 12]]);
  };
}