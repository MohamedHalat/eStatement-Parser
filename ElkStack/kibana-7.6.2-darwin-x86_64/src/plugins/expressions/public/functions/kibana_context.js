"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.kibanaContext = void 0;

var _i18n = require("@kbn/i18n");

var _services = require("../services");

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
var kibanaContext = function kibanaContext() {
  return {
    name: 'kibana_context',
    type: 'kibana_context',
    context: {
      types: ['kibana_context', 'null']
    },
    help: _i18n.i18n.translate('expressions.functions.kibana_context.help', {
      defaultMessage: 'Updates kibana global context'
    }),
    args: {
      q: {
        types: ['string', 'null'],
        aliases: ['query', '_'],
        default: null,
        help: _i18n.i18n.translate('expressions.functions.kibana_context.q.help', {
          defaultMessage: 'Specify Kibana free form text query'
        })
      },
      filters: {
        types: ['string', 'null'],
        default: '"[]"',
        help: _i18n.i18n.translate('expressions.functions.kibana_context.filters.help', {
          defaultMessage: 'Specify Kibana generic filters'
        })
      },
      timeRange: {
        types: ['string', 'null'],
        default: null,
        help: _i18n.i18n.translate('expressions.functions.kibana_context.timeRange.help', {
          defaultMessage: 'Specify Kibana time range filter'
        })
      },
      savedSearchId: {
        types: ['string', 'null'],
        default: null,
        help: _i18n.i18n.translate('expressions.functions.kibana_context.savedSearchId.help', {
          defaultMessage: 'Specify saved search ID to be used for queries and filters'
        })
      }
    },
    fn: function fn(context, args, handlers) {
      var queryArg, queries, filters, obj, search, data, timeRange;
      return regeneratorRuntime.async(function fn$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              queryArg = args.q ? JSON.parse(args.q) : [];
              queries = Array.isArray(queryArg) ? queryArg : [queryArg];
              filters = args.filters ? JSON.parse(args.filters) : [];

              if (!args.savedSearchId) {
                _context.next = 11;
                break;
              }

              _context.next = 6;
              return regeneratorRuntime.awrap(_services.savedObjects.get('search', args.savedSearchId));

            case 6:
              obj = _context.sent;
              search = obj.attributes.kibanaSavedObjectMeta;
              data = JSON.parse(search.searchSourceJSON);
              queries = queries.concat(data.query);
              filters = filters.concat(data.filter);

            case 11:
              if (context && context.query) {
                queries = queries.concat(context.query);
              }

              if (context && context.filters) {
                filters = filters.concat(context.filters).filter(function (f) {
                  return !f.meta.disabled;
                });
              }

              timeRange = args.timeRange ? JSON.parse(args.timeRange) : context ? context.timeRange : undefined;
              return _context.abrupt("return", {
                type: 'kibana_context',
                query: queries,
                filters: filters,
                timeRange: timeRange
              });

            case 15:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  };
};

exports.kibanaContext = kibanaContext;