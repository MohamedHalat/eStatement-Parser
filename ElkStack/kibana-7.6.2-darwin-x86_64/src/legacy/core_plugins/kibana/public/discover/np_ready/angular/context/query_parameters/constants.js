"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QUERY_PARAMETER_KEYS = exports.MIN_CONTEXT_SIZE = exports.MAX_CONTEXT_SIZE = void 0;

var _state = require("./state");

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
var MAX_CONTEXT_SIZE = 10000; // Elasticsearch's default maximum size limit

exports.MAX_CONTEXT_SIZE = MAX_CONTEXT_SIZE;
var MIN_CONTEXT_SIZE = 0;
exports.MIN_CONTEXT_SIZE = MIN_CONTEXT_SIZE;
var QUERY_PARAMETER_KEYS = Object.keys((0, _state.createInitialQueryParametersState)());
exports.QUERY_PARAMETER_KEYS = QUERY_PARAMETER_KEYS;