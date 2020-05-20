"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.i18nMixin = i18nMixin;

var _i18n = require("@kbn/i18n");

var _path = require("path");

var _utils = require("../../../core/server/utils");

var _get_translations_path = require("./get_translations_path");

var _constants = require("./constants");

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
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
async function i18nMixin(kbnServer, server, config) {
  const locale = config.get('i18n.locale');
  const translationPaths = await Promise.all([(0, _get_translations_path.getTranslationPaths)({
    cwd: (0, _utils.fromRoot)('.'),
    glob: _constants.I18N_RC
  }), ...config.get('plugins.paths').map(cwd => (0, _get_translations_path.getTranslationPaths)({
    cwd,
    glob: _constants.I18N_RC
  })), ...config.get('plugins.scanDirs').map(cwd => (0, _get_translations_path.getTranslationPaths)({
    cwd,
    glob: `*/${_constants.I18N_RC}`
  })), (0, _get_translations_path.getTranslationPaths)({
    cwd: (0, _utils.fromRoot)('../kibana-extra'),
    glob: `*/${_constants.I18N_RC}`
  })]);
  const currentTranslationPaths = [].concat(...translationPaths).filter(translationPath => (0, _path.basename)(translationPath, '.json') === locale);

  _i18n.i18nLoader.registerTranslationFiles(currentTranslationPaths);

  const translations = await _i18n.i18nLoader.getTranslationsByLocale(locale);

  _i18n.i18n.init(Object.freeze({
    locale,
    ...translations
  }));

  server.decorate('server', 'getTranslationsFilePaths', () => currentTranslationPaths);
}