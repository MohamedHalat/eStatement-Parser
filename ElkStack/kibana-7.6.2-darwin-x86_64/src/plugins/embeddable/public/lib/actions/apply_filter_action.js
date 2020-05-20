"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFilterAction = createFilterAction;
exports.APPLY_FILTER_ACTION = void 0;

var _i18n = require("@kbn/i18n");

var _ui_actions = require("../ui_actions");

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
var APPLY_FILTER_ACTION = 'APPLY_FILTER_ACTION';
exports.APPLY_FILTER_ACTION = APPLY_FILTER_ACTION;

function isCompatible(context) {
  var root;
  return regeneratorRuntime.async(function isCompatible$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(context.embeddable === undefined)) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", false);

        case 2:
          root = context.embeddable.getRoot();
          return _context.abrupt("return", Boolean(root.getInput().filters !== undefined && context.filters !== undefined));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

function createFilterAction() {
  return (0, _ui_actions.createAction)({
    type: APPLY_FILTER_ACTION,
    id: APPLY_FILTER_ACTION,
    getDisplayName: function getDisplayName() {
      return _i18n.i18n.translate('embeddableApi.actions.applyFilterActionTitle', {
        defaultMessage: 'Apply filter to current view'
      });
    },
    isCompatible: isCompatible,
    execute: function execute(_ref) {
      var embeddable, filters, root;
      return regeneratorRuntime.async(function execute$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              embeddable = _ref.embeddable, filters = _ref.filters;

              if (!(!filters || !embeddable)) {
                _context2.next = 3;
                break;
              }

              throw new Error('Applying a filter requires a filter and embeddable as context');

            case 3:
              _context2.next = 5;
              return regeneratorRuntime.awrap(isCompatible({
                embeddable: embeddable,
                filters: filters
              }));

            case 5:
              if (_context2.sent) {
                _context2.next = 7;
                break;
              }

              throw new _ui_actions.IncompatibleActionError();

            case 7:
              root = embeddable.getRoot();
              root.updateInput({
                filters: filters
              });

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  });
}