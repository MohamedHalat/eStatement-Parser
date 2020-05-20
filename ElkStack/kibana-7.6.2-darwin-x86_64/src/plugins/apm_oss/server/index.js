"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plugin = plugin;
Object.defineProperty(exports, "APMOSSPluginSetup", {
  enumerable: true,
  get: function () {
    return _plugin.APMOSSPluginSetup;
  }
});
exports.config = void 0;

var _configSchema = require("@kbn/config-schema");

var _plugin = require("./plugin");

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
const config = {
  schema: _configSchema.schema.object({
    transactionIndices: _configSchema.schema.string({
      defaultValue: 'apm-*'
    }),
    spanIndices: _configSchema.schema.string({
      defaultValue: 'apm-*'
    }),
    errorIndices: _configSchema.schema.string({
      defaultValue: 'apm-*'
    }),
    metricsIndices: _configSchema.schema.string({
      defaultValue: 'apm-*'
    }),
    sourcemapIndices: _configSchema.schema.string({
      defaultValue: 'apm-*'
    }),
    onboardingIndices: _configSchema.schema.string({
      defaultValue: 'apm-*'
    }),
    indexPattern: _configSchema.schema.string({
      defaultValue: 'apm-*'
    })
  })
};
exports.config = config;

function plugin(initializerContext) {
  return new _plugin.APMOSSPlugin(initializerContext);
}