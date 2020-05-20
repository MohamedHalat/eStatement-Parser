"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findLegacyPluginSpecs = findLegacyPluginSpecs;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _find_plugin_specs = require("../../../../legacy/plugin_discovery/find_plugin_specs.js");

var _collect_ui_exports = require("../../../../legacy/ui/ui_exports/collect_ui_exports");

var _get_nav_links = require("./get_nav_links");

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
async function findLegacyPluginSpecs(settings, loggerFactory, packageInfo) {
  const configToMutate = (0, _find_plugin_specs.defaultConfig)(settings);
  const {
    pack$,
    invalidDirectoryError$,
    invalidPackError$,
    otherError$,
    deprecation$,
    invalidVersionSpec$,
    spec$,
    disabledSpec$
  } = (0, _find_plugin_specs.findPluginSpecs)(settings, configToMutate);
  const logger = loggerFactory.get('legacy-plugins');
  const log$ = (0, _rxjs.merge)(pack$.pipe((0, _operators.tap)(definition => {
    const path = definition.getPath();
    logger.debug(`Found plugin at ${path}`, {
      path
    });
  })), invalidDirectoryError$.pipe((0, _operators.tap)(error => {
    logger.warn(`Unable to scan directory for plugins "${error.path}"`, {
      err: error,
      dir: error.path
    });
  })), invalidPackError$.pipe((0, _operators.tap)(error => {
    logger.warn(`Skipping non-plugin directory at ${error.path}`, {
      path: error.path
    });
  })), otherError$.pipe((0, _operators.tap)(error => {
    // rethrow unhandled errors, which will fail the server
    throw error;
  })), invalidVersionSpec$.pipe((0, _operators.map)(spec => {
    const name = spec.getId();
    const pluginVersion = spec.getExpectedKibanaVersion();
    const kibanaVersion = packageInfo.version;
    return `Plugin "${name}" was disabled because it expected Kibana version "${pluginVersion}", and found "${kibanaVersion}".`;
  }), (0, _operators.distinct)(), (0, _operators.tap)(message => {
    logger.warn(message);
  })), deprecation$.pipe((0, _operators.tap)(({
    spec,
    message
  }) => {
    const deprecationLogger = loggerFactory.get('plugins', spec.getConfigPrefix(), 'config', 'deprecation');
    deprecationLogger.warn(message);
  })));
  const [disabledPluginSpecs, pluginSpecs] = await (0, _rxjs.forkJoin)(disabledSpec$.pipe((0, _operators.toArray)()), spec$.pipe((0, _operators.toArray)()), log$.pipe((0, _operators.toArray)())).toPromise();
  const uiExports = (0, _collect_ui_exports.collectUiExports)(pluginSpecs);
  const navLinks = (0, _get_nav_links.getNavLinks)(uiExports, pluginSpecs);
  return {
    disabledPluginSpecs,
    pluginSpecs,
    pluginExtendedConfig: configToMutate,
    uiExports,
    navLinks
  };
}