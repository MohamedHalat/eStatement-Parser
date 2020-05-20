"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTranslationCount = getTranslationCount;
exports.createCollectorFetch = createCollectorFetch;
exports.registerManagementUsageCollector = registerManagementUsageCollector;

var _lodash = require("lodash");

var _constants = require("../../../common/constants");

var _server = require("../../../../../../core/server");

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
async function getTranslationCount(loader, locale) {
  const translations = await loader.getTranslationsByLocale(locale);
  return (0, _lodash.size)(translations.messages);
}

function createCollectorFetch(server) {
  return async function fetchUsageStats() {
    const internalRepo = server.newPlatform.setup.core.savedObjects.createInternalRepository();
    const uiSettingsClient = server.newPlatform.start.core.uiSettings.asScopedToClient(new _server.SavedObjectsClient(internalRepo));
    const user = await uiSettingsClient.getUserProvided();
    const modifiedEntries = Object.keys(user).filter(key => key !== 'buildNum').reduce((obj, key) => {
      obj[key] = user[key].userValue;
      return obj;
    }, {});
    return modifiedEntries;
  };
}

function registerManagementUsageCollector(usageCollection, server) {
  const collector = usageCollection.makeUsageCollector({
    type: _constants.KIBANA_MANAGEMENT_STATS_TYPE,
    isReady: () => true,
    fetch: createCollectorFetch(server)
  });
  usageCollection.registerCollector(collector);
}