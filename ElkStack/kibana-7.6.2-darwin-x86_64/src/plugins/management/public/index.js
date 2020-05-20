"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plugin = plugin;
Object.defineProperty(exports, "ManagementSetup", {
  enumerable: true,
  get: function get() {
    return _types.ManagementSetup;
  }
});
Object.defineProperty(exports, "ManagementStart", {
  enumerable: true,
  get: function get() {
    return _types.ManagementStart;
  }
});
Object.defineProperty(exports, "RegisterManagementApp", {
  enumerable: true,
  get: function get() {
    return _types.RegisterManagementApp;
  }
});
Object.defineProperty(exports, "ManagementApp", {
  enumerable: true,
  get: function get() {
    return _management_app.ManagementApp;
  }
});
Object.defineProperty(exports, "ManagementSection", {
  enumerable: true,
  get: function get() {
    return _management_section.ManagementSection;
  }
});
Object.defineProperty(exports, "ManagementSidebarNav", {
  enumerable: true,
  get: function get() {
    return _components.ManagementSidebarNav;
  }
});

var _plugin = require("./plugin");

var _types = require("./types");

var _management_app = require("./management_app");

var _management_section = require("./management_section");

var _components = require("./components");

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
function plugin(initializerContext) {
  return new _plugin.ManagementPlugin();
} // for use in legacy management apps