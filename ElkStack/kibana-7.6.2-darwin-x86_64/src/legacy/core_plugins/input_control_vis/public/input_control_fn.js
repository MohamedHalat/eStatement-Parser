"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createInputControlVisFn = void 0;

var _i18n = require("@kbn/i18n");

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
var name = 'input_control_vis';

var createInputControlVisFn = function createInputControlVisFn() {
  return {
    name: 'input_control_vis',
    type: 'render',
    context: {
      types: []
    },
    help: _i18n.i18n.translate('inputControl.function.help', {
      defaultMessage: 'Input control visualization'
    }),
    args: {
      visConfig: {
        types: ['string'],
        default: '"{}"',
        help: ''
      }
    },
    fn: function fn(context, args) {
      var params;
      return regeneratorRuntime.async(function fn$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              params = JSON.parse(args.visConfig);
              return _context.abrupt("return", {
                type: 'render',
                as: 'visualization',
                value: {
                  visType: 'input_control_vis',
                  visConfig: params
                }
              });

            case 2:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  };
};

exports.createInputControlVisFn = createInputControlVisFn;