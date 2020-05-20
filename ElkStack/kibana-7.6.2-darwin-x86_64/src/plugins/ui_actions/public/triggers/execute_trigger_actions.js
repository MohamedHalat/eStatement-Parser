"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.executeTriggerActions = void 0;

var _context_menu = require("../context_menu");

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
var executeSingleAction = function executeSingleAction(action, actionContext) {
  var href;
  return regeneratorRuntime.async(function executeSingleAction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          href = action.getHref && action.getHref(actionContext); // TODO: Do we need a `getHref()` special case?

          if (!href) {
            _context.next = 4;
            break;
          }

          window.location.href = href;
          return _context.abrupt("return");

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(action.execute(actionContext));

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

var executeTriggerActions = function executeTriggerActions(_ref) {
  var api = _ref.api;
  return function _callee(triggerId, actionContext) {
    var actions, panel, session;
    return regeneratorRuntime.async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(api.getTriggerCompatibleActions(triggerId, actionContext));

          case 2:
            actions = _context2.sent;

            if (actions.length) {
              _context2.next = 5;
              break;
            }

            throw new Error("No compatible actions found to execute for trigger [triggerId = ".concat(triggerId, "]."));

          case 5:
            if (!(actions.length === 1)) {
              _context2.next = 9;
              break;
            }

            _context2.next = 8;
            return regeneratorRuntime.awrap(executeSingleAction(actions[0], actionContext));

          case 8:
            return _context2.abrupt("return");

          case 9:
            _context2.next = 11;
            return regeneratorRuntime.awrap((0, _context_menu.buildContextMenuForActions)({
              actions: actions,
              actionContext: actionContext,
              closeMenu: function closeMenu() {
                return session.close();
              }
            }));

          case 11:
            panel = _context2.sent;
            session = (0, _context_menu.openContextMenu)([panel]);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    });
  };
};

exports.executeTriggerActions = executeTriggerActions;