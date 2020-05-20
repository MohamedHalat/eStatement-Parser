"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildTabularInspectorData = buildTabularInspectorData;

var _lodash = require("lodash");

var _public = require("../../../core_plugins/visualizations/public");

var _adapters = require("./adapters");

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
// @ts-ignore

/**
 * @deprecated
 *
 * Do not use this function.
 *
 * @todo This function is used only by Courier. Courier will
 *   soon be removed, and this function will be deleted, too. If Courier is not removed,
 *   move this function inside Courier.
 *
 * ---
 *
 * This function builds tabular data from the response and attaches it to the
 * inspector. It will only be called when the data view in the inspector is opened.
 */
function buildTabularInspectorData(table, queryFilter) {
  var aggConfigs, rows, columns;
  return regeneratorRuntime.async(function buildTabularInspectorData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          aggConfigs = table.columns.map(function (column) {
            return column.aggConfig;
          });
          rows = table.rows.map(function (row) {
            return table.columns.reduce(function (prev, cur, colIndex) {
              var value = row[cur.id];
              var fieldFormatter = cur.aggConfig.fieldFormatter('text');
              prev["col-".concat(colIndex, "-").concat(cur.aggConfig.id)] = new _adapters.FormattedData(value, fieldFormatter(value));
              return prev;
            }, {});
          });
          columns = table.columns.map(function (col, colIndex) {
            var field = col.aggConfig.getField();
            var isCellContentFilterable = col.aggConfig.isFilterable() && (!field || field.filterable);
            return {
              name: col.name,
              field: "col-".concat(colIndex, "-").concat(col.aggConfig.id),
              filter: isCellContentFilterable && function (value) {
                var rowIndex = rows.findIndex(function (row) {
                  return row["col-".concat(colIndex, "-").concat(col.aggConfig.id)].raw === value.raw;
                });
                var filter = (0, _public.createFilter)(aggConfigs, table, colIndex, rowIndex, value.raw);
                queryFilter.addFilters(filter);
              },
              filterOut: isCellContentFilterable && function (value) {
                var rowIndex = rows.findIndex(function (row) {
                  return row["col-".concat(colIndex, "-").concat(col.aggConfig.id)].raw === value.raw;
                });
                var filter = (0, _public.createFilter)(aggConfigs, table, colIndex, rowIndex, value.raw);
                var notOther = value.raw !== '__other__';
                var notMissing = value.raw !== '__missing__';

                if (Array.isArray(filter)) {
                  filter.forEach(function (f) {
                    return (0, _lodash.set)(f, 'meta.negate', notOther && notMissing);
                  });
                } else {
                  (0, _lodash.set)(filter, 'meta.negate', notOther && notMissing);
                }

                queryFilter.addFilters(filter);
              }
            };
          });
          return _context.abrupt("return", {
            columns: columns,
            rows: rows
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}