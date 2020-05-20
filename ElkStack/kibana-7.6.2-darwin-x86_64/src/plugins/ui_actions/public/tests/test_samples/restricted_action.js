"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRestrictedAction = createRestrictedAction;
exports.RESTRICTED_ACTION = void 0;

var _actions = require("../../actions");

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
var RESTRICTED_ACTION = 'RESTRICTED_ACTION';
exports.RESTRICTED_ACTION = RESTRICTED_ACTION;

function createRestrictedAction(isCompatibleIn) {
  return (0, _actions.createAction)({
    type: RESTRICTED_ACTION,
    isCompatible: function isCompatible(context) {
      return regeneratorRuntime.async(function isCompatible$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", isCompatibleIn(context));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    execute: function execute() {
      return regeneratorRuntime.async(function execute$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  });
}