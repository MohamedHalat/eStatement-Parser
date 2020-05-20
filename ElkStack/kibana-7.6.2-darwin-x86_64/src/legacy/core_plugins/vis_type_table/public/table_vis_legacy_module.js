"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initTableVisLegacyModule = void 0;

var _table_vis_controller = require("./table_vis_controller.js");

var _agg_table = require("./agg_table/agg_table");

var _agg_table_group = require("./agg_table/agg_table_group");

var _rows = require("./paginated_table/rows");

var _paginated_table = require("./paginated_table/paginated_table");

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
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore

/** @internal */
var initTableVisLegacyModule = function initTableVisLegacyModule(angularIns) {
  angularIns.controller('KbnTableVisController', _table_vis_controller.TableVisController).directive('kbnAggTable', _agg_table.KbnAggTable).directive('kbnAggTableGroup', _agg_table_group.KbnAggTableGroup).directive('kbnRows', _rows.KbnRows).directive('paginatedTable', _paginated_table.PaginatedTable);
};

exports.initTableVisLegacyModule = initTableVisLegacyModule;