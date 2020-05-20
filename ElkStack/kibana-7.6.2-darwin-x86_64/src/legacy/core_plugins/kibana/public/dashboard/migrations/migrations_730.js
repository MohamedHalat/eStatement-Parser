"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.migrations730 = migrations730;

var _util = require("util");

var _is_dashboard_doc = require("./is_dashboard_doc");

var _move_filters_to_query = require("./move_filters_to_query");

var _migrate_to_730_panels = require("./migrate_to_730_panels");

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
// This file should be moved to dashboard/server/
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
function migrations730(doc, logger) {
  if (!(0, _is_dashboard_doc.isDashboardDoc)(doc)) {
    // NOTE: we should probably throw an error here... but for now following suit and in the
    // case of errors, just returning the same document.
    return doc;
  }

  try {
    var searchSource = JSON.parse(doc.attributes.kibanaSavedObjectMeta.searchSourceJSON);
    doc.attributes.kibanaSavedObjectMeta.searchSourceJSON = JSON.stringify((0, _move_filters_to_query.moveFiltersToQuery)(searchSource));
  } catch (e) {
    logger.warning("Exception @ migrations730 while trying to migrate dashboard query filters!\n" + "".concat(e.stack, "\n") + "dashboard: ".concat((0, _util.inspect)(doc, false, null)));
    return doc;
  }

  var uiState = {}; // Ignore errors, at some point uiStateJSON stopped being used, so it may not exist.

  if (doc.attributes.uiStateJSON && doc.attributes.uiStateJSON !== '') {
    uiState = JSON.parse(doc.attributes.uiStateJSON);
  }

  try {
    var panels = JSON.parse(doc.attributes.panelsJSON);
    doc.attributes.panelsJSON = JSON.stringify((0, _migrate_to_730_panels.migratePanelsTo730)(panels, '7.3.0', doc.attributes.useMargins === undefined ? true : doc.attributes.useMargins, uiState));
    delete doc.attributes.uiStateJSON;
  } catch (e) {
    logger.warning("Exception @ migrations730 while trying to migrate dashboard panels!\n" + "Error: ".concat(e.stack, "\n") + "dashboard: ".concat((0, _util.inspect)(doc, false, null)));
    return doc;
  }

  return doc;
}