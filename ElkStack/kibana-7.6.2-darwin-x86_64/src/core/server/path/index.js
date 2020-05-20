"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = exports.getDataPath = exports.getConfigPath = void 0;

var _path = require("path");

var _fs = require("fs");

var _configSchema = require("@kbn/config-schema");

var _utils = require("../utils");

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
const isString = v => typeof v === 'string';

const CONFIG_PATHS = [process.env.KIBANA_PATH_CONF && (0, _path.join)(process.env.KIBANA_PATH_CONF, 'kibana.yml'), process.env.CONFIG_PATH, // deprecated
(0, _utils.fromRoot)('config/kibana.yml'), '/etc/kibana/kibana.yml'].filter(isString);
const DATA_PATHS = [process.env.DATA_PATH, // deprecated
(0, _utils.fromRoot)('data'), '/var/lib/kibana'].filter(isString);

function findFile(paths) {
  const availablePath = paths.find(configPath => {
    try {
      (0, _fs.accessSync)(configPath, _fs.constants.R_OK);
      return true;
    } catch (e) {// Check the next path
    }
  });
  return availablePath || paths[0];
}
/**
 * Get the path where the config files are stored
 * @internal
 */


const getConfigPath = () => findFile(CONFIG_PATHS);
/**
 * Get the path where the data can be stored
 * @internal
 */


exports.getConfigPath = getConfigPath;

const getDataPath = () => findFile(DATA_PATHS);

exports.getDataPath = getDataPath;
const config = {
  path: 'path',
  schema: _configSchema.schema.object({
    data: _configSchema.schema.string({
      defaultValue: () => getDataPath()
    })
  })
};
exports.config = config;