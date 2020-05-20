"use strict";

var _i18n = require("@kbn/i18n");

var _new_platform = require("ui/new_platform");

var _modules = require("ui/modules");

var _saved_object_registry = require("../../management/saved_object_registry");

var _saved_dashboards = require("./saved_dashboards");

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
var _module = _modules.uiModules.get('app/dashboard'); // Register this service with the saved object registry so it can be
// edited by the object editor.


_saved_object_registry.savedObjectManagementRegistry.register({
  service: 'savedDashboards',
  title: _i18n.i18n.translate('kbn.dashboard.savedDashboardsTitle', {
    defaultMessage: 'dashboards'
  })
}); // this is no longer used in the conroller, but just here for savedObjectManagementRegistry


_module.service('savedDashboards', function () {
  return (0, _saved_dashboards.createSavedDashboardLoader)({
    savedObjectsClient: _new_platform.npStart.core.savedObjects.client,
    indexPatterns: _new_platform.npStart.plugins.data.indexPatterns,
    chrome: _new_platform.npStart.core.chrome,
    overlays: _new_platform.npStart.core.overlays
  });
});