"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTranslationCount = getTranslationCount;
exports.createCollectorFetch = createCollectorFetch;
exports.registerLocalizationUsageCollector = registerLocalizationUsageCollector;

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _file_integrity = require("./file_integrity");

var _constants = require("../../../common/constants");

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
    const config = server.config();
    const locale = config.get('i18n.locale');
    const translationFilePaths = server.getTranslationsFilePaths();
    const [labelsCount, integrities] = await Promise.all([getTranslationCount(_i18n.i18nLoader, locale), (0, _file_integrity.getIntegrityHashes)(translationFilePaths)]);
    return {
      locale,
      integrities,
      labelsCount
    };
  };
}

function registerLocalizationUsageCollector(usageCollection, server) {
  const collector = usageCollection.makeUsageCollector({
    type: _constants.KIBANA_LOCALIZATION_STATS_TYPE,
    isReady: () => true,
    fetch: createCollectorFetch(server)
  });
  usageCollection.registerCollector(collector);
}