"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUnusedConfigKeys = getUnusedConfigKeys;

var _lodash = require("lodash");

var _index = require("../../../../legacy/deprecation/index");

var _utils = require("../../../../legacy/utils");

var _config = require("../../config");

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
const getFlattenedKeys = object => Object.keys((0, _utils.getFlattenedObject)(object));

async function getUnusedConfigKeys({
  coreHandledConfigPaths,
  pluginSpecs,
  disabledPluginSpecs,
  settings,
  legacyConfig
}) {
  // transform deprecated plugin settings
  for (let i = 0; i < pluginSpecs.length; i++) {
    const spec = pluginSpecs[i];
    const transform = await (0, _index.getTransform)(spec);
    const prefix = spec.getConfigPrefix(); // nested plugin prefixes (a.b) translate to nested objects

    const pluginSettings = (0, _lodash.get)(settings, prefix);

    if (pluginSettings) {
      // flattened settings are expected to be converted to nested objects
      // a.b = true => { a: { b: true }}
      (0, _lodash.set)(settings, prefix, transform(pluginSettings));
    }
  } // remove config values from disabled plugins


  for (const spec of disabledPluginSpecs) {
    (0, _utils.unset)(settings, spec.getConfigPrefix());
  }

  const inputKeys = getFlattenedKeys(settings);
  const appliedKeys = getFlattenedKeys(legacyConfig.get());

  if (inputKeys.includes('env')) {
    // env is a special case key, see https://github.com/elastic/kibana/blob/848bf17b/src/legacy/server/config/config.js#L74
    // where it is deleted from the settings before being injected into the schema via context and
    // then renamed to `env.name` https://github.com/elastic/kibana/blob/848bf17/src/legacy/server/config/schema.js#L17
    inputKeys[inputKeys.indexOf('env')] = 'env.name';
  } // Filter out keys that are marked as used in the core (e.g. by new core plugins).


  return (0, _lodash.difference)(inputKeys, appliedKeys).filter(unusedConfigKey => !coreHandledConfigPaths.some(usedInCoreConfigKey => (0, _config.hasConfigPathIntersection)(unusedConfigKey, usedInCoreConfigKey)));
}