"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTriggerCompatibleActions = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
var getTriggerCompatibleActions = function getTriggerCompatibleActions(_ref) {
  var api = _ref.api;
  return function _callee(triggerId, context) {
    var actions, isCompatibles;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            actions = api.getTriggerActions(triggerId);
            _context.next = 3;
            return regeneratorRuntime.awrap(Promise.all(actions.map(function (action) {
              return action.isCompatible(context);
            })));

          case 3:
            isCompatibles = _context.sent;
            return _context.abrupt("return", actions.reduce(function (acc, action, i) {
              return isCompatibles[i] ? [].concat(_toConsumableArray(acc), [action]) : acc;
            }, []));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  };
};

exports.getTriggerCompatibleActions = getTriggerCompatibleActions;