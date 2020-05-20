"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = void 0;

var _configSchema = require("@kbn/config-schema");

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
const deprecations = ({
  unused,
  renameFromRoot
}) => [unused('enabled'), renameFromRoot('server.defaultRoute', 'uiSettings.overrides.defaultRoute')];

const configSchema = _configSchema.schema.object({
  overrides: _configSchema.schema.object({
    defaultRoute: _configSchema.schema.maybe(_configSchema.schema.string({
      validate(value) {
        if (!value.startsWith('/')) {
          return 'must start with a slash';
        }
      }

    }))
  }, {
    allowUnknowns: true
  })
});

const config = {
  path: 'uiSettings',
  schema: configSchema,
  deprecations
};
exports.config = config;