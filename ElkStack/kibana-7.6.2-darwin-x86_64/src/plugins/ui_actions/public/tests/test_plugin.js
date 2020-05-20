"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uiActionsTestPlugin = void 0;

var _plugin = require("../plugin");

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
var uiActionsTestPlugin = function uiActionsTestPlugin() {
  var coreSetup = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var coreStart = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var initializerContext = {};
  var plugin = new _plugin.UiActionsPlugin(initializerContext);
  var setup = plugin.setup(coreSetup);
  return {
    plugin: plugin,
    coreSetup: coreSetup,
    coreStart: coreStart,
    setup: setup,
    doStart: function doStart() {
      var anotherCoreStart = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : coreStart;
      var start = plugin.start(anotherCoreStart);
      return start;
    }
  };
};

exports.uiActionsTestPlugin = uiActionsTestPlugin;