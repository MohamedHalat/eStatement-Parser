"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  plugin: true,
  VisualizationsSetup: true,
  VisualizationsStart: true,
  VisTypeAlias: true,
  VisType: true,
  Vis: true,
  VisParams: true,
  VisState: true,
  Status: true,
  buildPipeline: true,
  buildVislibDimensions: true,
  SchemaConfig: true,
  updateOldState: true,
  calculateObjectHash: true
};
exports.plugin = plugin;
Object.defineProperty(exports, "VisualizationsSetup", {
  enumerable: true,
  get: function get() {
    return _plugin.VisualizationsSetup;
  }
});
Object.defineProperty(exports, "VisualizationsStart", {
  enumerable: true,
  get: function get() {
    return _plugin.VisualizationsStart;
  }
});
Object.defineProperty(exports, "VisTypeAlias", {
  enumerable: true,
  get: function get() {
    return _types.VisTypeAlias;
  }
});
Object.defineProperty(exports, "VisType", {
  enumerable: true,
  get: function get() {
    return _types.VisType;
  }
});
Object.defineProperty(exports, "Vis", {
  enumerable: true,
  get: function get() {
    return _vis.Vis;
  }
});
Object.defineProperty(exports, "VisParams", {
  enumerable: true,
  get: function get() {
    return _vis.VisParams;
  }
});
Object.defineProperty(exports, "VisState", {
  enumerable: true,
  get: function get() {
    return _vis.VisState;
  }
});
Object.defineProperty(exports, "Status", {
  enumerable: true,
  get: function get() {
    return _update_status.Status;
  }
});
Object.defineProperty(exports, "buildPipeline", {
  enumerable: true,
  get: function get() {
    return _build_pipeline.buildPipeline;
  }
});
Object.defineProperty(exports, "buildVislibDimensions", {
  enumerable: true,
  get: function get() {
    return _build_pipeline.buildVislibDimensions;
  }
});
Object.defineProperty(exports, "SchemaConfig", {
  enumerable: true,
  get: function get() {
    return _build_pipeline.SchemaConfig;
  }
});
Object.defineProperty(exports, "updateOldState", {
  enumerable: true,
  get: function get() {
    return _vis_update_state.updateOldState;
  }
});
Object.defineProperty(exports, "calculateObjectHash", {
  enumerable: true,
  get: function get() {
    return _calculate_object_hash.calculateObjectHash;
  }
});

var _plugin = require("./plugin");

var _types = require("./types");

var _vis = require("./vis");

var _filters = require("./filters");

Object.keys(_filters).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _filters[key];
    }
  });
});

var _update_status = require("./legacy/update_status");

var _build_pipeline = require("./legacy/build_pipeline");

var _vis_update_state = require("./legacy/vis_update_state");

var _calculate_object_hash = require("./legacy/calculate_object_hash");

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

/**
 * Visualizations Plugin - public
 *
 * This is the entry point for the entire client-side public contract of the plugin.
 * If something is not explicitly exported here, you can safely assume it is private
 * to the plugin and not considered stable.
 *
 * All stateful contracts will be injected by the platform at runtime, and are defined
 * in the setup/start interfaces in `plugin.ts`. The remaining items exported here are
 * either types, or static code.
 */

/** @public */

/** @public types */
function plugin(initializerContext) {
  return new _plugin.VisualizationsPlugin(initializerContext);
}
/** @public static code */