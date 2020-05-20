"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildContextMenuForActions = buildContextMenuForActions;

var _lodash = _interopRequireDefault(require("lodash"));

var _i18n = require("@kbn/i18n");

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

/**
 * Transforms an array of Actions to the shape EuiContextMenuPanel expects.
 */
function buildContextMenuForActions(_ref) {
  var actions, actionContext, closeMenu, menuItems;
  return regeneratorRuntime.async(function buildContextMenuForActions$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          actions = _ref.actions, actionContext = _ref.actionContext, closeMenu = _ref.closeMenu;
          _context.next = 3;
          return regeneratorRuntime.awrap(buildEuiContextMenuPanelItems({
            actions: actions,
            actionContext: actionContext,
            closeMenu: closeMenu
          }));

        case 3:
          menuItems = _context.sent;
          return _context.abrupt("return", {
            id: 'mainMenu',
            title: _i18n.i18n.translate('uiActions.actionPanel.title', {
              defaultMessage: 'Options'
            }),
            items: menuItems
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}
/**
 * Transform an array of Actions into the shape needed to build an EUIContextMenu
 */


function buildEuiContextMenuPanelItems(_ref2) {
  var actions, actionContext, closeMenu, items, promises;
  return regeneratorRuntime.async(function buildEuiContextMenuPanelItems$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          actions = _ref2.actions, actionContext = _ref2.actionContext, closeMenu = _ref2.closeMenu;
          items = [];
          promises = actions.map(function _callee(action) {
            var isCompatible;
            return regeneratorRuntime.async(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return regeneratorRuntime.awrap(action.isCompatible(actionContext));

                  case 2:
                    isCompatible = _context2.sent;

                    if (isCompatible) {
                      _context2.next = 5;
                      break;
                    }

                    return _context2.abrupt("return");

                  case 5:
                    items.push(convertPanelActionToContextMenuItem({
                      action: action,
                      actionContext: actionContext,
                      closeMenu: closeMenu
                    }));

                  case 6:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          });
          _context3.next = 5;
          return regeneratorRuntime.awrap(Promise.all(promises));

        case 5:
          return _context3.abrupt("return", items);

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
}
/**
 *
 * @param {ContextMenuAction} action
 * @param {Embeddable} embeddable
 * @return {EuiContextMenuPanelItemDescriptor}
 */


function convertPanelActionToContextMenuItem(_ref3) {
  var action = _ref3.action,
      actionContext = _ref3.actionContext,
      closeMenu = _ref3.closeMenu;
  var menuPanelItem = {
    name: action.getDisplayName(actionContext),
    icon: action.getIconType(actionContext),
    panel: _lodash.default.get(action, 'childContextMenuPanel.id'),
    'data-test-subj': "embeddablePanelAction-".concat(action.id)
  };

  menuPanelItem.onClick = function () {
    action.execute(actionContext);
    closeMenu();
  };

  if (action.getHref && action.getHref(actionContext)) {
    menuPanelItem.href = action.getHref(actionContext);
  }

  return menuPanelItem;
}