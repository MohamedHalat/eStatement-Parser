"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "IInjector", {
  enumerable: true,
  get: function get() {
    return _chrome.IInjector;
  }
});
Object.defineProperty(exports, "State", {
  enumerable: true,
  get: function get() {
    return _state.State;
  }
});
Object.defineProperty(exports, "AppState", {
  enumerable: true,
  get: function get() {
    return _app_state.AppState;
  }
});
Object.defineProperty(exports, "AppStateClass", {
  enumerable: true,
  get: function get() {
    return _app_state.AppStateClass;
  }
});
Object.defineProperty(exports, "AppStateProvider", {
  enumerable: true,
  get: function get() {
    return _app_state.AppStateProvider;
  }
});
Object.defineProperty(exports, "SavedObjectSaveOpts", {
  enumerable: true,
  get: function get() {
    return _types.SavedObjectSaveOpts;
  }
});
Object.defineProperty(exports, "npSetup", {
  enumerable: true,
  get: function get() {
    return _new_platform.npSetup;
  }
});
Object.defineProperty(exports, "npStart", {
  enumerable: true,
  get: function get() {
    return _new_platform.npStart;
  }
});
Object.defineProperty(exports, "IPrivate", {
  enumerable: true,
  get: function get() {
    return _private.IPrivate;
  }
});
Object.defineProperty(exports, "SavedObjectSaveModal", {
  enumerable: true,
  get: function get() {
    return _saved_object_save_modal.SavedObjectSaveModal;
  }
});
Object.defineProperty(exports, "subscribeWithScope", {
  enumerable: true,
  get: function get() {
    return _subscribe_with_scope.subscribeWithScope;
  }
});
Object.defineProperty(exports, "ConfirmationButtonTypes", {
  enumerable: true,
  get: function get() {
    return _confirm_modal.ConfirmationButtonTypes;
  }
});
Object.defineProperty(exports, "confirmModalFactory", {
  enumerable: true,
  get: function get() {
    return _confirm_modal.confirmModalFactory;
  }
});
Object.defineProperty(exports, "showSaveModal", {
  enumerable: true,
  get: function get() {
    return _show_saved_object_save_modal.showSaveModal;
  }
});
Object.defineProperty(exports, "SaveResult", {
  enumerable: true,
  get: function get() {
    return _show_saved_object_save_modal.SaveResult;
  }
});
Object.defineProperty(exports, "migrateLegacyQuery", {
  enumerable: true,
  get: function get() {
    return _migrate_legacy_query.migrateLegacyQuery;
  }
});
Object.defineProperty(exports, "KbnUrl", {
  enumerable: true,
  get: function get() {
    return _kbn_url.KbnUrl;
  }
});
Object.defineProperty(exports, "GlobalStateProvider", {
  enumerable: true,
  get: function get() {
    return _global_state.GlobalStateProvider;
  }
});
Object.defineProperty(exports, "StateManagementConfigProvider", {
  enumerable: true,
  get: function get() {
    return _config_provider.StateManagementConfigProvider;
  }
});
Object.defineProperty(exports, "PrivateProvider", {
  enumerable: true,
  get: function get() {
    return _private2.PrivateProvider;
  }
});
Object.defineProperty(exports, "EventsProvider", {
  enumerable: true,
  get: function get() {
    return _events.EventsProvider;
  }
});
Object.defineProperty(exports, "PersistedState", {
  enumerable: true,
  get: function get() {
    return _persisted_state.PersistedState;
  }
});
Object.defineProperty(exports, "createTopNavDirective", {
  enumerable: true,
  get: function get() {
    return _kbn_top_nav.createTopNavDirective;
  }
});
Object.defineProperty(exports, "createTopNavHelper", {
  enumerable: true,
  get: function get() {
    return _kbn_top_nav.createTopNavHelper;
  }
});
Object.defineProperty(exports, "PromiseServiceCreator", {
  enumerable: true,
  get: function get() {
    return _promises.PromiseServiceCreator;
  }
});
Object.defineProperty(exports, "KbnUrlProvider", {
  enumerable: true,
  get: function get() {
    return _index.KbnUrlProvider;
  }
});
Object.defineProperty(exports, "RedirectWhenMissingProvider", {
  enumerable: true,
  get: function get() {
    return _index.RedirectWhenMissingProvider;
  }
});
Object.defineProperty(exports, "configureAppAngularModule", {
  enumerable: true,
  get: function get() {
    return _legacy_compat.configureAppAngularModule;
  }
});
Object.defineProperty(exports, "ensureDefaultIndexPattern", {
  enumerable: true,
  get: function get() {
    return _legacy_compat.ensureDefaultIndexPattern;
  }
});
Object.defineProperty(exports, "stateMonitorFactory", {
  enumerable: true,
  get: function get() {
    return _state_monitor_factory.stateMonitorFactory;
  }
});
Object.defineProperty(exports, "StateMonitor", {
  enumerable: true,
  get: function get() {
    return _state_monitor_factory.StateMonitor;
  }
});
Object.defineProperty(exports, "unhashUrl", {
  enumerable: true,
  get: function get() {
    return _public.unhashUrl;
  }
});
Object.defineProperty(exports, "SavedObjectLoader", {
  enumerable: true,
  get: function get() {
    return _saved_objects.SavedObjectLoader;
  }
});
Object.defineProperty(exports, "VISUALIZE_EMBEDDABLE_TYPE", {
  enumerable: true,
  get: function get() {
    return _visualize_embeddable.VISUALIZE_EMBEDDABLE_TYPE;
  }
});
Object.defineProperty(exports, "registerTimefilterWithGlobalStateFactory", {
  enumerable: true,
  get: function get() {
    return _setup_router.registerTimefilterWithGlobalStateFactory;
  }
});
Object.defineProperty(exports, "absoluteToParsedUrl", {
  enumerable: true,
  get: function get() {
    return _absolute_to_parsed_url.absoluteToParsedUrl;
  }
});
exports.legacyChrome = void 0;

var _chrome = _interopRequireWildcard(require("ui/chrome"));

var _state = require("ui/state_management/state");

var _app_state = require("ui/state_management/app_state");

var _types = require("ui/saved_objects/types");

var _new_platform = require("ui/new_platform");

var _private = require("ui/private");

var _saved_object_save_modal = require("ui/saved_objects/components/saved_object_save_modal");

var _subscribe_with_scope = require("ui/utils/subscribe_with_scope");

var _confirm_modal = require("ui/modals/confirm_modal");

var _show_saved_object_save_modal = require("ui/saved_objects/show_saved_object_save_modal");

var _migrate_legacy_query = require("ui/utils/migrate_legacy_query");

var _kbn_url = require("ui/url/kbn_url");

var _global_state = require("ui/state_management/global_state");

var _config_provider = require("ui/state_management/config_provider");

var _private2 = require("ui/private/private");

var _events = require("ui/events");

var _persisted_state = require("ui/persisted_state");

var _kbn_top_nav = require("ui/kbn_top_nav/kbn_top_nav");

var _promises = require("ui/promises/promises");

var _index = require("ui/url/index");

var _legacy_compat = require("ui/legacy_compat");

var _state_monitor_factory = require("ui/state_management/state_monitor_factory");

var _public = require("../../../../../plugins/kibana_utils/public");

var _saved_objects = require("ui/saved_objects");

var _visualize_embeddable = require("../visualize_embeddable");

var _setup_router = require("ui/timefilter/setup_router");

var _absolute_to_parsed_url = require("ui/url/absolute_to_parsed_url");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
 * The imports in this file are static functions and types which still live in legacy folders and are used
 * within dashboard. To consolidate them all in one place, they are re-exported from this file. Eventually
 * this list should become empty. Imports from the top level of shimmed or moved plugins can be imported
 * directly where they are needed.
 */
var legacyChrome = _chrome.default;
exports.legacyChrome = legacyChrome;