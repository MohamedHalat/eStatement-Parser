"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createVegaFn = void 0;

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _vega_request_handler = require("./vega_request_handler");

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
var name = 'vega';

var createVegaFn = function createVegaFn(dependencies) {
  return {
    name: name,
    type: 'render',
    context: {
      types: ['kibana_context', 'null']
    },
    help: _i18n.i18n.translate('visTypeVega.function.help', {
      defaultMessage: 'Vega visualization'
    }),
    args: {
      spec: {
        types: ['string'],
        default: '',
        help: ''
      }
    },
    fn: function fn(context, args) {
      var vegaRequestHandler, response;
      return regeneratorRuntime.async(function fn$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              vegaRequestHandler = (0, _vega_request_handler.createVegaRequestHandler)(dependencies);
              _context.next = 3;
              return regeneratorRuntime.awrap(vegaRequestHandler({
                timeRange: (0, _lodash.get)(context, 'timeRange'),
                query: (0, _lodash.get)(context, 'query'),
                filters: (0, _lodash.get)(context, 'filters'),
                visParams: {
                  spec: args.spec
                }
              }));

            case 3:
              response = _context.sent;
              return _context.abrupt("return", {
                type: 'render',
                as: 'visualization',
                value: {
                  visData: response,
                  visType: name,
                  visConfig: {
                    spec: args.spec
                  }
                }
              });

            case 5:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  };
};

exports.createVegaFn = createVegaFn;