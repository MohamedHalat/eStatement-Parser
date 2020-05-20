"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _fs = _interopRequireDefault(require("fs"));

var _util = require("util");

var _download = require("./download");

var _path = _interopRequireDefault(require("path"));

var _cleanup = require("./cleanup");

var _pack = require("./pack");

var _rename = require("./rename");

var _del = _interopRequireDefault(require("del"));

var _error_if_x_pack = require("../lib/error_if_x_pack");

var _kibana = require("./kibana");

var _pm = require("@kbn/pm");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
const mkdir = (0, _util.promisify)(_fs.default.mkdir);

async function install(settings, logger) {
  try {
    (0, _error_if_x_pack.errorIfXPackInstall)(settings, logger);
    await (0, _cleanup.cleanPrevious)(settings, logger);
    await mkdir(settings.workingPath, {
      recursive: true
    });
    await (0, _download.download)(settings, logger);
    await (0, _pack.getPackData)(settings, logger);
    await (0, _pack.extract)(settings, logger);

    _del.default.sync(settings.tempArchiveFile, {
      force: true
    });

    (0, _kibana.existingInstall)(settings, logger);
    (0, _kibana.assertVersion)(settings);
    await (0, _pm.prepareExternalProjectDependencies)(settings.workingPath);
    await (0, _rename.renamePlugin)(settings.workingPath, _path.default.join(settings.pluginDir, settings.plugins[0].name));
    logger.log('Plugin installation complete');
  } catch (err) {
    logger.error(`Plugin installation was unsuccessful due to error "${err.message}"`);
    (0, _cleanup.cleanArtifacts)(settings);
    process.exit(70);
  }
}

module.exports = exports.default;