"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveDashboard = saveDashboard;

var _update_saved_dashboard = require("./update_saved_dashboard");

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
 * Saves the dashboard.
 * @param toJson A custom toJson function. Used because the previous code used
 * the angularized toJson version, and it was unclear whether there was a reason not to use
 * JSON.stringify
 * @returns A promise that if resolved, will contain the id of the newly saved
 * dashboard.
 */
function saveDashboard(toJson, timeFilter, dashboardStateManager, saveOptions) {
  dashboardStateManager.saveState();
  var savedDashboard = dashboardStateManager.savedDashboard;
  var appState = dashboardStateManager.appState;
  (0, _update_saved_dashboard.updateSavedDashboard)(savedDashboard, appState, timeFilter, toJson);
  return savedDashboard.save(saveOptions).then(function (id) {
    dashboardStateManager.lastSavedDashboardFilters = dashboardStateManager.getFilterState();
    dashboardStateManager.resetState();
    return id;
  });
}