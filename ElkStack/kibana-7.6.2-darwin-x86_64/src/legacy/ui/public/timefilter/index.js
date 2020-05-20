"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "getTime", {
  enumerable: true,
  get: function get() {
    return _public.getTime;
  }
});
Object.defineProperty(exports, "InputTimeRange", {
  enumerable: true,
  get: function get() {
    return _public.InputTimeRange;
  }
});
Object.defineProperty(exports, "TimeHistoryContract", {
  enumerable: true,
  get: function get() {
    return _public.TimeHistoryContract;
  }
});
Object.defineProperty(exports, "TimefilterContract", {
  enumerable: true,
  get: function get() {
    return _public.TimefilterContract;
  }
});
exports.timefilter = exports.timeHistory = void 0;

var _routes = _interopRequireDefault(require("ui/routes"));

var _new_platform = require("ui/new_platform");

var _public = require("../../../../plugins/data/public");

var _setup_router = require("./setup_router");

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
var timeHistory = _new_platform.npStart.plugins.data.query.timefilter.history;
exports.timeHistory = timeHistory;
var timefilter = _new_platform.npStart.plugins.data.query.timefilter.timefilter;
exports.timefilter = timefilter;

_routes.default.addSetupWork(function (globalState, $rootScope) {
  return (0, _setup_router.registerTimefilterWithGlobalState)(timefilter, globalState, $rootScope);
});