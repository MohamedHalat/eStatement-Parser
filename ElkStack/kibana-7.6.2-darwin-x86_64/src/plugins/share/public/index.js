"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "SharePluginSetup", {
  enumerable: true,
  get: function get() {
    return _plugin.SharePluginSetup;
  }
});
Object.defineProperty(exports, "SharePluginStart", {
  enumerable: true,
  get: function get() {
    return _plugin.SharePluginStart;
  }
});
Object.defineProperty(exports, "ShareContext", {
  enumerable: true,
  get: function get() {
    return _types.ShareContext;
  }
});
Object.defineProperty(exports, "ShareMenuProvider", {
  enumerable: true,
  get: function get() {
    return _types.ShareMenuProvider;
  }
});
Object.defineProperty(exports, "ShareMenuItem", {
  enumerable: true,
  get: function get() {
    return _types.ShareMenuItem;
  }
});
Object.defineProperty(exports, "ShowShareMenuOptions", {
  enumerable: true,
  get: function get() {
    return _types.ShowShareMenuOptions;
  }
});
Object.defineProperty(exports, "ShareContextMenuPanelItem", {
  enumerable: true,
  get: function get() {
    return _types.ShareContextMenuPanelItem;
  }
});
exports.plugin = void 0;

var _plugin = require("./plugin");

var _types = require("./types");

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
var plugin = function plugin() {
  return new _plugin.SharePlugin();
};

exports.plugin = plugin;