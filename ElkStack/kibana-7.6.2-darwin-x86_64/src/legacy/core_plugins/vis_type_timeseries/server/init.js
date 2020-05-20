"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = void 0;

var _fields = require("./routes/fields");

var _vis = require("./routes/vis");

var _search_strategies_register = require("./lib/search_strategies/search_strategies_register");

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
// @ts-ignore
// @ts-ignore
// @ts-ignore
const init = async (framework, __LEGACY, validationTelemetry) => {
  const {
    core
  } = framework;
  const router = core.http.createRouter();
  (0, _vis.visDataRoutes)(router, framework, validationTelemetry); // [LEGACY_TODO]

  (0, _fields.fieldsRoutes)(__LEGACY.server);

  _search_strategies_register.SearchStrategiesRegister.init(__LEGACY.server);
};

exports.init = init;