"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimelionVisualizationConfig = void 0;

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _timelion_request_handler = require("./vis/timelion_request_handler");

var _vis = require("./vis");

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
var name = 'timelion_vis';

var getTimelionVisualizationConfig = function getTimelionVisualizationConfig(dependencies) {
  return {
    name: name,
    type: 'render',
    context: {
      types: ['kibana_context', 'null']
    },
    help: _i18n.i18n.translate('timelion.function.help', {
      defaultMessage: 'Timelion visualization'
    }),
    args: {
      expression: {
        types: ['string'],
        aliases: ['_'],
        default: '".es(*)"',
        help: ''
      },
      interval: {
        types: ['string'],
        default: 'auto',
        help: ''
      }
    },
    fn: function fn(context, args) {
      var timelionRequestHandler, visParams, response;
      return regeneratorRuntime.async(function fn$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              timelionRequestHandler = (0, _timelion_request_handler.getTimelionRequestHandler)(dependencies);
              visParams = {
                expression: args.expression,
                interval: args.interval
              };
              _context.next = 4;
              return regeneratorRuntime.awrap(timelionRequestHandler({
                timeRange: (0, _lodash.get)(context, 'timeRange'),
                query: (0, _lodash.get)(context, 'query'),
                filters: (0, _lodash.get)(context, 'filters'),
                visParams: visParams,
                forceFetch: true
              }));

            case 4:
              response = _context.sent;
              response.visType = _vis.TIMELION_VIS_NAME;
              return _context.abrupt("return", {
                type: 'render',
                as: 'visualization',
                value: {
                  visParams: visParams,
                  visType: _vis.TIMELION_VIS_NAME,
                  visData: response
                }
              });

            case 7:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  };
};

exports.getTimelionVisualizationConfig = getTimelionVisualizationConfig;