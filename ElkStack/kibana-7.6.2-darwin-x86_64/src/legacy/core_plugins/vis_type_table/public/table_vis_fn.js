"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTableVisFn = void 0;

var _i18n = require("@kbn/i18n");

var _table_vis_request_handler = require("./table_vis_request_handler");

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
var name = 'kibana_table';

var createTableVisFn = function createTableVisFn() {
  return {
    name: name,
    type: 'render',
    context: {
      types: ['kibana_datatable']
    },
    help: _i18n.i18n.translate('visTypeTable.function.help', {
      defaultMessage: 'Table visualization'
    }),
    args: {
      visConfig: {
        types: ['string', 'null'],
        default: '"{}"',
        help: ''
      }
    },
    fn: function fn(context, args) {
      var visConfig, convertedData;
      return regeneratorRuntime.async(function fn$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              visConfig = args.visConfig && JSON.parse(args.visConfig);
              _context.next = 3;
              return regeneratorRuntime.awrap((0, _table_vis_request_handler.tableVisResponseHandler)(context, visConfig.dimensions));

            case 3:
              convertedData = _context.sent;
              return _context.abrupt("return", {
                type: 'render',
                as: 'visualization',
                value: {
                  visData: convertedData,
                  visType: 'table',
                  visConfig: visConfig,
                  params: {
                    listenOnChange: true
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

exports.createTableVisFn = createTableVisFn;