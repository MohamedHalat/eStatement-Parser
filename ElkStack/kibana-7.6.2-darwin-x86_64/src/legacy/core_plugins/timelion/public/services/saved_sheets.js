"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.savedSheetLoader = void 0;

var _new_platform = require("ui/new_platform");

var _saved_objects = require("ui/saved_objects");

var _saved_object_registry = require("plugins/kibana/management/saved_object_registry");

var _modules = require("ui/modules");

var _saved_sheet = require("./_saved_sheet");

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
var _module = _modules.uiModules.get('app/sheet'); // Register this service with the saved object registry so it can be
// edited by the object editor.


_saved_object_registry.savedObjectManagementRegistry.register({
  service: 'savedSheets',
  title: 'sheets'
});

var savedObjectsClient = _new_platform.npStart.core.savedObjects.client;
var services = {
  savedObjectsClient: savedObjectsClient,
  indexPatterns: _new_platform.npStart.plugins.data.indexPatterns,
  chrome: _new_platform.npStart.core.chrome,
  overlays: _new_platform.npStart.core.overlays
};
var SavedSheet = (0, _saved_sheet.createSavedSheetClass)(services, _new_platform.npStart.core.uiSettings);
var savedSheetLoader = new _saved_objects.SavedObjectLoader(SavedSheet, savedObjectsClient, _new_platform.npStart.core.chrome);
exports.savedSheetLoader = savedSheetLoader;

savedSheetLoader.urlFor = function (id) {
  return "#/".concat(encodeURIComponent(id));
}; // Customize loader properties since adding an 's' on type doesn't work for type 'timelion-sheet'.


savedSheetLoader.loaderProperties = {
  name: 'timelion-sheet',
  noun: 'Saved Sheets',
  nouns: 'saved sheets'
}; // This is the only thing that gets injected into controllers

_module.service('savedSheets', function () {
  return savedSheetLoader;
});