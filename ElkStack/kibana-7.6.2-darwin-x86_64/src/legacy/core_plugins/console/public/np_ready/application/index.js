"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.legacyBackDoorToSettings = legacyBackDoorToSettings;
exports.boot = boot;

var _react = _interopRequireDefault(require("react"));

var _contexts = require("./contexts");

var _containers = require("./containers");

var _services = require("../services");

var _tracker = require("../services/tracker");

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
var settingsRef;

function legacyBackDoorToSettings() {
  return settingsRef;
}

function boot(deps) {
  var I18nContext = deps.I18nContext,
      notifications = deps.notifications,
      docLinkVersion = deps.docLinkVersion,
      elasticsearchUrl = deps.elasticsearchUrl;
  var trackUiMetric = (0, _tracker.createUsageTracker)();
  trackUiMetric.load('opened_app');
  var storage = (0, _services.createStorage)({
    engine: window.localStorage,
    prefix: 'sense:'
  });
  var history = (0, _services.createHistory)({
    storage: storage
  });
  var settings = (0, _services.createSettings)({
    storage: storage
  });
  settingsRef = settings;
  return _react.default.createElement(I18nContext, null, _react.default.createElement(_contexts.ServicesContextProvider, {
    value: {
      elasticsearchUrl: elasticsearchUrl,
      docLinkVersion: docLinkVersion,
      services: {
        storage: storage,
        history: history,
        settings: settings,
        notifications: notifications,
        trackUiMetric: trackUiMetric
      }
    }
  }, _react.default.createElement(_contexts.RequestContextProvider, null, _react.default.createElement(_contexts.EditorContextProvider, {
    settings: settings.toJSON()
  }, _react.default.createElement(_containers.Main, null)))));
}