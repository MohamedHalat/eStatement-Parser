"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = exports.setup = void 0;

var _legacy_imports = require("./legacy_imports");

var _ = require(".");

var _legacy = require("../../visualizations/public/np_ready/public/legacy");

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
var plugins = {
  expressions: _legacy_imports.npSetup.plugins.expressions,
  visualizations: _legacy.setup
};
var pluginInstance = (0, _.plugin)({});
var setup = pluginInstance.setup(_legacy_imports.npSetup.core, plugins);
exports.setup = setup;
var start = pluginInstance.start(_legacy_imports.npStart.core);
exports.start = start;