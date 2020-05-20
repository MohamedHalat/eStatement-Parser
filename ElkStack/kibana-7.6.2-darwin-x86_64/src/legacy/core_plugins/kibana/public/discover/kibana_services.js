"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setAngularModule = setAngularModule;
exports.getAngularModule = getAngularModule;
exports.getServices = getServices;
exports.setServices = setServices;
Object.defineProperty(exports, "angular", {
  enumerable: true,
  get: function get() {
    return _angular.default;
  }
});
Object.defineProperty(exports, "wrapInI18nContext", {
  enumerable: true,
  get: function get() {
    return _i18n.wrapInI18nContext;
  }
});
Object.defineProperty(exports, "buildVislibDimensions", {
  enumerable: true,
  get: function get() {
    return _public.buildVislibDimensions;
  }
});
Object.defineProperty(exports, "callAfterBindingsWorkaround", {
  enumerable: true,
  get: function get() {
    return _compat.callAfterBindingsWorkaround;
  }
});
Object.defineProperty(exports, "getRequestInspectorStats", {
  enumerable: true,
  get: function get() {
    return _courier.getRequestInspectorStats;
  }
});
Object.defineProperty(exports, "getResponseInspectorStats", {
  enumerable: true,
  get: function get() {
    return _courier.getResponseInspectorStats;
  }
});
Object.defineProperty(exports, "hasSearchStategyForIndexPattern", {
  enumerable: true,
  get: function get() {
    return _courier.hasSearchStategyForIndexPattern;
  }
});
Object.defineProperty(exports, "isDefaultTypeIndexPattern", {
  enumerable: true,
  get: function get() {
    return _courier.isDefaultTypeIndexPattern;
  }
});
Object.defineProperty(exports, "SearchSource", {
  enumerable: true,
  get: function get() {
    return _courier.SearchSource;
  }
});
Object.defineProperty(exports, "EsQuerySortValue", {
  enumerable: true,
  get: function get() {
    return _courier.EsQuerySortValue;
  }
});
Object.defineProperty(exports, "SortDirection", {
  enumerable: true,
  get: function get() {
    return _courier.SortDirection;
  }
});
Object.defineProperty(exports, "ISearchSource", {
  enumerable: true,
  get: function get() {
    return _courier.ISearchSource;
  }
});
Object.defineProperty(exports, "intervalOptions", {
  enumerable: true,
  get: function get() {
    return _interval_options.intervalOptions;
  }
});
Object.defineProperty(exports, "migrateLegacyQuery", {
  enumerable: true,
  get: function get() {
    return _migrate_legacy_query.migrateLegacyQuery;
  }
});
Object.defineProperty(exports, "RequestAdapter", {
  enumerable: true,
  get: function get() {
    return _adapters.RequestAdapter;
  }
});
Object.defineProperty(exports, "SavedObjectSaveModal", {
  enumerable: true,
  get: function get() {
    return _saved_object_save_modal.SavedObjectSaveModal;
  }
});
Object.defineProperty(exports, "showSaveModal", {
  enumerable: true,
  get: function get() {
    return _show_saved_object_save_modal.showSaveModal;
  }
});
Object.defineProperty(exports, "stateMonitorFactory", {
  enumerable: true,
  get: function get() {
    return _state_monitor_factory.stateMonitorFactory;
  }
});
Object.defineProperty(exports, "subscribeWithScope", {
  enumerable: true,
  get: function get() {
    return _subscribe_with_scope.subscribeWithScope;
  }
});
Object.defineProperty(exports, "timezoneProvider", {
  enumerable: true,
  get: function get() {
    return _timezone.timezoneProvider;
  }
});
Object.defineProperty(exports, "tabifyAggResponse", {
  enumerable: true,
  get: function get() {
    return _tabify.tabifyAggResponse;
  }
});
Object.defineProperty(exports, "vislibSeriesResponseHandlerProvider", {
  enumerable: true,
  get: function get() {
    return _vislib.vislibSeriesResponseHandlerProvider;
  }
});
Object.defineProperty(exports, "ensureDefaultIndexPattern", {
  enumerable: true,
  get: function get() {
    return _legacy_compat.ensureDefaultIndexPattern;
  }
});
Object.defineProperty(exports, "unhashUrl", {
  enumerable: true,
  get: function get() {
    return _public2.unhashUrl;
  }
});
Object.defineProperty(exports, "formatMsg", {
  enumerable: true,
  get: function get() {
    return _index.formatMsg;
  }
});
Object.defineProperty(exports, "formatStack", {
  enumerable: true,
  get: function get() {
    return _index.formatStack;
  }
});
Object.defineProperty(exports, "Vis", {
  enumerable: true,
  get: function get() {
    return _vis.Vis;
  }
});
Object.defineProperty(exports, "IndexPatternsContract", {
  enumerable: true,
  get: function get() {
    return _public3.IndexPatternsContract;
  }
});
Object.defineProperty(exports, "IIndexPattern", {
  enumerable: true,
  get: function get() {
    return _public3.IIndexPattern;
  }
});
Object.defineProperty(exports, "IndexPattern", {
  enumerable: true,
  get: function get() {
    return _public3.IndexPattern;
  }
});
Object.defineProperty(exports, "indexPatterns", {
  enumerable: true,
  get: function get() {
    return _public3.indexPatterns;
  }
});
Object.defineProperty(exports, "IFieldType", {
  enumerable: true,
  get: function get() {
    return _public3.IFieldType;
  }
});
Object.defineProperty(exports, "ElasticSearchHit", {
  enumerable: true,
  get: function get() {
    return _doc_views_types.ElasticSearchHit;
  }
});
Object.defineProperty(exports, "Adapters", {
  enumerable: true,
  get: function get() {
    return _types.Adapters;
  }
});
Object.defineProperty(exports, "Chrome", {
  enumerable: true,
  get: function get() {
    return _chrome.Chrome;
  }
});
Object.defineProperty(exports, "IInjector", {
  enumerable: true,
  get: function get() {
    return _chrome.IInjector;
  }
});
Object.defineProperty(exports, "registerTimefilterWithGlobalStateFactory", {
  enumerable: true,
  get: function get() {
    return _setup_router.registerTimefilterWithGlobalStateFactory;
  }
});
Object.defineProperty(exports, "FieldName", {
  enumerable: true,
  get: function get() {
    return _field_name2.FieldName;
  }
});

var _angular = _interopRequireDefault(require("angular"));

require("ui/directives/css_truncate");

require("ui/directives/field_name");

var _i18n = require("ui/i18n");

var _public = require("../../../visualizations/public");

var _compat = require("ui/compat");

var _courier = require("ui/courier");

var _interval_options = require("ui/agg_types/buckets/_interval_options");

var _migrate_legacy_query = require("ui/utils/migrate_legacy_query");

var _adapters = require("ui/inspector/adapters");

var _saved_object_save_modal = require("ui/saved_objects/components/saved_object_save_modal");

var _show_saved_object_save_modal = require("ui/saved_objects/show_saved_object_save_modal");

var _state_monitor_factory = require("ui/state_management/state_monitor_factory");

var _subscribe_with_scope = require("ui/utils/subscribe_with_scope");

var _timezone = require("ui/vis/lib/timezone");

var _tabify = require("ui/agg_response/tabify");

var _vislib = require("ui/vis/response_handlers/vislib");

var _legacy_compat = require("ui/legacy_compat");

var _public2 = require("../../../../../plugins/kibana_utils/public");

var _index = require("ui/notify/lib/index");

var _vis = require("ui/vis");

var _public3 = require("../../../../../plugins/data/public");

var _doc_views_types = require("./np_ready/doc_views/doc_views_types");

var _types = require("ui/inspector/types");

var _chrome = require("ui/chrome");

var _setup_router = require("ui/timefilter/setup_router");

var _field_name2 = require("ui/directives/field_name/field_name");

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
var angularModule = null;
var services = null;
/**
 * set bootstrapped inner angular module
 */

function setAngularModule(module) {
  angularModule = module;
}
/**
 * get boostrapped inner angular module
 */


function getAngularModule() {
  return angularModule;
}

function getServices() {
  if (!services) {
    throw new Error('Discover services are not yet available');
  }

  return services;
}

function setServices(newServices) {
  services = newServices;
} // import directives that