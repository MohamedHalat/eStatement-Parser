"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plugin = plugin;
Object.defineProperty(exports, "IEmbeddableSetup", {
  enumerable: true,
  get: function get() {
    return _plugin.IEmbeddableSetup;
  }
});
Object.defineProperty(exports, "IEmbeddableStart", {
  enumerable: true,
  get: function get() {
    return _plugin.IEmbeddableStart;
  }
});
Object.defineProperty(exports, "ADD_PANEL_ACTION_ID", {
  enumerable: true,
  get: function get() {
    return _lib.ADD_PANEL_ACTION_ID;
  }
});
Object.defineProperty(exports, "APPLY_FILTER_ACTION", {
  enumerable: true,
  get: function get() {
    return _lib.APPLY_FILTER_ACTION;
  }
});
Object.defineProperty(exports, "APPLY_FILTER_TRIGGER", {
  enumerable: true,
  get: function get() {
    return _lib.APPLY_FILTER_TRIGGER;
  }
});
Object.defineProperty(exports, "PANEL_BADGE_TRIGGER", {
  enumerable: true,
  get: function get() {
    return _lib.PANEL_BADGE_TRIGGER;
  }
});
Object.defineProperty(exports, "Adapters", {
  enumerable: true,
  get: function get() {
    return _lib.Adapters;
  }
});
Object.defineProperty(exports, "AddPanelAction", {
  enumerable: true,
  get: function get() {
    return _lib.AddPanelAction;
  }
});
Object.defineProperty(exports, "CONTEXT_MENU_TRIGGER", {
  enumerable: true,
  get: function get() {
    return _lib.CONTEXT_MENU_TRIGGER;
  }
});
Object.defineProperty(exports, "Container", {
  enumerable: true,
  get: function get() {
    return _lib.Container;
  }
});
Object.defineProperty(exports, "ContainerInput", {
  enumerable: true,
  get: function get() {
    return _lib.ContainerInput;
  }
});
Object.defineProperty(exports, "ContainerOutput", {
  enumerable: true,
  get: function get() {
    return _lib.ContainerOutput;
  }
});
Object.defineProperty(exports, "EDIT_PANEL_ACTION_ID", {
  enumerable: true,
  get: function get() {
    return _lib.EDIT_PANEL_ACTION_ID;
  }
});
Object.defineProperty(exports, "EditPanelAction", {
  enumerable: true,
  get: function get() {
    return _lib.EditPanelAction;
  }
});
Object.defineProperty(exports, "Embeddable", {
  enumerable: true,
  get: function get() {
    return _lib.Embeddable;
  }
});
Object.defineProperty(exports, "EmbeddableChildPanel", {
  enumerable: true,
  get: function get() {
    return _lib.EmbeddableChildPanel;
  }
});
Object.defineProperty(exports, "EmbeddableChildPanelProps", {
  enumerable: true,
  get: function get() {
    return _lib.EmbeddableChildPanelProps;
  }
});
Object.defineProperty(exports, "EmbeddableFactory", {
  enumerable: true,
  get: function get() {
    return _lib.EmbeddableFactory;
  }
});
Object.defineProperty(exports, "EmbeddableFactoryNotFoundError", {
  enumerable: true,
  get: function get() {
    return _lib.EmbeddableFactoryNotFoundError;
  }
});
Object.defineProperty(exports, "EmbeddableInput", {
  enumerable: true,
  get: function get() {
    return _lib.EmbeddableInput;
  }
});
Object.defineProperty(exports, "EmbeddableInstanceConfiguration", {
  enumerable: true,
  get: function get() {
    return _lib.EmbeddableInstanceConfiguration;
  }
});
Object.defineProperty(exports, "EmbeddableOutput", {
  enumerable: true,
  get: function get() {
    return _lib.EmbeddableOutput;
  }
});
Object.defineProperty(exports, "EmbeddablePanel", {
  enumerable: true,
  get: function get() {
    return _lib.EmbeddablePanel;
  }
});
Object.defineProperty(exports, "ErrorEmbeddable", {
  enumerable: true,
  get: function get() {
    return _lib.ErrorEmbeddable;
  }
});
Object.defineProperty(exports, "GetEmbeddableFactories", {
  enumerable: true,
  get: function get() {
    return _lib.GetEmbeddableFactories;
  }
});
Object.defineProperty(exports, "GetEmbeddableFactory", {
  enumerable: true,
  get: function get() {
    return _lib.GetEmbeddableFactory;
  }
});
Object.defineProperty(exports, "IContainer", {
  enumerable: true,
  get: function get() {
    return _lib.IContainer;
  }
});
Object.defineProperty(exports, "IEmbeddable", {
  enumerable: true,
  get: function get() {
    return _lib.IEmbeddable;
  }
});
Object.defineProperty(exports, "OutputSpec", {
  enumerable: true,
  get: function get() {
    return _lib.OutputSpec;
  }
});
Object.defineProperty(exports, "PanelNotFoundError", {
  enumerable: true,
  get: function get() {
    return _lib.PanelNotFoundError;
  }
});
Object.defineProperty(exports, "PanelState", {
  enumerable: true,
  get: function get() {
    return _lib.PanelState;
  }
});
Object.defineProperty(exports, "PropertySpec", {
  enumerable: true,
  get: function get() {
    return _lib.PropertySpec;
  }
});
Object.defineProperty(exports, "SavedObjectMetaData", {
  enumerable: true,
  get: function get() {
    return _lib.SavedObjectMetaData;
  }
});
Object.defineProperty(exports, "ViewMode", {
  enumerable: true,
  get: function get() {
    return _lib.ViewMode;
  }
});
Object.defineProperty(exports, "isErrorEmbeddable", {
  enumerable: true,
  get: function get() {
    return _lib.isErrorEmbeddable;
  }
});
Object.defineProperty(exports, "openAddPanelFlyout", {
  enumerable: true,
  get: function get() {
    return _lib.openAddPanelFlyout;
  }
});
Object.defineProperty(exports, "withEmbeddableSubscription", {
  enumerable: true,
  get: function get() {
    return _lib.withEmbeddableSubscription;
  }
});
Object.defineProperty(exports, "EmbeddableFactoryRenderer", {
  enumerable: true,
  get: function get() {
    return _lib.EmbeddableFactoryRenderer;
  }
});
Object.defineProperty(exports, "EmbeddableRoot", {
  enumerable: true,
  get: function get() {
    return _lib.EmbeddableRoot;
  }
});

var _plugin = require("./plugin");

var _lib = require("./lib");

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
  return new _plugin.EmbeddablePublicPlugin(initializerContext);
}