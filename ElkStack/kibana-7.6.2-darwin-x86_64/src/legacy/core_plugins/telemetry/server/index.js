"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "PluginsSetup", {
  enumerable: true,
  get: function () {
    return _plugin.PluginsSetup;
  }
});
Object.defineProperty(exports, "FetcherTask", {
  enumerable: true,
  get: function () {
    return _fetcher.FetcherTask;
  }
});
Object.defineProperty(exports, "replaceTelemetryInjectedVars", {
  enumerable: true,
  get: function () {
    return _telemetry_config.replaceTelemetryInjectedVars;
  }
});
Object.defineProperty(exports, "telemetryCollectionManager", {
  enumerable: true,
  get: function () {
    return _collection_manager.telemetryCollectionManager;
  }
});
exports.constants = exports.telemetryPlugin = void 0;

var _plugin = require("./plugin");

var constants = _interopRequireWildcard(require("../common/constants"));

exports.constants = constants;

var _fetcher = require("./fetcher");

var _telemetry_config = require("./telemetry_config");

var _collection_manager = require("./collection_manager");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
const telemetryPlugin = initializerContext => new _plugin.TelemetryPlugin(initializerContext);

exports.telemetryPlugin = telemetryPlugin;