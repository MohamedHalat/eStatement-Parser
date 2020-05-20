"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "HomeServerPluginSetup", {
  enumerable: true,
  get: function () {
    return _plugin.HomeServerPluginSetup;
  }
});
Object.defineProperty(exports, "HomeServerPluginStart", {
  enumerable: true,
  get: function () {
    return _plugin.HomeServerPluginStart;
  }
});
Object.defineProperty(exports, "TutorialProvider", {
  enumerable: true,
  get: function () {
    return _services.TutorialProvider;
  }
});
Object.defineProperty(exports, "SampleDatasetProvider", {
  enumerable: true,
  get: function () {
    return _services.SampleDatasetProvider;
  }
});
Object.defineProperty(exports, "SampleDataRegistrySetup", {
  enumerable: true,
  get: function () {
    return _services.SampleDataRegistrySetup;
  }
});
exports.plugin = void 0;

var _plugin = require("./plugin");

var _services = require("./services");

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
const plugin = initContext => new _plugin.HomeServerPlugin(initContext);

exports.plugin = plugin;