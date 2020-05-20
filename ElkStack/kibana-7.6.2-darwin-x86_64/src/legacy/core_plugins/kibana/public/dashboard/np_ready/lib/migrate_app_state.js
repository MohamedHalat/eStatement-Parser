"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.migrateAppState = migrateAppState;

var _semver = _interopRequireDefault(require("semver"));

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../ui_metric/public");

var _migrate_to_730_panels = require("../../migrations/migrate_to_730_panels");

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
 * Attempts to migrate the state stored in the URL into the latest version of it.
 *
 * Once we hit a major version, we can remove support for older style URLs and get rid of this logic.
 */
function migrateAppState(appState, kibanaVersion) {
  if (!appState.panels) {
    throw new Error(_i18n.i18n.translate('kbn.dashboard.panel.invalidData', {
      defaultMessage: 'Invalid data in url'
    }));
  }

  var panelNeedsMigration = appState.panels.some(function (panel) {
    if (panel.version === undefined) return true;
    var version = panel.version; // This will help us figure out when to remove support for older style URLs.

    (0, _public.createUiStatsReporter)('DashboardPanelVersionInUrl')(_public.METRIC_TYPE.LOADED, "".concat(version));
    return _semver.default.satisfies(version, '<7.3');
  });

  if (panelNeedsMigration) {
    appState.panels = (0, _migrate_to_730_panels.migratePanelsTo730)(appState.panels, kibanaVersion, appState.useMargins, appState.uiState);
    delete appState.uiState;
    appState.save();
  }
}