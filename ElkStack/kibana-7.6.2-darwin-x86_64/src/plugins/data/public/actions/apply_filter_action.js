"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFilterAction = createFilterAction;
exports.GLOBAL_APPLY_FILTER_ACTION = void 0;

var _i18n = require("@kbn/i18n");

var _public = require("../../../kibana_react/public");

var _public2 = require("../../../ui_actions/public");

var _services = require("../services");

var _apply_filters = require("../ui/apply_filters");

var _ = require("..");

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
var GLOBAL_APPLY_FILTER_ACTION = 'GLOBAL_APPLY_FILTER_ACTION';
exports.GLOBAL_APPLY_FILTER_ACTION = GLOBAL_APPLY_FILTER_ACTION;

function isCompatible(context) {
  return regeneratorRuntime.async(function isCompatible$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", context.filters !== undefined);

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}

function createFilterAction(filterManager, timeFilter) {
  return (0, _public2.createAction)({
    type: GLOBAL_APPLY_FILTER_ACTION,
    id: GLOBAL_APPLY_FILTER_ACTION,
    getDisplayName: function getDisplayName() {
      return _i18n.i18n.translate('data.filter.applyFilterActionTitle', {
        defaultMessage: 'Apply filter to current view'
      });
    },
    isCompatible: isCompatible,
    execute: function execute(_ref) {
      var filters, timeFieldName, selectedFilters, indexPatterns, filterSelectionPromise, _extractTimeFilter, timeRangeFilter, restOfFilters;

      return regeneratorRuntime.async(function execute$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              filters = _ref.filters, timeFieldName = _ref.timeFieldName;

              if (filters) {
                _context2.next = 3;
                break;
              }

              throw new Error('Applying a filter requires a filter');

            case 3:
              _context2.next = 5;
              return regeneratorRuntime.awrap(isCompatible({
                filters: filters
              }));

            case 5:
              if (_context2.sent) {
                _context2.next = 7;
                break;
              }

              throw new _public2.IncompatibleActionError();

            case 7:
              selectedFilters = filters;

              if (!(selectedFilters.length > 1)) {
                _context2.next = 16;
                break;
              }

              _context2.next = 11;
              return regeneratorRuntime.awrap(Promise.all(filters.map(function (filter) {
                return (0, _services.getIndexPatterns)().get(filter.meta.index);
              })));

            case 11:
              indexPatterns = _context2.sent;
              filterSelectionPromise = new Promise(function (resolve) {
                var overlay = (0, _services.getOverlays)().openModal((0, _public.toMountPoint)((0, _apply_filters.applyFiltersPopover)(filters, indexPatterns, function () {
                  overlay.close();
                  resolve([]);
                }, function (filterSelection) {
                  overlay.close();
                  resolve(filterSelection);
                })), {
                  'data-test-subj': 'test'
                });
              });
              _context2.next = 15;
              return regeneratorRuntime.awrap(filterSelectionPromise);

            case 15:
              selectedFilters = _context2.sent;

            case 16:
              if (timeFieldName) {
                _extractTimeFilter = (0, _.extractTimeFilter)(timeFieldName, selectedFilters), timeRangeFilter = _extractTimeFilter.timeRangeFilter, restOfFilters = _extractTimeFilter.restOfFilters;
                filterManager.addFilters(restOfFilters);

                if (timeRangeFilter) {
                  (0, _.changeTimeFilter)(timeFilter, timeRangeFilter);
                }
              } else {
                filterManager.addFilters(selectedFilters);
              }

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  });
}