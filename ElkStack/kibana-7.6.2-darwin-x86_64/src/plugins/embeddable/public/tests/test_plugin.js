"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testPlugin = void 0;

var _tests = require("src/plugins/ui_actions/public/tests");

var _mocks = require("../../../../core/public/mocks");

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
// eslint-disable-next-line
var testPlugin = function testPlugin() {
  var coreSetup = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _mocks.coreMock.createSetup();
  var coreStart = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _mocks.coreMock.createStart();
  var uiActions = (0, _tests.uiActionsTestPlugin)(coreSetup, coreStart);
  var initializerContext = {};
  var plugin = new _plugin.EmbeddablePublicPlugin(initializerContext);
  var setup = plugin.setup(coreSetup, {
    uiActions: uiActions.setup
  });
  return {
    plugin: plugin,
    coreSetup: coreSetup,
    coreStart: coreStart,
    setup: setup,
    doStart: function doStart() {
      var anotherCoreStart = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : coreStart;
      var start = plugin.start(anotherCoreStart);
      return start;
    },
    uiActions: uiActions.doStart(coreStart)
  };
};

exports.testPlugin = testPlugin;