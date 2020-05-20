"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  plugin: true,
  Plugin: true,
  interpreterProvider: true,
  ExpressionInterpret: true,
  ExpressionRenderer: true,
  ExpressionRendererProps: true,
  ExpressionDataHandler: true,
  ExpressionRenderHandler: true
};
exports.plugin = plugin;
Object.defineProperty(exports, "Plugin", {
  enumerable: true,
  get: function get() {
    return _plugin.ExpressionsPublicPlugin;
  }
});
Object.defineProperty(exports, "interpreterProvider", {
  enumerable: true,
  get: function get() {
    return _interpreter_provider.interpreterProvider;
  }
});
Object.defineProperty(exports, "ExpressionInterpret", {
  enumerable: true,
  get: function get() {
    return _interpreter_provider.ExpressionInterpret;
  }
});
Object.defineProperty(exports, "ExpressionRenderer", {
  enumerable: true,
  get: function get() {
    return _expression_renderer.ExpressionRenderer;
  }
});
Object.defineProperty(exports, "ExpressionRendererProps", {
  enumerable: true,
  get: function get() {
    return _expression_renderer.ExpressionRendererProps;
  }
});
Object.defineProperty(exports, "ExpressionDataHandler", {
  enumerable: true,
  get: function get() {
    return _execute.ExpressionDataHandler;
  }
});
Object.defineProperty(exports, "ExpressionRenderHandler", {
  enumerable: true,
  get: function get() {
    return _render.ExpressionRenderHandler;
  }
});

var _plugin = require("./plugin");

Object.keys(_plugin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _plugin[key];
    }
  });
});

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _types[key];
    }
  });
});

var _common = require("../common");

Object.keys(_common).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _common[key];
    }
  });
});

var _interpreter_provider = require("./interpreter_provider");

var _expression_renderer = require("./expression_renderer");

var _execute = require("./execute");

var _render = require("./render");

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
  return new _plugin.ExpressionsPublicPlugin(initializerContext);
}