"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildServices = buildServices;

var _saved_searches = require("./saved_searches");

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
function buildServices(core, plugins, docViewsRegistry) {
  var services, savedObjectService;
  return regeneratorRuntime.async(function buildServices$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          services = {
            savedObjectsClient: core.savedObjects.client,
            indexPatterns: plugins.data.indexPatterns,
            chrome: core.chrome,
            overlays: core.overlays
          };
          savedObjectService = (0, _saved_searches.createSavedSearchesService)(services);
          return _context3.abrupt("return", {
            addBasePath: core.http.basePath.prepend,
            capabilities: core.application.capabilities,
            chrome: core.chrome,
            core: core,
            data: plugins.data,
            docLinks: core.docLinks,
            docViewsRegistry: docViewsRegistry,
            eui_utils: plugins.eui_utils,
            filterManager: plugins.data.query.filterManager,
            getSavedSearchById: function getSavedSearchById(id) {
              return regeneratorRuntime.async(function getSavedSearchById$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      return _context.abrupt("return", savedObjectService.get(id));

                    case 1:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            },
            getSavedSearchUrlById: function getSavedSearchUrlById(id) {
              return regeneratorRuntime.async(function getSavedSearchUrlById$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      return _context2.abrupt("return", savedObjectService.urlFor(id));

                    case 1:
                    case "end":
                      return _context2.stop();
                  }
                }
              });
            },
            indexPatterns: plugins.data.indexPatterns,
            inspector: plugins.inspector,
            // @ts-ignore
            metadata: core.injectedMetadata.getLegacyMetadata(),
            share: plugins.share,
            timefilter: plugins.data.query.timefilter.timefilter,
            toastNotifications: core.notifications.toasts,
            uiSettings: core.uiSettings
          });

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
}