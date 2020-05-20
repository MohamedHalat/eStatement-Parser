"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registries = exports.typesRegistry = exports.renderersRegistry = exports.functionsRegistry = void 0;

var _sinon = _interopRequireDefault(require("sinon"));

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
var functionsRegistry = {};
exports.functionsRegistry = functionsRegistry;
var renderersRegistry = {};
exports.renderersRegistry = renderersRegistry;
var typesRegistry = {};
exports.typesRegistry = typesRegistry;
var registries = {
  browserFunctions: functionsRegistry,
  renderers: renderersRegistry,
  types: typesRegistry
};
exports.registries = registries;

var resetRegistry = function resetRegistry(registry) {
  registry.wrapper = _sinon.default.stub();
  registry.register = _sinon.default.stub();
  registry.toJS = _sinon.default.stub();
  registry.toArray = _sinon.default.stub();
  registry.get = _sinon.default.stub();
  registry.getProp = _sinon.default.stub();
  registry.reset = _sinon.default.stub();
};

var resetAll = function resetAll() {
  return Object.values(registries).forEach(resetRegistry);
};

resetAll();
afterEach(resetAll);