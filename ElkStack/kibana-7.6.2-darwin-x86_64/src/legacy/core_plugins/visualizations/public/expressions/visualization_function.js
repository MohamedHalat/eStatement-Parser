"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visualization = void 0;

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _chrome = _interopRequireDefault(require("ui/chrome"));

var _query_filter = require("ui/filter_manager/query_filter");

var _persisted_state = require("ui/persisted_state");

var _new_platform = require("ui/new_platform");

var _legacy = require("../np_ready/public/legacy");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var visualization = function visualization() {
  return {
    name: 'visualization',
    type: 'render',
    help: _i18n.i18n.translate('visualizations.functions.visualization.help', {
      defaultMessage: 'A simple visualization'
    }),
    args: {
      // TODO: Below `help` keys should be internationalized once this function
      // TODO: is moved to visualizations plugin.
      index: {
        types: ['string', 'null'],
        default: null,
        help: 'Index'
      },
      metricsAtAllLevels: {
        types: ['boolean'],
        default: false,
        help: 'Metrics levels'
      },
      partialRows: {
        types: ['boolean'],
        default: false,
        help: 'Partial rows'
      },
      type: {
        types: ['string'],
        default: '',
        help: 'Type'
      },
      schemas: {
        types: ['string'],
        default: '"{}"',
        help: 'Schemas'
      },
      visConfig: {
        types: ['string'],
        default: '"{}"',
        help: 'Visualization configuration'
      },
      uiState: {
        types: ['string'],
        default: '"{}"',
        help: 'User interface state'
      }
    },
    fn: function fn(context, args, handlers) {
      var $injector, Private, indexPatterns, queryFilter, visConfigParams, schemas, visType, indexPattern, uiStateParams, uiState;
      return regeneratorRuntime.async(function fn$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(_chrome.default.dangerouslyGetActiveInjector());

            case 2:
              $injector = _context.sent;
              Private = $injector.get('Private');
              indexPatterns = _new_platform.npStart.plugins.data.indexPatterns;
              queryFilter = Private(_query_filter.FilterBarQueryFilterProvider);
              visConfigParams = args.visConfig ? JSON.parse(args.visConfig) : {};
              schemas = args.schemas ? JSON.parse(args.schemas) : {};
              visType = _legacy.start.types.get(args.type || 'histogram');

              if (!args.index) {
                _context.next = 15;
                break;
              }

              _context.next = 12;
              return regeneratorRuntime.awrap(indexPatterns.get(args.index));

            case 12:
              _context.t0 = _context.sent;
              _context.next = 16;
              break;

            case 15:
              _context.t0 = null;

            case 16:
              indexPattern = _context.t0;
              uiStateParams = args.uiState ? JSON.parse(args.uiState) : {};
              uiState = new _persisted_state.PersistedState(uiStateParams);

              if (!(typeof visType.requestHandler === 'function')) {
                _context.next = 23;
                break;
              }

              _context.next = 22;
              return regeneratorRuntime.awrap(visType.requestHandler({
                partialRows: args.partialRows,
                metricsAtAllLevels: args.metricsAtAllLevels,
                index: indexPattern,
                visParams: visConfigParams,
                timeRange: (0, _lodash.get)(context, 'timeRange', null),
                query: (0, _lodash.get)(context, 'query', null),
                filters: (0, _lodash.get)(context, 'filters', null),
                uiState: uiState,
                inspectorAdapters: handlers.inspectorAdapters,
                queryFilter: queryFilter,
                forceFetch: true
              }));

            case 22:
              context = _context.sent;

            case 23:
              if (!(typeof visType.responseHandler === 'function')) {
                _context.next = 28;
                break;
              }

              if (context.columns) {
                // assign schemas to aggConfigs
                context.columns.forEach(function (column) {
                  if (column.aggConfig) {
                    column.aggConfig.aggConfigs.schemas = visType.schemas.all;
                  }
                });
                Object.keys(schemas).forEach(function (key) {
                  schemas[key].forEach(function (i) {
                    if (context.columns[i] && context.columns[i].aggConfig) {
                      context.columns[i].aggConfig.schema = key;
                    }
                  });
                });
              }

              _context.next = 27;
              return regeneratorRuntime.awrap(visType.responseHandler(context, visConfigParams.dimensions));

            case 27:
              context = _context.sent;

            case 28:
              return _context.abrupt("return", {
                type: 'render',
                as: 'visualization',
                value: {
                  visData: context,
                  visType: args.type || '',
                  visConfig: visConfigParams
                }
              });

            case 29:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  };
};

exports.visualization = visualization;