"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plugin = plugin;
Object.defineProperty(exports, "ManagementSetup", {
  enumerable: true,
  get: function get() {
    return _plugin.ManagementSetup;
  }
});
Object.defineProperty(exports, "ManagementStart", {
  enumerable: true,
  get: function get() {
    return _plugin.ManagementStart;
  }
});
Object.defineProperty(exports, "IndexPatternCreationConfig", {
  enumerable: true,
  get: function get() {
    return _index_pattern_management.IndexPatternCreationConfig;
  }
});
Object.defineProperty(exports, "IndexPatternListConfig", {
  enumerable: true,
  get: function get() {
    return _index_pattern_management.IndexPatternListConfig;
  }
});
Object.defineProperty(exports, "SavedObjectsManagementAction", {
  enumerable: true,
  get: function get() {
    return _saved_objects_management.SavedObjectsManagementAction;
  }
});
Object.defineProperty(exports, "SavedObjectsManagementRecord", {
  enumerable: true,
  get: function get() {
    return _saved_objects_management.SavedObjectsManagementRecord;
  }
});

var _plugin = require("./plugin");

var _index_pattern_management = require("./services/index_pattern_management");

var _saved_objects_management = require("./services/saved_objects_management");

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

/**
 * Management Plugin - public
 *
 * This is the entry point for the entire client-side public contract of the plugin.
 * If something is not explicitly exported here, you can safely assume it is private
 * to the plugin and not considered stable.
 *
 * All stateful contracts will be injected by the platform at runtime, and are defined
 * in the setup/start interfaces in `plugin.ts`. The remaining items exported here are
 * either types, or static code.
 */
function plugin(initializerContext) {
  return new _plugin.ManagementPlugin(initializerContext);
}