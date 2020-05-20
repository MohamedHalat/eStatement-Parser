"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFileReadable = isFileReadable;
exports.readTelemetryFile = readTelemetryFile;
exports.createTelemetryUsageCollector = createTelemetryUsageCollector;
exports.registerTelemetryUsageCollector = registerTelemetryUsageCollector;
exports.MAX_FILE_SIZE = void 0;

var _fs = require("fs");

var _jsYaml = require("js-yaml");

var _path = require("path");

var _ensure_deep_object = require("./ensure_deep_object");

var _get_xpack_config_with_deprecated = require("../../../common/get_xpack_config_with_deprecated");

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
// look for telemetry.yml in the same places we expect kibana.yml

/**
 * The maximum file size before we ignore it (note: this limit is arbitrary).
 */
const MAX_FILE_SIZE = 10 * 1024; // 10 KB

/**
 * Determine if the supplied `path` is readable.
 *
 * @param path The possible path where a config file may exist.
 * @returns `true` if the file should be used.
 */

exports.MAX_FILE_SIZE = MAX_FILE_SIZE;

function isFileReadable(path) {
  try {
    (0, _fs.accessSync)(path, _fs.constants.R_OK); // ignore files above the limit

    const stats = (0, _fs.statSync)(path);
    return stats.size <= MAX_FILE_SIZE;
  } catch (e) {
    return false;
  }
}
/**
 * Load the `telemetry.yml` file, if it exists, and return its contents as
 * a JSON object.
 *
 * @param configPath The config file path.
 * @returns The unmodified JSON object if the file exists and is a valid YAML file.
 */


async function readTelemetryFile(path) {
  try {
    if (isFileReadable(path)) {
      const yaml = (0, _fs.readFileSync)(path);
      const data = (0, _jsYaml.safeLoad)(yaml.toString()); // don't bother returning empty objects

      if (Object.keys(data).length) {
        // ensure { "a.b": "value" } becomes { "a": { "b": "value" } }
        return (0, _ensure_deep_object.ensureDeepObject)(data);
      }
    }
  } catch (e) {// ignored
  }

  return undefined;
}

function createTelemetryUsageCollector(usageCollection, server) {
  return usageCollection.makeUsageCollector({
    type: 'static_telemetry',
    isReady: () => true,
    fetch: async () => {
      const config = server.config();
      const configPath = (0, _get_xpack_config_with_deprecated.getXpackConfigWithDeprecated)(config, 'telemetry.config');
      const telemetryPath = (0, _path.join)((0, _path.dirname)(configPath), 'telemetry.yml');
      return await readTelemetryFile(telemetryPath);
    }
  });
}

function registerTelemetryUsageCollector(usageCollection, server) {
  const collector = createTelemetryUsageCollector(usageCollection, server);
  usageCollection.registerCollector(collector);
}