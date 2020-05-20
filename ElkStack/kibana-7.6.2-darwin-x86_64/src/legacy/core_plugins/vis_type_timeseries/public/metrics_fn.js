"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMetricsFn = void 0;

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _persisted_state = require("ui/persisted_state");

var _request_handler = require("./request_handler");

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
var name = 'tsvb';

var createMetricsFn = function createMetricsFn() {
  return {
    name: name,
    type: 'render',
    context: {
      types: ['kibana_context', 'null']
    },
    help: _i18n.i18n.translate('visTypeTimeseries.function.help', {
      defaultMessage: 'TSVB visualization'
    }),
    args: {
      params: {
        types: ['string'],
        default: '"{}"',
        help: ''
      },
      uiState: {
        types: ['string'],
        default: '"{}"',
        help: ''
      },
      savedObjectId: {
        types: ['null', 'string'],
        default: null,
        help: ''
      }
    },
    fn: function fn(context, args) {
      var params, uiStateParams, savedObjectId, uiState, response;
      return regeneratorRuntime.async(function fn$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              params = JSON.parse(args.params);
              uiStateParams = JSON.parse(args.uiState);
              savedObjectId = args.savedObjectId;
              uiState = new _persisted_state.PersistedState(uiStateParams);
              _context.next = 6;
              return regeneratorRuntime.awrap((0, _request_handler.metricsRequestHandler)({
                timeRange: (0, _lodash.get)(context, 'timeRange', null),
                query: (0, _lodash.get)(context, 'query', null),
                filters: (0, _lodash.get)(context, 'filters', null),
                visParams: params,
                uiState: uiState,
                savedObjectId: savedObjectId
              }));

            case 6:
              response = _context.sent;
              response.visType = 'metrics';
              return _context.abrupt("return", {
                type: 'render',
                as: 'visualization',
                value: {
                  uiState: uiState,
                  visType: 'metrics',
                  visConfig: params,
                  visData: response
                }
              });

            case 9:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  };
};

exports.createMetricsFn = createMetricsFn;