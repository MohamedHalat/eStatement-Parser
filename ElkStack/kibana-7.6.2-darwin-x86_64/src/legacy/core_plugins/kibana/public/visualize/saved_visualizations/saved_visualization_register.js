"use strict";

var _new_platform = require("ui/new_platform");

var _modules = require("ui/modules");

var _saved_object_registry = require("../../management/saved_object_registry");

var _saved_visualizations = require("./saved_visualizations");

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
var services = {
  savedObjectsClient: _new_platform.npStart.core.savedObjects.client,
  indexPatterns: _new_platform.npStart.plugins.data.indexPatterns,
  chrome: _new_platform.npStart.core.chrome,
  overlays: _new_platform.npStart.core.overlays
};
var savedObjectLoaderVisualize = (0, _saved_visualizations.createSavedVisLoader)(services); // Register this service with the saved object registry so it can be
// edited by the object editor.

_saved_object_registry.savedObjectManagementRegistry.register({
  service: 'savedVisualizations',
  title: 'visualizations'
});

_modules.uiModules.get('app/visualize').service('savedVisualizations', function () {
  return savedObjectLoaderVisualize;
});